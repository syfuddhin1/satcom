"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FcBriefcase,
  FcCurrencyExchange,
  FcHome,
  FcList,
  FcManager,
  FcMindMap,
  FcMoneyTransfer,
  FcSerialTasks,
  FcSettings,
} from "react-icons/fc";
import { useSelector } from "react-redux";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toggleMenu } from "@/store/silces/menuSlice";
import { useDispatch } from "react-redux";

export default function SideBar() {
  const menu = useSelector((state) => state.menu);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const navItems = [
    {
      href: "/dashboard",
      icon: <FcHome className="text-3xl" />,
      label: "Dashboard",
    },
    {
      href: "/areas",
      icon: <FcMindMap className="text-3xl" />,
      label: "Areas",
      subMenu: [
        {
          href: "/areas/zone",
          icon: <FcList className="text-3xl" />,
          label: "Zone",
        },
        {
          href: "/areas/areas",
          icon: <FcList className="text-3xl" />,
          label: "Area",
        },
      ],
    },
    {
      href: "/users",
      icon: <FcManager className="text-3xl" />,
      label: "Users",
      subMenu: [
        {
          href: "/users",
          icon: <FcList className="text-3xl" />,
          label: "List",
        },
        {
          href: "/managers",
          icon: <FcList className="text-3xl" />,
          label: "Managers",
        },
      ],
    },
    {
      href: "/transactions",
      icon: <FcMoneyTransfer className="text-3xl" />,
      label: "Transactions",
      subMenu: [
        {
          href: "/transactions",
          icon: <FcList className="text-3xl" />,
          label: "List",
        },
        {
          href: "/transactions/add",
          icon: <FcList className="text-3xl" />,
          label: "Add",
        },
      ],
    },
    {
      href: "/accounts",
      icon: <FcCurrencyExchange className="text-3xl" />,
      label: "Accounts",
      subMenu: [
        {
          href: "/accounts",
          icon: <FcList className="text-3xl" />,
          label: "List",
        },
        {
          href: "/accounts/add",
          icon: <FcList className="text-3xl" />,
          label: "Add",
        },
      ],
    },
    {
      href: "/inventory",
      icon: <FcBriefcase className="text-3xl" />,
      label: "Inventory",
      subMenu: [
        {
          href: "/inventory",
          icon: <FcList className="text-3xl" />,
          label: "List",
        },
        {
          href: "/inventory/add",
          icon: <FcList className="text-3xl" />,
          label: "Add",
        },
      ],
    },
    {
      href: "/settings",
      icon: <FcSettings className="text-3xl" />,
      label: "Settings",
      subMenu: [
        {
          href: "/settings",
          icon: <FcList className="text-3xl" />,
          label: "List",
        },
        {
          href: "/settings/add",
          icon: <FcList className="text-3xl" />,
          label: "Add",
        },
      ],
    },
  ];
  const handleHover = (e) => {
    e.preventDefault();
    if (menu) {
      dispatch(toggleMenu());
    }
  };

  return (
    <aside
      className={`${
        menu ? "w-24" : "w-96"
      } duration-700 border-r px-4 overflow-hidden`}
    >
      <h1 className="text-2xl h-24 font-[800] uppercase flex items-center justify-center gap-5 my-10 border-b pb-4">
        <FcSerialTasks className="text-5xl" />
        <span className={!menu ? "min-w-fit opacity-100" : "hidden opacity-0"}>
          Sat Com.
        </span>
      </h1>

      <ul className={`flex flex-col gap-4`}>
        <Accordion
          type="single"
          collapsible
          className="space-y-2"
          onMouseOver={handleHover}
        >
          {navItems.map(({ href, icon, label, subMenu }) => (
            <AccordionItem value={href} key={href}>
              <AccordionTrigger
                className={`flex items-center gap-4 px-4 w-full py-2  duration-500 font-[600] text-sm rounded ${
                  pathname.includes(href)
                    ? "bg-[#9096ff] text-white"
                    : "hover:bg-[#9096ff] hover:text-white"
                }`}
                isSubmenu={subMenu?.length > 0}
              >
                <div className="flex items-center peer gap-4">
                  <Link
                    href={href}
                    className={`flex items-center gap-4 w-full`}
                  >
                    {icon}
                    <span className={menu ? "hidden" : "block"}>{label}</span>
                  </Link>
                </div>
              </AccordionTrigger>
              {subMenu?.map(({ href, icon, label }) => (
                <AccordionContent
                  key={href}
                  className={`flex items-center gap-4 p-2 pl-10 w-full mt-2 duration-500 font-[600] text-md rounded ${
                    pathname.includes(href)
                      ? "bg-[#9096ffa1] text-white"
                      : "hover:bg-[#9096ff] hover:text-white"
                  }`}
                >
                  <Link href={href} className="flex items-center gap-4 w-full">
                    {icon}
                    <span className={menu ? "hidden" : "block"}>{label}</span>
                  </Link>
                </AccordionContent>
              ))}
            </AccordionItem>
          ))}
        </Accordion>
      </ul>
    </aside>
  );
}
