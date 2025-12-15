import { Form, Input, Modal, Spin, Upload } from "antd";
import React, { useState } from "react";

import { FaRegCircleUser } from "react-icons/fa6";
import { useAddAdminMutation } from "../../redux/api/userApi";
import { toast } from "react-toastify";

const onPreview = async (file) => {
  let src = file.url;
  if (!src) {
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
  }
  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  imgWindow?.document.write(image.outerHTML);
};

const AddAdmin = ({ openAddModal, setOpenAddModal }) => {
    const [addAdmin] = useAddAdminMutation()
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1)); 
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setOpenAddModal(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);

 


      try {
        const formData = new FormData();
    
        if (fileList.length > 0) {
          formData.append("profile_image", fileList[0].originFileObj);
        }
    
     
        const data = {
            name: values.name,
      email: values.email,
      phone: values.phone,
      password: values.password,
      confirmPassword: values.confirmPassword,
        };
    
        formData.append("data", JSON.stringify(data));
    
        
        const res = await addAdmin(formData).unwrap();
    
        toast.success(res.message);
        form.resetFields();
        setFileList([]);
        setOpenAddModal(false);
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }

    setTimeout(() => {
      setLoading(false);
      handleCancel();
    }, 1500);
  };

  return (
    <Modal
      centered
      open={openAddModal}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <div>
        <h2 className="font-bold text-center mb-6 text-lg">+ Add Admin</h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="px-2"
        >
          {/* PROFILE IMAGE */}
          <Form.Item label="Profile Image">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              maxCount={1}
            >
              {fileList.length < 1 && (
                <div className="flex flex-col items-center">
                  <FaRegCircleUser className="text-3xl text-gray-400" />
                  <span>Upload</span>
                </div>
              )}
            </Upload>
          </Form.Item>

          {/* NAME */}
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input placeholder="Enter name" style={{ height: 40 }} />
          </Form.Item>

          {/* EMAIL */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input placeholder="Enter email" style={{ height: 40 }} />
          </Form.Item>

          {/* PHONE */}
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input placeholder="Enter phone number" style={{ height: 40 }} />
          </Form.Item>

          {/* PASSWORD */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          {/* CONFIRM PASSWORD */}
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Passwords do not match")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm password" />
          </Form.Item>

          {/* SUBMIT */}
          <Form.Item>
            <button
              className={`w-full py-3 rounded text-white flex justify-center items-center gap-2 transition-all ${
                loading
                  ? "bg-[#39817c] cursor-not-allowed"
                  : "bg-[#115E59] hover:bg-[#941822]"
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spin size="small" />
                  <span>Submitting...</span>
                </>
              ) : (
                "Create Admin"
              )}
            </button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default AddAdmin;
