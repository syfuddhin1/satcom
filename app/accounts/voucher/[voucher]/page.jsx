import Form from "./Form";

// import VouchersTable from "../_component/VoucherTable";

export default async function Voucher({ params: { voucher } }) {
  return (
    <div>
      <p className=" mb-2 text-center text-xl font-black capitalize w-full">
        {/* {voucher} Voucher */}
      </p>
      <Form accountType={voucher} />
      <div className="p-5">{/* <VouchersTable voucherType={voucher} /> */}</div>
    </div>
  );
}
