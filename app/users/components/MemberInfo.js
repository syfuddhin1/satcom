// Reusable InfoRow component
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between py-2 border-b border-gray-200">
    <span className="font-semibold text-gray-700">{label}:</span>
    <span className="text-gray-600">{value}</span>
  </div>
);

export default function MemberInfo({ userData }) {
  return (
    <div className="p-6 rounded-lg shadow-lg border border-gray-200 mt-10">
      <h1 className="text-lg text-center mb-4 font-bold">Member Information</h1>

      <div className="grid grid-cols-2 w-full gap-4">
        <InfoRow label="Member Code" value={userData.memberCode} />
        <InfoRow label="Zone" value={userData.zone.name} />
        <InfoRow label="Area" value={userData.area.name} />
        <InfoRow label="Mobile" value={userData.mobile} />
        <InfoRow label="Email" value={userData.email.toLowerCase()} />
        <InfoRow label="NID No" value={userData.nidNo} />
        <InfoRow label="Address" value={userData.address} />
        <InfoRow label="Status" value={userData.status} />
        <InfoRow label="Role" value={userData.role} />
        <InfoRow label="Username" value={userData.username} />

        {/* Timestamps */}
        <div className="text-sm text-gray-500 ">
          <div>Created: {userData.createdAt}</div>
          <div>Updated: {userData.updatedAt}</div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}
