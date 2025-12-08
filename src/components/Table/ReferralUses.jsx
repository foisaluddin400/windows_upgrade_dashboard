"use client";

import { Table, Tag } from "antd";
import { Download, Search } from "lucide-react";

const ReferralUses = () => {
  const processedRefunds = [
    {
      id: 101,
      taskId: "TSK101",
      refferred_value: "₦150",
      refundTo: "Theodore Mosciski",
      refundToAvatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face&round=full",
      email: "cadence@gmail.com",
      amount: "95.00",
      date: "2025-01-10",
      status: "Used",
    },
    {
      id: 102,
      taskId: "TSK102",
      refferred_value: "₦150",
      refundTo: "Daniel Walker IV",
      refundToAvatar:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=40&h=40&fit=crop&crop=face&round=full",
      email: "seanmnd@mail.ru",
      amount: "180.25",
      date: "2025-01-10",
      status: "Active",
    },
    {
      id: 103,
      taskId: "TSK103",
      refferred_value: "₦150",
      refundTo: "Ms. Natasha Spinka",
      refundToAvatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face&round=full",
      email: "sterris@gmail.com",
      amount: "65.50",
      date: "2025-01-10",
      status: "Active",
    },
  ];

  // 🔥 AntD Columns
  const columns = [
    {
      title: "Referrer Info",
      dataIndex: "refundTo",
      key: "refundTo",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.refundToAvatar}
            alt={record.refundTo}
            className="w-9 h-9 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">{record.refundTo}</p>
            <p className="text-xs text-gray-500">{record.email}</p>
          </div>
        </div>
      ),
    },

    {
      title: "Referred User",
      dataIndex: "refundTo",
      key: "referredUser",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.refundToAvatar}
            alt={record.refundTo}
            className="w-9 h-9 rounded-full object-cover"
          />
          <p className="text-sm text-gray-900">{record.refundTo}</p>
        </div>
      ),
    },

    {
      title: "Referred Value",
      dataIndex: "refferred_value",
      key: "value",
      render: (value) => <span className="text-sm text-gray-900">{value}</span>,
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={status === "Active" ? "green" : "blue"}
          className="px-3 py-1 text-xs rounded-full"
        >
          {status}
        </Tag>
      ),
    },

    {
      title: "Applied Date",
      dataIndex: "date",
      key: "date",
      render: (date) => <span className="text-sm text-gray-900">{date}</span>,
    },
  ];

  return (
    <>
      {/* Search + Export */}
      <div className="flex items-center justify-end gap-4 mb-4">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 w-64"
          />
        </div>

        <button className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Download size={18} />
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className=" ">
        <Table
          dataSource={processedRefunds}
          columns={columns}
          pagination={false}
          rowKey="id"
        />
      </div>
    </>
  );
};

export default ReferralUses;
