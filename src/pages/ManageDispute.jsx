import React, { useState } from "react";
import { Pagination, Table, Tabs, Tag } from "antd";
import { FaExclamationCircle } from "react-icons/fa";
import { Link } from "react-router";
import {
  useGetCancelReqQuery,
  useGetExtentionReqQuery,
} from "../redux/api/metaApi";

const ManageDispute = () => {
  const [activeTab, setActiveTab] = useState("EXTENSION");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // 🔥 Fetching both APIs
  const { data: extensionReqData } = useGetExtentionReqQuery({
    page: currentPage,
    limit: pageSize,
  });

  const { data: cancelReqData } = useGetCancelReqQuery({
    page: currentPage,
    limit: pageSize,
  });

  // 🔥 Convert API data → Table format
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

  // 🔥 Final Table Data
  const cancellationRows = convertData(
    cancelReqData?.data?.result,
    "CANCEL"
  );

  const extensionRows = convertData(
    extensionReqData?.data?.result,
    "EXT"
  );

  const columns = [
    {
      title: "SL",
      dataIndex: "sl",
      width: 90,
    },
    {
      title: "Requested By",
      dataIndex: "requestedBy",
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Request Type",
      dataIndex: "requestType",
    },
    {
      title: "Request Date",
      dataIndex: "requestDate",
    },
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
      key: "action",
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-3 sm:p-5">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
        Manage Dispute
      </h1>

      {/* 🔥 Tabs */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        type="card"
        items={[
          { key: "EXTENSION", label: "Extension Request" },
          { key: "CANCELLATION", label: "Cancellation Request" },
          
        ]}
      />

      {/* 🔥 Table */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <Table
          columns={columns}
          dataSource={
            activeTab === "CANCELLATION"
              ? cancellationRows
              : extensionRows
          }
          rowKey="id"
          pagination={false}
        />
      </div>

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
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default ManageDispute;
