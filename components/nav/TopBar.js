"use client";
import { toggleMenu } from "@/store/slices/menuSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CgBorderLeft, CgBorderRight } from "react-icons/cg";
import { GiMoonBats, GiRingingBell } from "react-icons/gi";
import { LuMessagesSquare } from "react-icons/lu";
import { PiSunThin } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import DropMenu from "./DropMenu";
import UserSection from "./UserSection";
export default function TopBar() {
  const [isDark, setDark] = useState(false);
  const menu = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDark(true);
    }
  };
  return (
    <div className="h-16 p-2 border-b flex justify-between items-center text-2xl px-5">
      <div>
        <button
          onClick={() => dispatch(toggleMenu())}
          className="text-blue-400 text-4xl"
        >
          {menu ? <CgBorderLeft /> : <CgBorderRight />}
        </button>
      </div>
      <div className="user flex items-center justify-around gap-10  mx-10">
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme}>
            {!isDark ? (
              <PiSunThin className="text-yellow-400 drop-shadow-xl" />
            ) : (
              <GiMoonBats className="drop-shadow-xl" />
            )}
          </button>
        </div>
        <div>
          <GiRingingBell className="text-yellow-400 drop-shadow-xl" />
        </div>
        <div>
          <LuMessagesSquare className="text-blue-400 drop-shadow-xl" />
        </div>
        <UserSection />
      </div>
    </div>
  );
}
