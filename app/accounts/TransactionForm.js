import { useForm, Controller } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import SearchableDropdown from "./SearchableDropdown";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TransactionForm({ setShowForm }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      member: "",
      packageId: "",
      amount: 0,
      transactionDate: new Date().toISOString().slice(0, 10),
      modeOfPayment: "cash",
      remarks: "",
    },
  });

  const memberValue = watch("member"); // Watch a single field
  const packageIdValue = watch("packageId"); // Watch a single field
  useEffect(() => {
    const price = memberValue?.packages?.find(
      (pack) => pack.packageType === packageIdValue
    )?.package_bill;
    if (price) {
      setValue("amount", price);
    }
  }, [packageIdValue, memberValue, setValue]);
  const onSubmit = async (data) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URI}/api/transactions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: data.amount,
          packageId: data.packageId,
          userId: data.member._id,
          transactionDate: data.transactionDate,
          modeOfPayment: data.modeOfPayment,
          remarks: data.remarks,
        }),
      }
    );
    const newData = await res.json();
    router.refresh();
    if (res.statusCode === 200) {
      setShowForm(false);
    }
    console.log(newData);
  };

  return (
    <div
      className="modal-content absolute top-0 right-0 left-0 z-50 w-full bg-black/20 h-full p-4 backdrop-blur-sm flex justify-center items-center animate-fade"
      onClick={() => setShowForm(false)}
    >
      <div
        className="w-[40rem] bg-background/50 animate-scale rounded-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-header flex justify-between rounded-md items-center p-4 bg-[#9096ff] text-white">
          <h5 className="text-lg font-semibold">Add Monthly Transactions</h5>
          <span
            className="cursor-pointer text-2xl"
            onClick={() => setShowForm(false)}
            aria-label="Close form"
          >
            <AiOutlineClose />
          </span>
        </header>

        <div className="modal-body p-6">
          <form
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* Member */}
            <div className="flex items-center">
              <label className="w-1/3 text-sm font-medium">
                User<span className="text-red-500">*</span>
              </label>
              {/* <input
                type="search"
                placeholder="Type min 3 char of name or code..."
                className="form-input w-2/3"
                {...register("member", { required: "Member is required" })}
              /> */}
              <Controller
                name="member"
                control={control}
                rules={{ required: "Member is required" }}
                render={({ field }) => (
                  <SearchableDropdown
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                )}
              />
            </div>
            {errors.member && (
              <span className="text-red-500 text-sm pl-[12.5rem]">
                {errors.member.message}
              </span>
            )}

            {/* Package ID */}
            <div className="flex items-center">
              <label className="w-1/3 text-sm font-medium">
                Package ID<span className="text-red-500">*</span>
              </label>
              <select
                className="form-select w-2/3"
                {...register("packageId", {
                  required: "Package ID is required",
                })}
              >
                <option value="">---Select---</option>
                {memberValue?.packages?.map((pack) => (
                  <option key={pack._id} value={pack.packageType}>
                    {pack.packageName}
                  </option>
                ))}
              </select>
            </div>
            {errors.packageId && (
              <span className="text-red-500 text-sm pl-[12.5rem]">
                {errors.packageId.message}
              </span>
            )}
            {/* Transaction Date */}
            <div className="flex items-center">
              <label className="w-1/3 text-sm font-medium">
                Transaction Date<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className="form-input w-2/3"
                disabled
                {...register("transactionDate")}
              />
            </div>

            {/* Payment Mode */}
            <div className="flex items-center">
              <label className="w-1/3 text-sm font-medium">
                Mode of Payment<span className="text-red-500">*</span>
              </label>
              <select
                className="form-select w-2/3"
                {...register("modeOfPayment", {
                  required: "Payment mode is required",
                })}
              >
                <option value="cash">Cash</option>
                <option value="bank">Bank</option>
                <option value="mBanking">Mobile Banking</option>
              </select>
            </div>
            {errors.modeOfPayment && (
              <span className="text-red-500 text-sm pl-[12.5rem]">
                {errors.modeOfPayment.message}
              </span>
            )}
            {/* Amount */}
            <div className="flex items-center">
              <label className="w-1/3 text-sm font-medium">
                Amount<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className="form-input w-2/3"
                {...register("amount", {
                  required: "Amount is required",
                  min: { value: 1, message: "Amount must be at least 1" },
                })}
              />
            </div>
            {errors.amount && (
              <span className="text-red-500 text-sm pl-[12.5rem]">
                {errors.amount.message}
              </span>
            )}
            {/* Remarks */}
            <div className="flex items-center">
              <label className="w-1/3 text-sm font-medium">Remarks</label>
              <input
                type="text"
                className="form-input w-2/3"
                placeholder="Optional"
                {...register("remarks")}
              />
            </div>

            {/* Buttons */}
            <div className="text-center mt-6 flex gap-5 justify-center">
              <button
                type="submit"
                className="bg-[#9096ff] rounded text-white px-4 py-2"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-yellow-600 rounded text-white px-4 py-2"
                onClick={() => reset()}
              >
                Reset
              </button>
              <button
                type="button"
                className="bg-red-400 rounded text-white px-4 py-2"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
