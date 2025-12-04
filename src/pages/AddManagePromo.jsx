import { Form, Input, message, Modal, Spin, Upload } from "antd";
import React, { useState } from "react";
// import { useAddCategoryMutation } from "../redux/api/categoryApi";
// import { useAddCategoryMutation } from "../redux/api/productManageApi";
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
const AddManagePromo = ({ openAddModal, setOpenAddModal }) => {
  const [form] = Form.useForm();

  // const [addcategory] = useAddCategoryMutation();
  const [loading, setLoading] = useState(false);


  const handleCancel = () => {
    form.resetFields();

    setOpenAddModal(false);
  };

  const handleSubmit = async (values) => {
    console.log("Submitted values:", values);
    // setLoading(true);

    // try {
    //   const formData = new FormData();

    //   fileList.forEach((file) => {
    //     formData.append("image", file.originFileObj);
    //   });
    //   formData.append("name", values.name);

    //   const res = await addcategory(formData);
    //   console.log(res);
    //   message.success(res.data.message);
    //   setLoading(false);
    //   setOpenAddModal(false);
    // } catch (error) {
    //   setLoading(false);
    //   console.error(error);
    //   message.error(message?.data?.error);
    //   setOpenAddModal(false);
    // } finally {
    //   setLoading(false);
    //   setOpenAddModal(false);
    // }
  };

  return (
    <Modal
      centered
      open={openAddModal}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <div className=" ">
        <div>
          <div className="font-semibold text-3xl text-center mb-5">Add Category</div>
          <p className="text-neutral-700 text-center mb-7">Fill Out details below to add a new session category. Make sure the name clearly represents the type of session.</p>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="px-2"
          >
            <Form.Item
              label="Session Category Name"
              name="name"
              rules={[{ required: true, message: "Please input name!" }]}
            >
              <Input
                placeholder="Enter Session category name"
                style={{ height:"40px" }}
              />
            </Form.Item>

       

            {/* Save Button */}
            <Form.Item>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-2 bg-[#0C8A8A] text-white rounded-md"
              >
                {loading ? <Spin size="small" /> : "Add"}
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default AddManagePromo;
