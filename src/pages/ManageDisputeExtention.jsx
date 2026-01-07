import React, { useState } from "react";
import { Pagination, Table, Tag } from "antd";
import { FaExclamationCircle } from "react-icons/fa";
import { Link } from "react-router";
import { useGetExtentionReqQuery } from "../redux/api/metaApi";

const ManageDisputeExtention = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data } = useGetExtentionReqQuery({
    page: currentPage,
    limit: pageSize,
  });

  console.log(data)

  const rows =
    data?.data?.result?.map((item, index) => ({
      id: item._id,
      sl: index + 1 + (currentPage - 1) * pageSize,
      requestedBy:
        item.requestedFromModel === "Customer"
          ? "User"
          : "Service Provider",
      requestType: "Extension Request",
      requestDate: new Date(item.createdAt).toLocaleDateString(),
      status: item.status,
    })) || [];

  const columns = [
    { title: "SL", dataIndex: "sl", width: 80 },
    { title: "Requested By", dataIndex: "requestedBy" },
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
    <>
      <Table
        columns={columns}
        dataSource={rows}
        rowKey="id"
        pagination={false}
      />

      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={data?.data?.meta?.total || 0}
          onChange={setCurrentPage}
          showSizeChanger={false}
        />
      </div>
    </>
  );
};

export default ManageDisputeExtention;
