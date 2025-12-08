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

import { useGetDashboardProviderChartQuery } from "../../redux/api/metaApi";

const TaskProviderGrowth = () => {
  const [selectedYear, setSelectedYear] = useState();

  // API call with selected year
  const { data: providerData, isLoading } =
    useGetDashboardProviderChartQuery(selectedYear);

  const chartData = providerData?.data?.chartData || [];
  const yearsDropdown = providerData?.data?.yearsDropdown || [];

  // Auto set first year on load
  useEffect(() => {
    if (!selectedYear && yearsDropdown?.length > 0) {
      setSelectedYear(yearsDropdown[0]);
    }
  }, [yearsDropdown]);

  return (
    <div className="p-6 w-full">
      <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">

        {/* Header + Year Selector */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Task Provider Growth
          </h2>

          <div className="flex items-center gap-3">
            <label className="text-gray-700 font-medium">Year:</label>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-white border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
            >
              {yearsDropdown.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Chart Section */}
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid stroke="#eee" strokeDasharray="3 3" />

              <XAxis dataKey="month" stroke="#374151" />
              <YAxis stroke="#374151" />

              <Tooltip />
              <Legend />

              <Bar
                dataKey="totalUser"
                name="Total Providers"
                fill="#115E59"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TaskProviderGrowth;
