import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { AiOutlineProfile, AiOutlineSetting } from "react-icons/ai";
import { IoLogOut } from "react-icons/io5";

export default function DropMenu({ user }) {
  return (
    <div className="absolute -z-50 peer-focus:z-50 bg-background peer-focus:opacity-100 opacity-0 right-0 duration-700 peer-focus:top-14  top-20 shadow-lg w-80 h-80 p-8 flex flex-col text-sm  rounded gap-5">
      <div className=" flex gap-2 items-center border-b py-5">
        <Image
          src="/assets/media/avatars/150-2.jpg"
          alt="User"
          className="rounded-full"
          width={60}
          height={60}
        />
        <div className="">
          <div className="text-xl font-bold">{user?.name}</div>
          <div className="text-sm font-medium">Admin</div>
        </div>
      </div>
      <div className=" *:flex *:gap-4 space-y-5 *:items-center mt-5">
        <div className="">
          <AiOutlineProfile className="text-blue-400" /> Profile
        </div>
        <div className="">
          <AiOutlineSetting /> Settings
        </div>
        <button className="" onClick={() => signOut()}>
          <IoLogOut className="text-red-400" /> Logout
        </button>
      </div>
    </div>
  );
}
