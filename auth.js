import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserFromDb } from "./lib/actions";
import bcrypt from "bcryptjs";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        phone: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        const { phone, password } = credentials;
        user = await getUserFromDb(phone);

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!user || !isPasswordValid) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }
        return user;
      },
    }),
  ],
});
