import React, { useState } from "react";
import { Pagination, Table, Tag } from "antd";
import { FaExclamationCircle } from "react-icons/fa";
import { Link } from "react-router";
import {
  useGetCancelReqQuery,
  useGetExtentionReqQuery,
} from "../redux/api/metaApi";
import { Navigate } from "../Navigate";

const ManageDispute = () => {
  const [activeTab, setActiveTab] = useState("EXTENSION");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // 🔥 Fetch APIs
  const { data: extensionReqData } = useGetExtentionReqQuery({
    page: currentPage,
    limit: pageSize,
  });

  const { data: cancelReqData } = useGetCancelReqQuery({
    page: currentPage,
    limit: pageSize,
  });

  // 🔥 Convert API data
  const convertData = (list, type) =>
    list?.map((item, index) => ({
      id: item._id,
      sl: index + 1 + (currentPage - 1) * pageSize,
      requestedBy:
        item.requestedFromModel === "Customer" ? "User" : "Service Provider",
      requestDate: new Date(item.createdAt).toLocaleDateString(),
      status: item.status,
      requestType:
        type === "CANCEL" ? "Cancellation Request" : "Extension Request",
    })) || [];

  const cancellationRows = convertData(cancelReqData?.data?.result, "CANCEL");

  const extensionRows = convertData(extensionReqData?.data?.result, "EXT");

  const columns = [
    { title: "SL", dataIndex: "sl", width: 90 },
    {
      title: "Requested By",
      dataIndex: "requestedBy",
      render: (text) => <span className="font-medium">{text}</span>,
    },
    { title: "Request Type", dataIndex: "requestType" },
    { title: "Request Date", dataIndex: "requestDate" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag
          color={
            status === "PENDING"
              ? "orange"
              : status === "ACCEPTED"
              ? "green"
              : "red"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <Link
          to={`/manage-dispute/${record.id}`}
          className="text-[#115E59] text-xl"
        >
          <FaExclamationCircle />
        </Link>
      ),
    },
  ];

  return (
    <div className="p-3 sm:p-5">
     <Navigate title="Manage Dispute" />

      {/* 🔥 Normal Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => {
            setActiveTab("EXTENSION");
            setCurrentPage(1);
          }}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "EXTENSION"
              ? "bg-[#115E59] text-white shadow-sm cursor-pointer"
              : "text-gray-600 hover:text-gray-800 cursor-pointer"
          }`}
        >
          Extension Request
        </button>

        <button
          onClick={() => {
            setActiveTab("CANCELLATION");
            setCurrentPage(1);
          }}
         className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "CANCELLATION"
              ? "bg-[#115E59] text-white shadow-sm cursor-pointer"
              : "text-gray-600 hover:text-gray-800 cursor-pointer"
          }`}
        >
          Cancellation Request
        </button>
      </div>

      {/* 🔥 Table */}
      <Table
        columns={columns}
        dataSource={
          activeTab === "CANCELLATION" ? cancellationRows : extensionRows
        }
        rowKey="id"
        pagination={false}
      />

      {/* 🔥 Pagination */}
      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={
            activeTab === "CANCELLATION"
              ? cancelReqData?.data?.meta?.total
              : extensionReqData?.data?.meta?.total
          }
          onChange={setCurrentPage}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default ManageDispute;
