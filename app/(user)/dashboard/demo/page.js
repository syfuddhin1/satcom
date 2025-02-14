// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";
// import { Users, Package, CreditCard, Building2 } from "lucide-react";

// const Dashboard = () => {
//   const formatCurrency = (value) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(value);
//   };

//   const colors = [
//     "#3B82F6",
//     "#10B981",
//     "#F59E0B",
//     "#EF4444",
//     "#8B5CF6",
//     "#EC4899",
//   ];

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>

//       {/* Top Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center">
//             <Users className="h-8 w-8 text-blue-500 mr-4" />
//             <div>
//               <p className="text-sm text-gray-500">Total Users</p>
//               <h3 className="text-2xl font-bold">2</h3>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center">
//             <Package className="h-8 w-8 text-green-500 mr-4" />
//             <div>
//               <p className="text-sm text-gray-500">Total Transactions</p>
//               <h3 className="text-2xl font-bold">16</h3>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center">
//             <CreditCard className="h-8 w-8 text-yellow-500 mr-4" />
//             <div>
//               <p className="text-sm text-gray-500">Total Revenue</p>
//               <h3 className="text-2xl font-bold">{formatCurrency(8800)}</h3>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center">
//             <Building2 className="h-8 w-8 text-purple-500 mr-4" />
//             <div>
//               <p className="text-sm text-gray-500">Total Staff</p>
//               <h3 className="text-2xl font-bold">3</h3>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         {/* Revenue by Package */}
//         <div className="bg-white rounded-lg shadow">
//           <div className="p-6 border-b border-gray-200">
//             <h2 className="text-lg font-semibold">Revenue by Package</h2>
//           </div>
//           <div className="p-6 h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart
//                 data={[
//                   { name: "buissness", amount: 4000 },
//                   { name: "basic", amount: 3000 },
//                   { name: "sta", amount: 1800 },
//                 ]}
//               >
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip formatter={(value) => formatCurrency(value)} />
//                 <Bar dataKey="amount" fill="#3B82F6" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Payment Methods */}
//         <div className="bg-white rounded-lg shadow">
//           <div className="p-6 border-b border-gray-200">
//             <h2 className="text-lg font-semibold">
//               Payment Methods Distribution
//             </h2>
//           </div>
//           <div className="p-6 h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={[
//                     { name: "Cash", value: 8200 },
//                     { name: "Bank", value: 300 },
//                     { name: "Mobile Banking", value: 300 },
//                   ]}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={100}
//                   dataKey="value"
//                   label={({ name, percent }) =>
//                     `${name} ${(percent * 100).toFixed(0)}%`
//                   }
//                 >
//                   {[0, 1, 2].map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={colors[index]} />
//                   ))}
//                 </Pie>
//                 <Tooltip formatter={(value) => formatCurrency(value)} />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* Popular Packages Table */}
//       <div className="bg-white rounded-lg shadow">
//         <div className="p-6 border-b border-gray-200">
//           <h2 className="text-lg font-semibold">Popular Packages</h2>
//         </div>
//         <div className="p-6">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-gray-50">
//                   <th className="text-left p-4 font-semibold text-gray-600">
//                     Package Name
//                   </th>
//                   <th className="text-right p-4 font-semibold text-gray-600">
//                     Users
//                   </th>
//                   <th className="text-right p-4 font-semibold text-gray-600">
//                     Total Revenue
//                   </th>
//                   <th className="text-right p-4 font-semibold text-gray-600">
//                     Transactions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {[
//                   { name: "basic", users: 2, revenue: 3000, transactions: 6 },
//                   { name: "sta", users: 2, revenue: 1800, transactions: 6 },
//                   {
//                     name: "buissness",
//                     users: 1,
//                     revenue: 4000,
//                     transactions: 4,
//                   },
//                 ].map((pkg) => (
//                   <tr key={pkg.name} className="hover:bg-gray-50">
//                     <td className="p-4">{pkg.name}</td>
//                     <td className="text-right p-4">{pkg.users}</td>
//                     <td className="text-right p-4">
//                       {formatCurrency(pkg.revenue)}
//                     </td>
//                     <td className="text-right p-4">{pkg.transactions}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


const StatsCard = ({ title, value, trend, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          <span className={`text-sm ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        </div>
        <div className="text-gray-400">
          {icon}
        </div>
      </div>
    </div>
  )
}

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const LineChartCard = ({ data, title }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-gray-700 font-semibold mb-4">{title}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#4F46E5" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

const ProgressCard = ({ title, current, total }) => {
  const percentage = (current / total) * 100
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between mb-2">
        <h3 className="text-gray-700 font-semibold">{title}</h3>
        <span className="text-gray-500">{current}/{total}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-indigo-600 h-2 rounded-full" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const BarChartCard = ({ data, title }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-gray-700 font-semibold mb-4">{title}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

const DashboardGrid = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {children}
    </div>
  )
}

const KeyMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Users"
        value="2"
        icon="👥"
        subtitle="Active Users: 2"
      />
      <StatsCard
        title="Total Revenue"
        value="₹8,800"
        icon="💰"
        subtitle="From 16 Transactions"
      />
      <StatsCard
        title="Team Size"
        value="3"
        icon="👨‍💼"
        subtitle="2 Employees, 1 Manager"
      />
      <StatsCard
        title="Total Assets"
        value="₹70,000"
        icon="📈"
        subtitle="Debit Balance"
      />
    </div>
  )
}
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const RevenueCharts = ({ monthlyRevenue, packageRevenue }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyRevenue}>
            <XAxis dataKey="transactionDate" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="_sum.amount" stroke="#4F46E5" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Revenue by Package</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={packageRevenue}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalAmount" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'

const COLORS = ['#4F46E5', '#10B981', '#F59E0B']

const PaymentDistribution = ({ payments }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6">
      <h3 className="text-lg font-semibold mb-4">Payment Methods Distribution</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={payments}
              dataKey="_sum.amount"
              nameKey="modeOfPayment"
              cx="50%"
              cy="50%"
              outerRadius={100}
            >
              {payments.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
const PackagePopularity = ({ packages }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6">
      <h3 className="text-lg font-semibold mb-4">Package Subscriptions</h3>
      <div className="space-y-4">
        {packages.map(pkg => (
          <div key={pkg.id} className="flex items-center">
            <div className="flex-1">
              <p className="font-medium">{pkg.name}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${(pkg._count.userPackages / 2) * 100}%` }}
                />
              </div>
            </div>
            <span className="ml-4 text-gray-600">
              {pkg._count.userPackages} users
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
const Dashboard = ({ data }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <KeyMetrics />
      
      <RevenueCharts 
        monthlyRevenue={data.revenue.monthlyRevenue}
        packageRevenue={data.packages.transformedRevenue}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaymentDistribution payments={data.payments.payments} />
        <PackagePopularity packages={data.packages.popularPackages} />
      </div>
    </div>
  )
}

export default Dashboard