/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetDashboardCustomerChartQuery } from "../../redux/api/metaApi";

const UserGrowth = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Fetch from API
  const { data: growthData, isLoading } =
    useGetDashboardCustomerChartQuery(selectedYear);

  const monthsData = growthData?.data?.chartData || [];
  const yearsDropdown = growthData?.data?.yearsDropdown || [];

  // Recharts format adjust
  const formattedData = monthsData.map((item) => ({
    name: item.month,
    totalUser: item.totalUser,
  }));

  return (
    <div className="py-4 w-full">
      <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">User Growth</h2>

          {/* Year Dropdown */}
          <div className="flex items-center gap-4">
            <label className="text-gray-700 font-medium">Year:</label>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-white text-gray-700 rounded-lg px-4 py-2 border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {yearsDropdown.map((year) => (
                <option key={year} value={year} className="bg-white">
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Chart */}
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={formattedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="name" stroke="#374151" fontSize={12} />
              <YAxis stroke="#374151" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255,255,255,0.95)",
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                  color: "#374151",
                }}
                cursor={{ fill: "rgba(0,0,0,0.05)" }}
              />
              <Legend />
              <Bar
                dataKey="totalUser"
                fill="#115E59" // Blue
                radius={[4, 4, 0, 0]}
                name="Total Users"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UserGrowth;
