/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Input,
  Modal,
  Pagination,
  Table,
  Tabs,
  Tag,
  message,
  Button,
  Form,
  DatePicker,
  Select,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { ArrowLeft, TagIcon } from "lucide-react";
import { CalendarOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const ManagePromo = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Dummy Promo Codes
  const [promoCodes, setPromoCodes] = useState(
    Array.from({ length: 25 }, (_, index) => ({
      key: index + 1,
      promoCode: `PROMO${1000 + index}`,
      promoType: index % 2 === 0 ? "Percentage" : "Flat",
      value: index % 2 === 0 ? `${10 + index}%` : `₦ ${5 + index}`,
      limit: 50 + index,
      startDate: new Date().toLocaleDateString(),
      endDate: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toLocaleDateString(),
      status: index % 2 === 0 ? "Active" : "Expired",
    }))
  );

  // Dummy Promo Uses
  const promoUses = Array.from({ length: 25 }, (_, index) => ({
    key: index + 1,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    phone: `+8801${Math.floor(100000000 + Math.random() * 900000000)}`,
    image: `https://avatar.iran.liara.run/public/${index + 1}`,
    promoCode: `PROMO${1000 + (index % 10)}`,
    value: index % 2 === 0 ? "₦ 5" : "₦ 10",
    usageDate: new Date().toLocaleDateString(),
  }));

  // Modal states
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(null);

  const showUpdateModal = (record) => {
    setSelectedPromo(record);
    setIsUpdateModalOpen(true);
  };

  const handleCancelUpdate = () => {
    setIsUpdateModalOpen(false);
    setSelectedPromo(null);
  };

  const handleUpdateSubmit = (values) => {
    message.success(
      `Promo Code ${selectedPromo.promoCode} updated successfully!`
    );
    setIsUpdateModalOpen(false);
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: `Are you sure you want to delete ${record.promoCode}?`,
      icon: <ExclamationCircleOutlined />,
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        setPromoCodes(promoCodes.filter((p) => p.key !== record.key));
        message.success(`${record.promoCode} deleted successfully!`);
      },
    });
  };

  // Promo Code Columns
  const promoCodeColumns = [
    { title: "Promo Code", dataIndex: "promoCode", key: "promoCode" },
    { title: "Promo Type", dataIndex: "promoType", key: "promoType" },
    { title: "Value", dataIndex: "value", key: "value" },
    { title: "Limit", dataIndex: "limit", key: "limit" },
    { title: "Start Date", dataIndex: "startDate", key: "startDate" },
    { title: "End Date", dataIndex: "endDate", key: "endDate" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            style={{ background: "#115E59", color: "white" }}
            onClick={() => showUpdateModal(record)}
          >
            Update
          </Button>
          <Button danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  // Promo Uses Columns
  const promoUseColumns = [
    {
      title: "User Info",
      key: "userInfo",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.image}
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          />
          <div>
            <div>{record.name}</div>
            <div className="text-xs text-gray-500">{record.email}</div>
            <div className="text-xs text-gray-500">{record.phone}</div>
          </div>
        </div>
      ),
    },
    { title: "Promo Code Used", dataIndex: "promoCode", key: "promoCode" },
    { title: "Value", dataIndex: "value", key: "value" },
    { title: "Usage Date", dataIndex: "usageDate", key: "usageDate" },
  ];

  // Pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startPromo = (currentPage - 1) * pageSize;
  const endPromo = startPromo + pageSize;
  const paginatedPromoCodes = promoCodes.slice(startPromo, endPromo);

  const startUses = (currentPage - 1) * pageSize;
  const endUses = startUses + pageSize;
  const paginatedUses = promoUses.slice(startUses, endUses);

  return (
    <div className="bg-white p-3">
      <div className="flex justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Link
    
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <TagIcon className="w-5 h-5 text-gray-600" />
          </Link>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Manage Promo
          </h1>
        </div>
        <Button
          type="primary"
          style={{ background: "#115E59" }}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add New Promo
        </Button>
      </div>

     <Tabs 
  defaultActiveKey="1"
  className="custom-promo-tabs"
>
  <TabPane tab="Promo Code" key="1">
    <Table
      dataSource={paginatedPromoCodes}
      columns={promoCodeColumns}
      pagination={false}
      scroll={{ x: 900 }}
    />

    <div className="mt-4 flex justify-center">
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={promoCodes?.length}
        onChange={handlePageChange}
        showSizeChanger={false}
      />
    </div>
  </TabPane>

  <TabPane tab="Promo Use" key="2">
    <Table
      dataSource={paginatedUses}
      columns={promoUseColumns}
      pagination={false}
      scroll={{ x: 800 }}
    />

    <div className="mt-4 flex justify-center">
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={promoUses?.length}
        onChange={handlePageChange}
        showSizeChanger={false}
      />
    </div>
  </TabPane>
</Tabs>

{/* Add custom styles */}
<style jsx global>{`
  /* Active tab styling */
  .custom-promo-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #115E59 !important;
    font-weight: 600;
  }
  
  /* Active tab indicator (bottom border) */
  .custom-promo-tabs .ant-tabs-ink-bar {
    background: #115E59 !important;
    height: 3px !important;
  }
  
  /* Hover state */
  .custom-promo-tabs .ant-tabs-tab:hover .ant-tabs-tab-btn {
    color: #115E59 !important;
  }
  
  /* Tab bar styling */
  .custom-promo-tabs .ant-tabs-nav {
    margin-bottom: 24px;
  }
  
  /* Inactive tabs */
  .custom-promo-tabs .ant-tabs-tab {
    color: #6B7280;
    font-weight: 500;
  }
  
  /* Pagination active color */
  .custom-promo-tabs .ant-pagination-item-active {
    border-color: #115E59 !important;
    background-color: #115E59 !important;
  }
  
  .custom-promo-tabs .ant-pagination-item-active a {
    color: white !important;
  }
  
  /* Pagination hover */
  .custom-promo-tabs .ant-pagination-item:hover {
    border-color: #115E59 !important;
  }
  
  .custom-promo-tabs .ant-pagination-item:hover a {
    color: #115E59 !important;
  }
  
  /* Next/Prev buttons hover */
  .custom-promo-tabs .ant-pagination-prev:hover .ant-pagination-item-link,
  .custom-promo-tabs .ant-pagination-next:hover .ant-pagination-item-link {
    color: #115E59 !important;
    border-color: #115E59 !important;
  }
`}</style>

      {/* Update Modal */}
      <Modal
        open={isUpdateModalOpen}
        centered
        onCancel={handleCancelUpdate}
        footer={null}
        title="Update Promo Code"
      >
        <div className="mb-6">
          <p className="text-sm text-gray-600 mt-1">
            update promotional coupon to offer discounts and boost engagement.
          </p>
        </div>

        <Form
          layout="vertical"
          onFinish={() => message.success("Promo Added!")}
          className="space-y-4"
        >
          <Form.Item
            label="Promo Code"
            name="promoCode"
            rules={[{ required: true, message: "Please enter promo code" }]}
          >
            <Input
              placeholder="e.g. WELCOME10"
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            label="Promo Type"
            name="promoType"
            rules={[{ required: true, message: "Please enter promo type" }]}
          >
            <Input
              placeholder="e.g. New user first order"
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item label="Uses Limit" name="limit">
            <Input
              placeholder="12"
              type="number"
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Discount Type"
              name="discountType"
              rules={[{ required: true, message: "Select discount type" }]}
            >
              <Select
                placeholder="Select type"
                size="large"
                className="rounded-lg"
              >
                <Select.Option value="percentage">Percentage</Select.Option>
                <Select.Option value="flat">Fixed Amount</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Discount Value"
              name="discountValue"
              rules={[{ required: true, message: "Enter value" }]}
            >
              <Input
                placeholder="e.g. 10"
                type="number"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Valid From"
              name="startDate"
              rules={[{ required: true, message: "Select start date" }]}
            >
              <DatePicker
                placeholder="Select opening time"
                size="large"
                className="w-full rounded-lg"
                format="YYYY-MM-DD"
                suffixIcon={<CalendarOutlined className="text-gray-400" />}
              />
            </Form.Item>

            <Form.Item
              label="Valid To"
              name="endDate"
              rules={[{ required: true, message: "Select end date" }]}
            >
              <DatePicker
                placeholder="Select closing time"
                size="large"
                className="w-full rounded-lg"
                format="YYYY-MM-DD"
                suffixIcon={<CalendarOutlined className="text-gray-400" />}
              />
            </Form.Item>
          </div>

          <div className="flex gap-3 pt-4 mt-6">
            <Button
              onClick={() => setIsAddModalOpen(false)}
              size="large"
              className="flex-1 rounded-lg"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="flex-1 rounded-lg"
              style={{ background: "#115E59" }}
            >
              Save
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Add New Promo Modal */}
      <Modal
        open={isAddModalOpen}
        centered
        onCancel={() => setIsAddModalOpen(false)}
        footer={null}
        width={500}
        className="promo-modal"
      >
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Add New Promo Code
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Create a new promotional coupon to offer discounts and boost
            engagement.
          </p>
        </div>

        <Form
          layout="vertical"
          onFinish={() => message.success("Promo Added!")}
          className="space-y-4"
        >
          <Form.Item
            label="Promo Code"
            name="promoCode"
            rules={[{ required: true, message: "Please enter promo code" }]}
          >
            <Input
              placeholder="e.g. WELCOME10"
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            label="Promo Type"
            name="promoType"
            rules={[{ required: true, message: "Please enter promo type" }]}
          >
            <Input
              placeholder="e.g. New user first order"
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item label="Uses Limit" name="limit">
            <Input
              placeholder="12"
              type="number"
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Discount Type"
              name="discountType"
              rules={[{ required: true, message: "Select discount type" }]}
            >
              <Select
                placeholder="Select type"
                size="large"
                className="rounded-lg"
              >
                <Select.Option value="percentage">Percentage</Select.Option>
                <Select.Option value="flat">Fixed Amount</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Discount Value"
              name="discountValue"
              rules={[{ required: true, message: "Enter value" }]}
            >
              <Input
                placeholder="e.g. 10"
                type="number"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Valid From"
              name="startDate"
              rules={[{ required: true, message: "Select start date" }]}
            >
              <DatePicker
                placeholder="Select opening time"
                size="large"
                className="w-full rounded-lg"
                format="YYYY-MM-DD"
                suffixIcon={<CalendarOutlined className="text-gray-400" />}
              />
            </Form.Item>

            <Form.Item
              label="Valid To"
              name="endDate"
              rules={[{ required: true, message: "Select end date" }]}
            >
              <DatePicker
                placeholder="Select closing time"
                size="large"
                className="w-full rounded-lg"
                format="YYYY-MM-DD"
                suffixIcon={<CalendarOutlined className="text-gray-400" />}
              />
            </Form.Item>
          </div>

          <div className="flex gap-3 pt-4 mt-6">
            <Button
              onClick={() => setIsAddModalOpen(false)}
              size="large"
              className="flex-1 rounded-lg"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="flex-1 rounded-lg"
              style={{ background: "#115E59" }}
            >
              Save
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Add custom styles */}
      <style jsx global>{`
        .promo-modal .ant-modal-content {
          border-radius: 16px;
          overflow: hidden;
        }

        .promo-modal .ant-modal-header {
          border-bottom: none;
          padding: 24px 24px 0;
        }

        .promo-modal .ant-modal-body {
          padding: 24px;
        }

        .promo-modal .ant-form-item-label > label {
          font-weight: 500;
          color: #374151;
        }

        .promo-modal .ant-input,
        .promo-modal .ant-select-selector,
        .promo-modal .ant-picker {
          border-radius: 8px !important;
          border-color: #d1d5db;
        }

        .promo-modal .ant-input:focus,
        .promo-modal .ant-select-focused .ant-select-selector,
        .promo-modal .ant-picker-focused {
          border-color: #115e59 !important;
          box-shadow: 0 0 0 2px rgba(17, 94, 89, 0.1) !important;
        }

        .promo-modal .ant-btn {
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default ManagePromo;
