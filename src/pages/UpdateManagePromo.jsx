import { Form, Input, message, Modal, Spin, Upload } from "antd";
import React, { useEffect, useState } from "react";
// import { useUpdateCategoryMutation } from "../redux/api/categoryApi";
import { imageUrl } from "../redux/api/baseApi";

const UpdateManagePromo = ({ editModal, setEditModal, selectedCategory }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [updateCategory] = useUpdateCategoryMutation();

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };


  useEffect(() => {
    if (editModal && selectedCategory) {
      form.setFieldsValue({
        name: selectedCategory?.name,
      });

      setFileList([
        {
          uid: "-1",
          name: "category-image.png",
          status: "done",
          url: `${imageUrl}${selectedCategory?.imageUrl}`,
        },
      ]);
    }
  }, [editModal, selectedCategory, form]);

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

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setEditModal(false);
  };

  const handleSubmit = async (values) => {
    // setLoading(true);
    // try {
    //   const formData = new FormData();
    //   if (fileList.length && fileList[0].originFileObj) {
    //     formData.append("image", fileList[0].originFileObj);
    //   }
    //   formData.append("name", values.name);

    //   const res = await updateCategory({ formData, id: selectedCategory?._id });
    //   message.success(res?.data?.message || "Updated successfully");
    //   setEditModal(false);
    // } catch (error) {
    //   console.error(error);
    //   message.error(error?.data?.message || "Update failed");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <Modal
      centered
      open={editModal}
      onCancel={handleCancel}
      footer={null}
      width={600}
      destroyOnClose // ✅ clears content when modal closes
    >
    <div className=" ">
            <div>
              <div className="font-semibold text-3xl text-center mb-5">Update Category</div>
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
                    {loading ? <Spin size="small" /> : "Save Changes"}
                  </button>
                </Form.Item>
              </Form>
            </div>
          </div>
    </Modal>
  );
};

export default UpdateManagePromo;
