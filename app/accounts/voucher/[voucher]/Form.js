"use client";
import { generateVoucherCode } from "@/lib/actions";
import { useAddVoucherMutation, useFetchAccountsQuery } from "@/store/slices/accountsApi";
import { useEffect, useState } from "react";

export default function Form({ accountType }) {
  const [formData, setFormData] = useState({
    createdAt: new Date().toISOString().slice(0, 10),
    voucherId: "",
    accountId: "",
    accountType: accountType,
    moodOfPayment: "",
    amount: "",
    remarks: "-",
  });
  const { data } = useFetchAccountsQuery();
  const [addVoucher, { isLoading, isSuccess }] = useAddVoucherMutation();
  useEffect(() => {
    async function getVoucherCode() {
      const voucherId = await generateVoucherCode(formData.createdAt, accountType);
      setFormData((prevState) => ({
        ...prevState,
        voucherId: voucherId,
      }));
    }
    getVoucherCode();
  }, [accountType, formData.createdAt]);
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

  useEffect(() => {
    if(isSuccess){
      alert("Voucher added successfully");
    }
  },[isSuccess])
console.log(data);

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
            name="createdAt"
            value={formData.createdAt}
            onChange={handleChange}
            required
            // disabled={"true"}
          />
        </label>

        <label className={"none"}>
          <p>Voucher Code</p>
          <input
            type={"text"}
            name="voucherId"
            value={formData.voucherId}
            required
            disabled={"true"}
          />
        </label>
        <label className={"none"}>
          <p>Voucher Type</p>
          <input
            type={"text"}
            name="accountType"
            value={formData.accountType}
            required
            disabled={"true"}
          />
        </label>
        <label>
          <p>Account</p>
          <select
            name="accountId"
            value={formData.accountId}
            onChange={handleChange}
            required
          >
            <option>Select An option</option>
            {data?.accountsData.map((account) => (
              <option key={account.id} value={account.id}>
                {account.title}
              </option>
            ))}
          </select>
        </label>

        <label>
          <p>Payment Method</p>
          <select
            name="moodOfPayment"
            value={formData.moodOfPayment}
            onChange={handleChange}
            required
          >
            <option>Select An option</option>
            <option value="cash">Cash</option>
            <option value="bank">Bank</option>
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
          <p>Remarks / Narration</p>
          <textarea
            type={"text"}
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            required={false}
            placeholder="Remarks / Narration"
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
