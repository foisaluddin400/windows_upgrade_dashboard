import { useState, useEffect } from "react";
import { Avatar, Upload, Form, Input, Button, message, Spin } from "antd";
import { IoCameraOutline } from "react-icons/io5";
import { PasswordTab } from "./PasswordTab";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../redux/api/userApi";
import { toast } from "react-toastify";
import { Navigate } from "../Navigate";

const ProfileSetting = () => {
  const [loading, setLoading] = useState(false);
  const { data: adminProfile } = useGetProfileQuery();
  console.log(adminProfile);

  const [activeTab, setActiveTab] = useState("1");
  const [updateProfile] = useUpdateProfileMutation();
  const [form] = Form.useForm();
  const [image, setImage] = useState();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  useEffect(() => {
    if (adminProfile?.data) {
      const admin = adminProfile.data;
      form.setFieldsValue({
        name: `${admin.name} `,
        email: admin.email,
        phone: admin.phone || "",
        // address: admin.address || "",
      });
    }
  }, [adminProfile, form]);

  const onEditProfile = async (values) => {
    const data = new FormData();
    if (image) data.append("profile_image", image);
    data.append("name", values.name);
     setLoading(true);
    try {
      const response = await updateProfile(data).unwrap();
      console.log(response);
      toast.success(response.message);
      setLoading(false);
    } catch (error) {
      toast.error(error.data.message);
 setLoading(false);
      console.log(error);
    }
  };

  const tabItems = [
    {
      key: "1",
      label: "Edit Profile",
      content: (
        <Form onFinish={onEditProfile} layout="vertical" form={form}>
          <Form.Item name="name" label="Name">
            <Input
              style={{ padding: "9px", borderRadius: "0px" }}
              placeholder="Enter name"
              rules={[{ required: true, message: "Please write a Email" }]}
            />
          </Form.Item>

          <Form.Item name="email" label="Email">
            <Input
              disabled
              style={{ padding: "9px", borderRadius: "0px" }}
              placeholder="Enter Email"
              rules={[{ required: true, message: "Please write a Email" }]}
            />
          </Form.Item>

        
    <button
              className={`w-full py-3 rounded text-white flex justify-center items-center gap-2 transition-all duration-300 ${
                loading
                   ? "bg-[#376b68] cursor-not-allowed"
                        : "bg-[#115E59] cursor-pointer hover:bg-teal-700"
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spin size="small" /> <span>Submitting...</span>
                </>
              ) : (
                "Submit"
              )}
            </button>
        </Form>
      ),
    },
    {
      key: "2",
      label: "Change Password",
      content: <PasswordTab />,
    },
  ];

  return (
    <div className="p-3 bg-white">
      <Navigate title="Profile Setting" />
      <div className="">
        <div className="max-w-xl mx-auto mt-8 rounded-lg p-6 ">
          {/* Profile Picture Section */}
          <div className="text-center mb-6">
            <div className="relative w-[140px] h-[124px] mx-auto">
              <input
                type="file"
                onChange={handleImageChange}
                id="img"
                style={{ display: "none" }}
              />
              <img
                className="w-[140px] h-[140px] rounded-full object-cover"
                src={`${image ? URL.createObjectURL(image) : `${adminProfile?.data?.profile_image}`}`}
                alt="Admin Profile"
              />
              {activeTab === "1" && (
                <label
                  htmlFor="img"
                  className="absolute top-[80px] -right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
                >
                  <IoCameraOutline className="text-black " />
                </label>
              )}
            </div>

            <p className="text-lg font-semibold mt-4">{adminProfile?.data?.name}</p>
          </div>

          {/* Custom Tabs Section */}
          <div className="mb-4">
            <div className="flex space-x-6 justify-center mb-4">
              {tabItems.map((item) => (
                <button
                  key={item.key}
                  className={`py-2 font-medium ${
                    activeTab === item.key
                      ? "border-b border-black text-black"
                      : "text-black hover:text-[#02111E]"
                  }`}
                  onClick={() => setActiveTab(item.key)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div>
              {tabItems.find((item) => item.key === activeTab)?.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;