/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Input,
  Modal,
  Pagination,
  Table,
  Tabs,
  Tag,
  Button,
  Popconfirm,
  message,
} from "antd";
import { TagIcon } from "lucide-react";
import { Link } from "react-router";
import AddManagePromo from "./AddManagePromo";

import UserPromo from "./UserPromo";
import { useDeletePromoMutation, useGetAllPromoQuery } from "../redux/api/metaApi";
import UpdateManagePromo from "./UpdateManagePromo";
import { toast } from "react-toastify";


const { TabPane } = Tabs;

const ManagePromo = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
const [deletePromo] = useDeletePromoMutation()
  const [openAddModal, setOpenAddModal] = useState(false);

  // API DATA
  const { data: promoData, refetch } = useGetAllPromoQuery({
    page: currentPage,
    limit: pageSize,
  });

  const promoList = promoData?.data?.result || [];

  // DELETE API
  const [editModal, setEditModal] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(null);
 const handleEdit = (record) => {
    setSelectedPromo(record);
    setEditModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await deletePromo(id).unwrap();
      console.log(res)
      toast.success(res?.message);
      refetch();
    } catch (error) {
      toast.error("Failed to delete promo");
    }
  };

  // Table Columns
  const promoCodeColumns = [
    { title: "Promo Code", dataIndex: "promoCode", key: "promoCode" },
    { title: "Promo Type", dataIndex: "promoType", key: "promoType" },

    {
      title: "Value",
      key: "value",
      render: (_, record) =>
        record.discountType === "PERCENT"
          ? `${record.discountNum}%`
          : `₦${record.discountNum}`,
    },

    { title: "Limit", dataIndex: "limit", key: "limit" },

    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date) => date?.slice(0, 10),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date) => date?.slice(0, 10),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "ACTIVE" ? "green" : "orange"}>{status}</Tag>
      ),
    },

    // 🔥 ACTION BUTTONS
    {
      title: "Actions",
      key: "actions",
      width: 180,
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            style={{ background: "#0C4A6E" }}
        onClick={() => handleEdit(record)}
          >
            Update
          </Button>

          <Popconfirm
            title="Are you sure to delete this promo?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-3">
      {/* Header */}
      <div className="flex justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Link className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <TagIcon className="w-5 h-5 text-gray-600" />
          </Link>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Manage Promo
          </h1>
        </div>

        
      </div>

      {/* Tabs */}
      <Tabs defaultActiveKey="1" className="custom-promo-tabs">
        <TabPane tab="Promo Code" key="1">
          <Button onClick={() => setOpenAddModal(true)} type="primary" style={{ background: "#115E59" }}>
          Add New Promo
        </Button>
          <Table
            dataSource={promoList}
            columns={promoCodeColumns}
            pagination={false}
            rowKey="_id"
            scroll={{ x: 900 }}
          />

          <div className="mt-4 flex justify-center">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={promoData?.data?.meta?.total || 0}
              onChange={setCurrentPage}
              showSizeChanger={false}
            />
          </div>
        </TabPane>

        <TabPane tab="Promo Use" key="2">
          <UserPromo />
        </TabPane>
      </Tabs>

   <AddManagePromo
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
      />

      <UpdateManagePromo
        editModal={editModal}
        setEditModal={setEditModal}
        selectedPromo={selectedPromo}
      />
    </div>
  );
};

export default ManagePromo;
