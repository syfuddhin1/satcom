import { useSession } from "next-auth/react";
import DropMenu from "./DropMenu";

export default function UserSection() {
  const { data } = useSession();
  return (
    <div className="relative ">
      <button className="text-blue-400 peer text-xs">
        {data?.user?.name}
      </button>
      <DropMenu user={data?.user} />
    </div>
  );
}
