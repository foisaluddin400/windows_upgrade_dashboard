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
import { Edit, TagIcon, Trash2 } from "lucide-react";
import { Link } from "react-router";
import AddManagePromo from "./AddManagePromo";

import UserPromo from "./UserPromo";
import {
  useDeletePromoMutation,
  useGetAllPromoQuery,
} from "../redux/api/metaApi";
import UpdateManagePromo from "./UpdateManagePromo";
import { toast } from "react-toastify";

const { TabPane } = Tabs;

const ManagePromo = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [deletePromo] = useDeletePromoMutation();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState("promo");

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
      console.log(res);
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
          <button
            type="primary"
            className="p-2 bg-blue-50 hover:bg-blue-100 rounded-md text-blue-600"
            onClick={() => handleEdit(record)}
          >
            <Edit size={18} />
          </button>

          <Popconfirm
            title="Are you sure to delete this promo?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record._id)}
          >
            <button
              className="p-2 bg-red-50 hover:bg-red-100 rounded-md text-red-600"
              type="primary"
              danger
            >
              <Trash2 size={18} />
            </button>
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
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("promo")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "promo"
              ? "bg-[#115E59] text-white shadow-sm cursor-pointer"
              : "text-gray-600 hover:text-gray-800 cursor-pointer"
          }`}
        >
          Promo Code
        </button>

        <button
          onClick={() => setActiveTab("use")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "use"
              ? "bg-[#115E59] text-white shadow-sm cursor-pointer"
              : "text-gray-600 hover:text-gray-800 cursor-pointer"
          }`}
        >
          Promo Use
        </button>
      </div>

      {/* CONTENT */}
      {activeTab === "promo" && (
        <>
          <div className="flex justify-end">
            <button
              onClick={() => setOpenAddModal(true)}
              type="primary"
              className="bg-[#115E59]  cursor-pointer hover:bg-teal-700 px-4 mb-4 text-white py-2 rounded"
            >
              Add New Promo
            </button>
          </div>

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
        </>
      )}

      {activeTab === "use" && <UserPromo />}

      {/* MODALS */}
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
