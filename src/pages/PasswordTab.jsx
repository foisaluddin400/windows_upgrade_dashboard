import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useChangePasswordMutation } from "../redux/api/userApi";
import { logout } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const PasswordTab = () => {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useDispatch();
  const [passError, setPassError] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = async (values) => {
    if (values?.newPassword === values.oldPassword) {
      return setPassError("Your old password cannot be your new password.");
    }
    if (values?.newPassword !== values?.confirmPassword) {
      return setPassError("Confirm password doesn't match.");
    } else {
      setPassError("");
    }

    const data = {
      oldPassword: values.currentPassword,
      newPassword: values.newPassword,
      confirmNewPassword: values.confirmPassword,
    };
    try {
      const response = await changePassword(data).unwrap();
      toast.success(response.message);
      console.log(response);
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    }
  };

  return (
    <div>
      <Form layout="vertical" onFinish={handlePasswordChange}>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Change Your Password
        </h2>

        <Form.Item
          name="currentPassword"
          label="Old Password"
          rules={[
            { required: true, message: "Please enter your current password!" },
          ]}
        >
          <Input.Password
            style={{ padding: "9px", borderRadius: "0px" }}
            placeholder="Old Password"
          />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[{ required: true, message: "Please enter a new password!" }]}
        >
          <Input.Password
            style={{ padding: "9px", borderRadius: "0px" }}
            placeholder="New Password"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm New Password"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Please confirm your new password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password
            style={{ padding: "9px", borderRadius: "0px" }}
            placeholder="Confirm Password"
          />
        </Form.Item>

        {/* Display error if password validations fail */}
        {passError && <p className="text-red-500 text-sm mb-2">{passError}</p>}

        <Form.Item>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-[#115E59] text-white py-2"
            >
              Change Password
            </button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
