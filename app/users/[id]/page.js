import Image from "next/image";
import DetailsNav from "./_components/DetailsNav";
import DemoImage from "./blank.png";

export default async function MemberInformation({ params: { id } }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URI}/api/users/${id}`,
    {
      cache: "no-store",
    }
  );

  const { userData } = await res.json();

  // console.log("userData", userData);

  return (
    <div>
      <h1 className="px-10 text-2xl w-full text-center border-b p-2">
        Member Information
      </h1>
      <div>
        <div className="flex gap-5">
          <Image
            width={200}
            height={200}
            src={userData?.avatar || DemoImage}
            alt={userData.name}
            className="shadow-md rounded-md border-8 border-white"
          />
          <div className="p-4 grid">
            <h1 className="text-2xl font-bold">{userData.name}</h1>
            <p className="text-lg">
              <span className="font-bold mr-2">Member Code:</span>
              {userData.memberCode}
            </p>
            <p className="text-lg">
              <span className="font-bold mr-2">Status:</span>
              {userData.status}
            </p>
            <p className="text-lg">
              <span className="font-bold mr-2">Mobile No:</span>
              {userData.mobile}
            </p>
            <p className="text-lg capitalize">
              <span className="font-bold mr-2">Area:</span>
              {userData?.area.name}, {userData.zone.name}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <DetailsNav userData={userData} />
    </div>
  );
}
