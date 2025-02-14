import { CreditCard, DollarSign, HeartCrack, Users } from "lucide-react";
import MonthlyRevenueChart from "./components/MonthlyRevenueChart";
import OverView from "./components/OverView";
import PackagePopularity from "./components/PackegePopularity";
import RevenueByPackage from "./components/RevenueByPackage";
import PaymentDistribution from "./components/PaymentDistribution";
import { User } from "lucide-react";
import { Package } from "lucide-react";

export default async function DashboardPage() {
  const AllAnalyticsData = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URI}/api/dashboard`,
    {
      cache: "no-store",
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
  const twoMonthsRevenue = getCurrentAndLastMonthRevenue(
    AllAnalyticsData.revenue.monthlyRevenue
  );
  // Data Array
  const cardData = [
    {
      title: "Total Users",
      value: AllAnalyticsData.users.totalUsers,
      description: `${
        (AllAnalyticsData.users.activeUsers /
          AllAnalyticsData.users.totalUsers) *
        100
      }% active users`,
      Icon: Users,
      color: "#99CCFF66", // light color with 20% opacity
    },
    {
      title: "Total Revenue",
      value: `$${AllAnalyticsData.revenue.totalRevenue._sum.amount}`,
      description: `${(
        (twoMonthsRevenue.currentMonth.revenue -
          twoMonthsRevenue.lastMonth.revenue) /
        100
      ).toFixed(2)}% from last month`,
      Icon: DollarSign,
      color: "#A3E4A066",
    },
    {
      title: "Total Transactions",
      value: AllAnalyticsData.transactions.totalTransactions,
      description: `All transactions as on ${AllAnalyticsData.transactions.transactionsPerDay[0].transactionDate.slice(
        0,
        10
      )}`,
      Icon: CreditCard,
      color: "#FFEE9966",
    },
    {
      title: "Total Assets",
      value: `$${AllAnalyticsData.accounts.totalAssets}`,
      description: `$${AllAnalyticsData.accounts.currentBalance} in debit accounts`,
      Icon: HeartCrack,
      color: "#FFB6C166",
    },
    {
      title: "Total Staff",
      value: AllAnalyticsData.people.totalEmployees,
      description: `Total Manegers: ${AllAnalyticsData.people.totalManagers}`,
      Icon: User,
      color: "#FFC66C66",
    },
    {
      title: "Total Packages",
      value: AllAnalyticsData.packages.totalPackages,
      description: `Popular Packages: ${AllAnalyticsData.packages.popularPackages.map(
        (pkg) => pkg.name
      )[0]}`,
      Icon: Package,
      color: "pink",
    },
  ];

  const analyticsData = [
    {
      title: "Daily Revenue",
      component: <OverView data={AllAnalyticsData.revenue.dailyRevenue} />,
      className: "col-span-4",
    },
    {
      title: "Monthly Revenue",
      component: (
        <MonthlyRevenueChart data={AllAnalyticsData.revenue.monthlyRevenue} />
      ),
      className: "col-span-3",
    },
    {
      title: "Revenue By Package",
      component: (
        <RevenueByPackage data={AllAnalyticsData.packages.transformedRevenue} />
      ),
      className: "col-span-2",
    },
    {
      title: "Package Popularity",
      component: (
        <PackagePopularity data={AllAnalyticsData.packages.popularPackages} />
      ),
      className: "col-span-3",
    },
    {
      title: "Payment Distribution",
      component: (
        <PaymentDistribution payments={AllAnalyticsData.payments.payments} />
      ),
      className: "col-span-2",
    },
  ];
  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cardData.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              value={card.value}
              description={card.description}
              Icon={card.Icon}
              color={card.color}
            />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {analyticsData.map((card, index) => (
            <AnalyticsCard
              key={index}
              title={card.title}
              component={card.component}
              className={card.className}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Card Component
const Card = ({ title, value, description, Icon, color }) => (
  <div
    className="rounded-lg border bg-card text-card-foreground shadow-sm"
    style={{ borderColor: color, backgroundColor: color }}
  >
    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
      <h3 className="tracking-tight text-sm font-medium">{title}</h3>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </div>
    <div className="p-6 pt-0">
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  </div>
);

const AnalyticsCard = ({
  title,
  component,
  className = "col-span-4",
  color,
}) => {
  return (
    <div
      className={
        className + " rounded-lg border bg-card text-card-foreground shadow-sm"
      }
      style={{ borderColor: color, backgroundColor: color }}
    >
      <div className="p-6">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="p-6 pt-0 pl-2">{component}</div>
    </div>
  );
};

function getCurrentAndLastMonthRevenue(monthlyRevenue) {
  const currentDate = new Date();
  const currentMonth = currentDate.toISOString().slice(0, 7); // "YYYY-MM"

  const lastMonthDate = new Date(currentDate);
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
  const lastMonth = lastMonthDate.toISOString().slice(0, 7); // "YYYY-MM"

  return {
    currentMonth: {
      month: currentMonth,
      revenue: monthlyRevenue[currentMonth] || 0,
    },
    lastMonth: {
      month: lastMonth,
      revenue: monthlyRevenue[lastMonth] || 0,
    },
  };
}
