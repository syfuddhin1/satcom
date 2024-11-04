"use client";
import { useState } from "react";

export default function Form({ accountType, user, date }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().slice(0, 10),
    voucherCode: "",
    accountType: accountType,
    creditAccounts: accountType == "payment" ? 108 : "",
    debitAccounts: accountType == "receipt" ? 108 : "",
    amount: "",
    narration: "-",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addVoucher(formData);
    } catch (error) {
      console.error("Error adding voucher: ", error);
      // alert("Failed to add voucher.");
    }
  };

  return (
    <div className="w-full flex justify-center">
      <form
        className={
          " grid grid-cols-3 gap-4 w-[70vw] border rounded p-4 addVoucher"
        }
        onSubmit={handleSubmit}
      >
        <label>
          <p>Date</p>
          <input
            type={"date"}
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            disabled={"true"}
          />
        </label>

        <label className={"none"}>
          <p>Voucher Code</p>
          <input
            type={"text"}
            name="voucherCode"
            value={formData.voucherCode}
            onChange={handleChange}
            required
          />
        </label>
        <label className={"none"}>
          <p>Voucher Type</p>
          <input
            type={"text"}
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <p>Credit Accounts</p>
          <select
            name="creditAccounts"
            value={formData.creditAccounts}
            onChange={handleChange}
            required
            disabled={accountType === "payment"}
          >
            <option>Select An option</option>
          </select>
        </label>

        <label>
          <p>Debit Accounts</p>
          <select
            name="debitAccounts"
            value={formData.debitAccounts}
            onChange={handleChange}
            required
            disabled={accountType === "receipt"}
          >
            <option>Select An option</option>
          </select>
        </label>
        <label>
          <p>Amount</p>
          <input
            type={"number"}
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            placeholder="amount"
          />
        </label>
        <label className={"col-span-3"}>
          <p>Narration</p>
          <textarea
            type={"text"}
            name="narration"
            value={formData.narration}
            onChange={handleChange}
            required={false}
            placeholder="Narration"
            rows={2}
            className="w-full "
          />
        </label>
        <div className={"w-full col-span-3 flex justify-center gap-5 "}>
          <button
            className={"bg-sky-400 text-white p-2 px-5 rounded"}
            type="submit"
          >
            Add
          </button>
          <button
            className={"bg-yellow-400 text-white p-2 px-5 rounded"}
            type="button"
          >
            Reset
          </button>
          <button
            className={"bg-red-600/80 text-white p-2 px-5 rounded"}
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
      <style>{`
      .addVoucher label input, .addVoucher label select{
        width: 100%;
      }
      `}</style>
    </div>
  );
}

const generateVoucherCode = (branchDetails, voucher) => {
  // Get the current date and time
  const accountType = voucher == "payment" ? "PV" : "RV";
  // Format the voucher code
  const voucherCode = `${accountType}-${branchDetails.code}-${branchDetails.date}`;

  return voucherCode;
};
