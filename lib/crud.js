"use server";
import { auth } from "@/auth";
import { cartModel } from "@/models/cart-model";
import { orderModel } from "@/models/order-model";
import { productModel } from "@/models/product-model";
import { wishModel } from "@/models/wish-model";
import connectMongo from "@/services/mongo";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-utils";

export async function addProductToOrder(data) {
  await connectMongo();
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Find the cart document for the user
    const cartList = await cartModel.findOne({ userId });
    if (!cartList || !cartList.products || cartList.products.length === 0) {
      throw new Error("Cart is empty or not found");
    }

    // Check if an order for the user already exists
    let orderData = await orderModel.findOne({ userId });

    let newId;
    if (orderData) {
      // Push the products to the existing order
      orderData.orders.push({
        ...data,
        products: cartList.products,
      });
      const { _id } = await orderData.save();
      newId = _id.toString();
    } else {
      // Create order with products from the cart and additional data
      const { _id } = await orderModel.create({
        userId: userId,
        orders: [
          {
            ...data,
            products: cartList.products,
          },
        ],
      });
      newId = _id.toString();
    }
    // Update products stock and total sales in bulk
    // const productIds = cartList?.products.map((p) => p.productId);

    const bulkUpdate = cartList?.products.map((p) => {
      return {
        updateOne: {
          filter: { _id: p._id },
          update: { $inc: { stock: -p.quantity, sales: p.quantity } },
        },
      };
    });
    await productModel.bulkWrite(bulkUpdate);

    // Remove the products from the cart
    await cartModel.updateOne({ userId }, { $set: { products: [] } });
    return { status: "success", orderId: newId };
  } catch (error) {
    console.error("Error adding product to order:", error);
    throw error;
  }
}
export async function addProductToCart(product) {
  const connect = await connectMongo();

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User not logged in");
  }
  try {
    // Find the cart document for the user
    let cartList = await cartModel.findOne({ userId });
    // If the cart doesn't exist, create a new one
    if (!cartList) {
      cartList = new cartModel({ userId, products: [] });
    }

    const currentTime = new Date();
    const validProducts = [];

    for (const cartProduct of cartList.products) {
      const productUpdatedTime = new Date(cartProduct.updatedAt);
      const timeDifference = (currentTime - productUpdatedTime) / (1000 * 60); // Time difference in minutes

      if (timeDifference > 20) {
        // Release product stock if it hasn't been updated in the last 20 minutes
        await productModel.updateOne(
          { _id: cartProduct.id },
          { $inc: { stock: cartProduct.quantity } }
        );
        cartProduct.available = false;
      } else {
        validProducts.push(cartProduct);
      }
    }
    cartList.products = validProducts;
    // Check if the product is already in the cart
    const existingProduct = cartList.products.find(
      (p) => p.productId === product.productId
    );

    if (existingProduct) {
      // If the product is already in the cart, update the quantity and updatedTime
      existingProduct.quantity += product.quantity;
    } else {
      // If the product is not in the cart, add it to the cart with the current updatedTime
      cartList.products.push({
        ...product,
        productId: product.productId,
        available: true,
      });
    }

    // Save the updated cart
    await cartList.save();

    // Update the product stock
    await productModel.updateOne(
      { _id: product.productId },
      { $inc: { stock: -product.quantity } }
    );
    return { status: "success" };
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
}

export async function removeFromCart(productId) {
  const connect = await connectMongo();

  const session = await auth();
  const userId = session?.user?.id;
  try {
    // Find the cart document for the user
    let cartList = await cartModel.findOne({ userId });

    if (!cartList) {
      // If no cart is found, throw an error
      throw new Error("Cart not found");
    }

    // Find the index of the product in the cart
    const productIndex = cartList.products.findIndex(
      (p) => p.productId === productId
    );

    if (productIndex === -1) {
      // If the product is not found in the cart, throw an error
      throw new Error("Product not found in cart");
    }

    // Remove the product from the cart
    const product = cartList.products.splice(productIndex, 1)[0];

    // Save the updated cart
    await cartList.save();

    // Update the product stock if the product is available
    if (product.available) {
      await productModel.updateOne(
        { _id: product.id },
        { $inc: { stock: product.quantity } }
      );
    }
    return { status: "success" };
  } catch (error) {
    throw error;
  }
}

export async function updateAllCarts() {
  await connectMongo();
  try {
    const allCarts = await cartModel.find();

    const currentTime = new Date();

    for (const cart of allCarts) {
      const validProducts = [];

      for (const cartProduct of cart.products) {
        const productUpdatedTime = new Date(cartProduct.updatedAt);
        const timeDifference = (currentTime - productUpdatedTime) / (1000 * 60); // Time difference in minutes

        if (timeDifference > 20) {
          // Release product stock if it hasn't been updated in the last 20 minutes
          await productModel.updateOne(
            { _id: cartProduct.id },
            { $inc: { stock: cartProduct.quantity } }
          );
          cartProduct.available = false;
        } else {
          validProducts.push(cartProduct);
        }
      }

      // Update the cart with valid products
      cart.products = validProducts;
      await cart.save();
      return { status: "success" };
    }
  } catch (error) {
    console.error("Error updating carts:", error);
    throw error;
  }
}

export async function addOrRemoveProductToWishList(product) {
  const connect = await connectMongo();
  const session = await auth();
  const userId = session?.user?.id;

  try {
    // Find the wish list document for the user
    let wishList = await wishModel.findOne({ userId });

    // If the wish list doesn't exist, create a new one
    if (!wishList) {
      wishList = new wishModel({ userId, products: [] });
    }

    // Check if the product ID exists in the wish list
    const productIndex = wishList.products.findIndex(
      (p) => p.productId === product.productId
    );

    if (productIndex !== -1) {
      // If the product is already in the wish list, remove it
      wishList.products.splice(productIndex, 1);
    } else {
      // Otherwise, add the product to the wish list
      wishList.products.push({ ...product });
    }

    // Save the updated wish list
    await wishList.save();

    return { status: "success" };
  } catch (error) {
    throw error;
  }
}

export async function getOrders() {
  const connect = await connectMongo();
  const session = await auth();
  const userId = session?.user?.id;
  try {
    const orders = await orderModel
      .findOne({
        userId: userId,
      })
      .lean();
    return replaceMongoIdInArray(orders.orders);
  } catch (error) {
    console.error("Error getting orders:", error);
    return null;
  }
}

export async function getOrder(id) {
  const connect = await connectMongo();
  const session = await auth();
  const userId = session?.user?.id;
  try {
    const order = await orderModel.findOne({ userId }).lean();
    const filteredOrder = order?.orders?.filter((o) => o._id.toString() === id);
    return replaceMongoIdInArray(filteredOrder);
  } catch (error) {
    console.error("Error getting order:", error);
    return null;
  }
}
