import Form from "./Form";

export default async function Voucher({ params: { voucher } }) {
  return (
    <div>
      <Form accountType={voucher} />
    </div>
  );
}
