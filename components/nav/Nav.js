"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoDot, GoDotFill } from "react-icons/go";
import {
  FcBriefcase,
  FcClapperboard,
  FcCurrencyExchange,
  FcGenericSortingAsc,
  FcHome,
  FcList,
  FcManager,
  FcMindMap,
  FcMoneyTransfer,
  FcOrgUnit,
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
import { toggleMenu } from "@/store/slices/menuSlice";
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
      href: "/packages",
      icon: <FcOrgUnit className="text-3xl" />,
      label: "Packages",
      subMenu: [
        {
          href: "/packages/internet",
          icon: <FcGenericSortingAsc className="text-3xl -rotate-90" />,
          label: "Internet Service",
        },
        {
          href: "/packages/cabletv",
          icon: <FcClapperboard className="text-3xl" />,
          label: "Cable TV Network",
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
          label: "Customers",
        },
        {
          href: "/staffs",
          icon: <FcList className="text-3xl" />,
          label: "Staffs",
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
      ],
    },
    {
      href: "/accounts/list",
      icon: <FcCurrencyExchange className="text-3xl" />,
      label: "Accounts",
      subMenu: [
        {
          href: "/accounts/voucher",
          icon: <FcList className="text-3xl" />,
          label: "Add Voucher",
        },
        {
          href: "/accounts/list",
          icon: <FcList className="text-3xl" />,
          label: "Voucher List",
        },
        {
          href: "/accounts/add",
          icon: <FcList className="text-3xl" />,
          label: "Add Account",
        },
      ],
    },
    {
      href: "/report",
      icon: <FcList className="text-3xl" />,
      label: "Report",
      subMenu: [
        {
          href: "/report/due",
          icon: <FcList className="text-3xl" />,
          label: "Due List",
        },
        // {
        //   href: "/report/monthly",
        //   icon: <FcList className="text-3xl" />,
        //   label: "Monthly Report",
        // },
        // {
        //   href: "/report/transaction",
        //   icon: <FcList className="text-3xl" />,
        //   label: "Transaction Report",
        // },
        {
          href: "/report/cashbook",
          icon: <FcList className="text-3xl" />,
          label: "Cashbook Report",
        },
        {
          href: "/report/revenue",
          icon: <FcList className="text-3xl" />,
          label: "Income Statement",  
        },
        // {
        //   href: "/report/ledger",
        //   icon: <FcList className="text-3xl" />,
        //   label: "Ledger Report",
        // },
        // {
        //   href: "/report/balance",
        //   icon: <FcList className="text-3xl" />,
        //   label: "Balance Sheet",
        // },
      ],
    },
    // {
    //   href: "/inventory",
    //   icon: <FcBriefcase className="text-3xl" />,
    //   label: "Inventory",
    //   subMenu: [
    //     {
    //       href: "/inventory",
    //       icon: <FcList className="text-3xl" />,
    //       label: "List",
    //     },
    //     {
    //       href: "/inventory/add",
    //       icon: <FcList className="text-3xl" />,
    //       label: "Add",
    //     },
    //   ],
    // },
    {
      href: "/settings",
      icon: <FcSettings className="text-3xl" />,
      label: "Settings",
      // subMenu: [
      //   {
      //     href: "/settings",
      //     icon: <FcList className="text-3xl" />,
      //     label: "List",
      //   },
      //   {
      //     href: "/settings/add",
      //     icon: <FcList className="text-3xl" />,
      //     label: "Add",
      //   },
      // ],
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
        menu ? "w-24 px-2" : "w-96 px-4"
      }  border-r  overflow-hidden`}
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
                className={`flex items-center gap-4 px-4 w-full py-2 transition-all duration-500 font-[600] text-sm rounded ${
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
                  <Link
                    href={href}
                    className="flex items-center gap-4 w-full"
                  >
                    <GoDotFill className="text-emerald-400" />
                    <span className={menu ? "hidden" : "block"}>
                      {label}
                    </span>
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
