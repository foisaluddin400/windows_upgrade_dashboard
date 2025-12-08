import React, { useState } from "react";
import { Table, Pagination } from "antd";
import { Edit, Trash2 } from "lucide-react";
import { useGetCategoryQuery } from "../redux/api/metaApi";
import AddServicesCategory from "./AddServicesCategory";
import EditCategory from "./EditCategory";

const ServiceTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data: categoryData, isLoading } = useGetCategoryQuery({
    searchTerm: "",
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
    avatar: item.category_image,
    name: item.name,
    total_service: item.totalServices,
    total_task: item.totalTask,
  }));

  const handleEdit = (record) => {
    setSelectedCategory(record);
    setEditModal(true);
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

          <button
            className="p-2 bg-red-50 hover:bg-red-100 rounded-md text-red-600"
            onClick={() => console.log("Delete:", record.key)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
        Service Categories
      </h1>

      <div>
        {" "}
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-[#E63946] w-[150px] text-white py-2 rounded"
        >
          Add Category
        </button>
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
