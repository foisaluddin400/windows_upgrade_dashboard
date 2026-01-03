"use client";

import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { Navigate } from "../Navigate";
import { useGetEarningChartQuery } from "../redux/api/metaApi";
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
import LastEarnHistory from "../components/Charts/LastEarnHistory";
import { Select } from "antd";

const Earnings = () => {
  const [selectedYear, setSelectedYear] = useState();

  // 🔹 API call (always call, year optional)
  const { data: earningChartData, isLoading } =
    useGetEarningChartQuery({ year: selectedYear || undefined });

  // 🔹 Extract data safely
  const totalEarnings = earningChartData?.data?.totalEarning || 0;
  const yearsDropdown = earningChartData?.data?.yearsDropdown || [];
  const chartData = earningChartData?.data?.chartData || [];

  // 🔹 Auto select first year
  useEffect(() => {
    if (!selectedYear && yearsDropdown.length > 0) {
      setSelectedYear(yearsDropdown[0]);
    }
  }, [yearsDropdown, selectedYear]);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center space-x-3 justify-between">
        <Navigate title="Earnings" />
      
      </div>

      <div className="flex flex-col lg:flex-row gap-12 ">
        {/* Total Earnings Card */}
        <div className="lg:w-[550px] h-[280px] p-10 shadow-md rounded-2xl bg-gradient-to-bl from-[#E6F4F1] to-white">
          <p className="text-xl font-bold mb-4">Total Earnings</p>
          <p className="text-4xl font-bold text-[#115E59]">
            {isLoading ? "Loading..." : totalEarnings}
          </p>
        </div>

        {/* Chart */}
        <div className="flex-1 w-full">
          <div className="bg-white shadow-lg rounded-2xl p-6 border">
            {/* Header + Year Selector */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Earning Chart</h2>

              <Select
                value={selectedYear}
                onChange={(value) => setSelectedYear(value)}
                placeholder="Select Year"
                style={{ width: 140 }}
                options={yearsDropdown.map((year) => ({
                  label: year,
                  value: year,
                }))}
              />
            </div>

            {/* Chart */}
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="totalEarning"
                    name="Total Earning"
                    fill="#115E59"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* History */}
      <div className="">
        <LastEarnHistory />
      </div>
    </div>
  );
};

export default Earnings;
