import { useState } from "react";
import { Button, Input, Modal, Pagination, Table, Tag } from "antd";
import { MdBlockFlipped, MdEdit } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { Trash2, User } from "lucide-react";
import AddAdmin from "./AddAdmin";
import {
    useDeleteAdminMutation,
  useGetAdminQuery,
  useUpdateBlockStatusMutation,
} from "../../redux/api/userApi";
import { toast } from "react-toastify";

const AdminData = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { data: adminData } = useGetAdminQuery({
    page: currentPage,
    limit: pageSize,
  });
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [confirmInput, setConfirmInput] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [updateStatusBlock] = useUpdateBlockStatusMutation();
const [deleteAdmin,{ isLoading: deleting }] = useDeleteAdminMutation()
  const handleBlock = async (record) => {
    const id = record?._id;
    try {
      const res = await updateStatusBlock(id);
      toast.success(res?.data.message);
    } catch (error) {
      toast.error(error?.message);
    }
  };
    const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setConfirmInput("");
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    if (confirmInput.toLowerCase() !== "delete") {
      toast.error("Please type 'delete' to confirm");
      return;
    }

    try {
      await deleteAdmin(productToDelete._id).unwrap();
      toast.success("Product deleted successfully");
      setDeleteModalVisible(false);
      setProductToDelete(null);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete product");
    }
  };

  const columns = [
    {
      title: "User",
      key: "user",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          {record.profile_image ? (
            <img
              src={record.profile_image}
              className="w-10 h-10 rounded-full object-cover"
              alt={record.name}
            />
          ) : (
            <FaRegCircleUser className="text-3xl text-gray-400" />
          )}
          <span className="font-medium">{record.name}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Tag color={record.isActive ? "green" : "red"}>
          {record.isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-3 text-xl">
          {/* BLOCK / UNBLOCK */}
          <button
            onClick={() => handleBlock(record)}
            className={`p-2 rounded-lg ${
              record.isActive
                ? "bg-gray-100 text-gray-600"
                : "bg-red-100 text-red-600"
            }`}
            title={record.isActive ? "Block Admin" : "Unblock Admin"}
          >
            <MdBlockFlipped />
          </button>

    

          <button
            className="p-2 bg-red-50 hover:bg-red-100 rounded-md text-red-600"
            onClick={() => handleDeleteClick(record)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <User className="w-5 h-5 text-gray-600" />
          <h1 className="text-2xl font-semibold text-gray-800">
            User Management
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          {/* ⬇️ EXPORT BUTTON */}
          <button
            onClick={() => setOpenAddModal(true)}
            className="bg-[#115E59] hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <span className="hidden sm:inline">Make Admin</span>
          </button>
        </div>
      </div>
      <Table
        dataSource={adminData?.data?.result || []}
        columns={columns}
        rowKey="_id"
        pagination={false}
      />

      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={adminData?.data?.meta?.total || 0}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
       <Modal
        title={<span className="text-red-600 font-bold">Confirm Delete</span>}
        open={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        footer={[
          <Button
            key="cancel"
            onClick={() => setDeleteModalVisible(false)}
            disabled={deleting}
          >
            Cancel
          </Button>,
          <Button
            key="delete"
            type="primary"
            danger
            loading={deleting}
            onClick={confirmDelete}
            disabled={confirmInput.toLowerCase() !== "delete"}
          >
            Delete Product
          </Button>,
        ]}
        centered
        width={420}
      >
        <div className="py-6">
          <p className="text-gray-700 mb-4">
            This action <strong>cannot be undone</strong>. This will permanently delete the Admin: <span className="font-bold text-md ">
            "{productToDelete?.name}"
          </span>
          </p>
          
          <p className="text-sm text-gray-600 mb-4">
            Please type <span className="font-bold text-red-600">delete</span> to confirm:
          </p>
          <Input
            placeholder="Type 'delete' here"
            value={confirmInput}
            onChange={(e) => setConfirmInput(e.target.value)}
            className="text-lg"
            autoFocus
          />
        </div>
      </Modal>
      <AddAdmin openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} />
    </div>
  );
};

export default AdminData;
