"use client";

import React, { useEffect, useState } from "react";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Navigate } from "../Navigate";
import { useGetTaskQuery } from "../redux/api/metaApi";
import { Pagination, Table } from "antd";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";

const ActiveTasks = () => {
  const [activeTab, setActiveTab] = useState("Lifetime");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filterParams, setFilterParams] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  const handlePageChange = (page) => setCurrentPage(page);

  // Update filter params whenever tab or date changes
  useEffect(() => {
    const updateFilterParams = () => {
      const tab = activeTab.toLowerCase();
      const params = {};

      if (tab !== "lifetime") {
        params.type = tab;
      }

      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // JS months are 0-indexed
      const day = currentDate.getDate();

      switch (tab) {
        case "daily":
          params.date = `${year}-${month.toString().padStart(2, "0")}-${day
            .toString()
            .padStart(2, "0")}`;
          break;
        case "weekly":
          // Calculate ISO week number
          const d = new Date(currentDate);
          d.setHours(0, 0, 0, 0);
          d.setDate(d.getDate() + 4 - (d.getDay() || 7));
          const yearStart = new Date(d.getFullYear(), 0, 1);
          const weekNumber = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
          params.week = weekNumber;
          params.year = year;
          break;
        case "monthly":
          params.month = month;
          params.year = year;
          break;
        case "yearly":
          params.year = year;
          break;
        case "lifetime":
          // No date params
          break;
        default:
          break;
      }

      setFilterParams(params);
    };

    updateFilterParams();
  }, [activeTab, currentDate]);

  const { data: taskAllData, isLoading } = useGetTaskQuery({
    page: currentPage,
    limit: pageSize,
    ...filterParams,
  });

  const { data: taskAllDataExcell } = useGetTaskQuery({
    page: 1,
    limit: 10000,
  });

  const tabs = ["Daily", "Weekly", "Monthly", "Yearly", "Lifetime"];

  const formatDateDisplay = () => {
    switch (activeTab) {
      case "Daily":
        return currentDate.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      case "Weekly":
        const d = new Date(currentDate);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        const yearStart = new Date(d.getFullYear(), 0, 1);
        const weekNumber = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
        return `Week ${weekNumber}, ${currentDate.getFullYear()}`;
      case "Monthly":
        return currentDate.toLocaleDateString("en-GB", {
          month: "long",
          year: "numeric",
        });
      case "Yearly":
        return currentDate.getFullYear().toString();
      case "Lifetime":
        return "All Time";
      default:
        return "";
    }
  };

  const navigateDate = (direction) => {
    if (activeTab === "Lifetime") return;

    const newDate = new Date(currentDate);

    switch (activeTab) {
      case "Daily":
        newDate.setDate(newDate.getDate() + direction);
        break;
      case "Weekly":
        newDate.setDate(newDate.getDate() + direction * 7);
        break;
      case "Monthly":
        newDate.setMonth(newDate.getMonth() + direction);
        break;
      case "Yearly":
        newDate.setFullYear(newDate.getFullYear() + direction);
        break;
      default:
        break;
    }

    setCurrentDate(newDate);
  };

  // Format table data
  const formattedData = taskAllData?.data?.result?.map((task, index) => ({
    key: task._id,
    sl: (currentPage - 1) * pageSize + index + 1,
    postedBy: {
      name: task.customer?.name || "N/A",
      email: task.customer?.email || "N/A",

      imageUrl: task.customer?.profile_image
        ? `${task.customer?.profile_image}`
        : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    },
    title: task.title,
    category: task.category?.name || "N/A",
    assignedTo: task.provider
      ? {
          name: task.provider.name || "N/A",
          email: task.provider.email || "N/A",

          imageUrl: task.provider.profile_image
            ? `${task.provider.profile_image}`
            : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
        }
      : null,
    status: task.status,
  }));

  const exportToExcel = () => {
    if (!formattedData.length) {
      toast.error("No data available to export");
      return;
    }

    // Format data for Excel (remove avatar and unnecessary fields)
    const formattedDataExcel = taskAllDataExcell?.data?.result?.map((task) => ({
      key: task._id,

      postedBy: {
        name: task.customer?.name || "N/A",
        email: task.customer?.email || "N/A",
      },
      title: task.title,
      category: task.category?.name || "N/A",
      assignedTo: task.provider
        ? {
            name: task.provider.name || "N/A",
            email: task.provider.email || "N/A",
          }
        : null,
      status: task.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedDataExcel);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    XLSX.writeFile(workbook, "users-data.xlsx");
  };

  const columns = [
    {
      title: "SL No.",
      key: "sl",
      align: "center",
      render: (_, record) => record.sl,
    },
    {
      title: "Posted By",
      key: "postedBy",
      align: "center",
      render: (_, record) => (
        <div className="text-center">
          <img
            src={record.postedBy.imageUrl}
            alt={record.postedBy.name}
            className="w-12 h-12 rounded-full mx-auto object-cover border-2 border-gray-200 shadow-sm"
          />
          <p className="font-medium mt-2">{record.postedBy.name}</p>
          <p className="text-xs text-gray-500">{record.postedBy.email}</p>
        </div>
      ),
    },
    {
      title: "Task Title",
      dataIndex: "title",
      key: "title",
      align: "center",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      align: "center",
    },
    {
      title: "Assigned To (Provider)",
      key: "assignedTo",
      align: "center",
      render: (_, record) =>
        record.assignedTo ? (
          <div className="text-center">
            <img
              src={record.assignedTo.imageUrl}
              alt={record.assignedTo.name}
              className="w-12 h-12 rounded-full mx-auto object-cover border-2 border-gray-200 shadow-sm"
            />
            <p className="font-medium mt-2">{record.assignedTo.name}</p>
            <p className="text-xs text-gray-500">{record.assignedTo.email}</p>
          </div>
        ) : (
          <span className="text-gray-400 italic">Not Assigned</span>
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => (
        <span
          className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
            status === "COMPLETED"
              ? "bg-green-100 text-green-800"
              : status === "IN_PROGRESS"
              ? "bg-blue-100 text-blue-800"
              : status === "CANCELLED"
              ? "bg-red-100 text-red-800"
              : status === "OPEN_FOR_BID"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {status.replace(/_/g, " ")}
        </span>
      ),
    },
  ];

  return (
    <div className="">
      {/* Header & Filter Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <Navigate title="Active Tasks" />

          <button
            onClick={exportToExcel}
            className="bg-[#115E59] hover:bg-teal-700 text-white px-6 py-3 rounded-xl flex items-center gap-3 transition-all shadow-md hover:shadow-lg"
          >
            <Download className="w-5 h-5" />
            <span className="font-medium">Export CSV</span>
          </button>
        </div>

        {/* Filter Section - Tabs + Date Navigation */}
        <div className="flex flex-col items-center gap-6">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
                className={`px-6 py-3 rounded-xl font-medium text-sm md:text-base transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-[#115E59] text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Date Navigation - Only when not Lifetime */}
          {activeTab !== "Lifetime" && (
            <div className="flex items-center gap-6 bg-gray-100 rounded-xl px-6 py-4">
              <button
                onClick={() => navigateDate(-1)}
                className="p-2 rounded-lg bg-white shadow hover:shadow-md transition-all"
              >
                <ChevronLeft className="w-5 h-5 text-[#115E59]" />
              </button>

              <div className="text-center min-w-48">
                <p className="text-lg font-semibold text-gray-900">
                  {formatDateDisplay()}
                </p>
              </div>

              <button
                onClick={() => navigateDate(1)}
                className="p-2 rounded-lg bg-white shadow hover:shadow-md transition-all"
              >
                <ChevronRight className="w-5 h-5 text-[#115E59]" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {taskAllData?.data?.stats?.map((stat, index) => {
          const bgColor =
            stat.status === "COMPLETED"
              ? "bg-green-50 border-green-200"
              : stat.status === "IN_PROGRESS"
              ? "bg-blue-50 border-blue-200"
              : stat.status === "CANCELLED"
              ? "bg-red-50 border-red-200"
              : stat.status === "OPEN_FOR_BID"
              ? "bg-yellow-50 border-yellow-200"
              : "bg-gray-50 border-gray-200";

          const textColor =
            stat.status === "COMPLETED"
              ? "text-green-700"
              : stat.status === "IN_PROGRESS"
              ? "text-blue-700"
              : stat.status === "CANCELLED"
              ? "text-red-700"
              : stat.status === "OPEN_FOR_BID"
              ? "text-yellow-700"
              : "text-gray-700";

          return (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 border ${bgColor} shadow-md hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-4xl font-bold text-gray-900">
                    {stat.count}
                  </p>
                  <p className="text-sm font-medium text-gray-600 mt-2">
                    {stat.status.replace(/_/g, " ")}
                  </p>
                </div>
                <span className={`text-lg font-bold ${textColor}`}>
                  {stat.trend === "increase" ? "↑" : "↓"}{" "}
                  {stat.changePercentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Table */}
      {isLoading ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#115E59] mx-auto"></div>
          <p className="mt-6 text-lg text-gray-600">Loading tasks...</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <Table
            dataSource={formattedData}
            columns={columns}
            rowKey="key"
            pagination={false}
            loading={isLoading}
          />

          {/* Pagination */}
          {taskAllData?.data?.meta?.total > pageSize && (
            <div className="p-6 border-t border-gray-200">
              <div className="flex justify-center">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={taskAllData?.data?.meta?.total || 0}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                  className="shadow-lg"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ActiveTasks;
