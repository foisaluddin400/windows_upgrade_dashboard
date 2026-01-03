import React, { useState } from "react";
import { Table, Pagination, Popconfirm, Input } from "antd";
import { Edit, Search, Trash2 } from "lucide-react";
import {
  useDeleteCategoryMutation,
  useGetCategoryQuery,
} from "../redux/api/metaApi";
import AddServicesCategory from "./AddServicesCategory";
import EditCategory from "./EditCategory";
import { toast } from "react-toastify";
import { Navigate } from "../Navigate";
import { SearchOutlined } from "@ant-design/icons";
const ServiceTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [deleteCategory] = useDeleteCategoryMutation();
  const { data: categoryData, isLoading } = useGetCategoryQuery({
    searchTerm,
    page: currentPage,
    limit: pageSize,
  });
  const [openAddModal, setOpenAddModal] = useState(false);
  const serverData = categoryData?.data?.result || [];
  const meta = categoryData?.data?.meta;
  const [editModal, setEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  // Map API → AntD Table Format
  const data = serverData.map((item) => ({
    key: item._id,
   

  avatar: item.category_image
        ? `${item.category_image}`
        : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",


    name: item.name,
    total_service: item.totalServices,
    total_task: item.totalTask,
  }));

  const handleEdit = (record) => {
    setSelectedCategory(record);
    setEditModal(true);
  };
  const handleDeleteCategory = async (id) => {
    console.log(id);
    try {
      const res = await deleteCategory(id).unwrap();
      toast.success(res?.message);
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };
  const columns = [
    {
      title: "Image",
      dataIndex: "avatar",
      key: "avatar",
      render: (img) => (
        <img
          src={img || "/placeholder.png"}
          alt="category"
          className="w-12 h-12 rounded-md object-cover border"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <span className="font-semibold text-gray-800">{name}</span>
      ),
    },
    {
      title: "Total Services",
      dataIndex: "total_service",
      key: "total_service",
    },
    {
      title: "Total Tasks",
      dataIndex: "total_task",
      key: "total_task",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center space-x-4">
          <button
            className="p-2 bg-blue-50 hover:bg-blue-100 rounded-md text-blue-600"
            onClick={() => handleEdit(record)}
          >
            <Edit size={18} />
          </button>
          <Popconfirm
            title="Are you sure to delete this Category?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDeleteCategory(record.key)}
          >
            <button className="p-2 bg-red-50 hover:bg-red-100 rounded-md text-red-600">
              <Trash2 size={18} />
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between">
        {" "}
        <Navigate title="Services Categories" />
        <div className="flex gap-4">
          {" "}

               <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search provider"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none w-64"
            />
          </div>
       <div>
           <button
            onClick={() => setOpenAddModal(true)}
            className="bg-[#115E59] w-[150px] cursor-pointer hover:bg-teal-700 px-4 text-white py-2 rounded"
          >
            Add Category
          </button>
       </div>
        </div>
      </div>

      <Table
        dataSource={data}
        columns={columns}
        loading={isLoading}
        pagination={false}
        rowKey="key"
        scroll={{ x: "max-content" }}
      />

      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={meta?.total || 0}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>

      <AddServicesCategory
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
      />

      <EditCategory
        editModal={editModal}
        setEditModal={setEditModal}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default ServiceTable;
