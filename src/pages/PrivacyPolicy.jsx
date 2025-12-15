import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import {
  useGetPrivecyQuery,
  usePostPrivecyMutation,
} from "../redux/api/metaApi";
import { message, Spin } from "antd";
import { toast } from "react-toastify";

const PrivacyPolicy = () => {
  const { data: getPrivecyData } = useGetPrivecyQuery();
  const [addPrivecy] = usePostPrivecyMutation();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [isLoading, setLoading] = useState(false);
  const handleTerms = async () => {
    const data = { description: content };

    try {
      setLoading(true);

      const res = await addPrivecy(data).unwrap();
      console.log(res);
      toast.success(res?.message || "Terms updated successfully!");
    } catch (error) {
      console.error("Error updating terms:", error);
      toast.error(
        error?.data?.message || "Failed to update terms. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const config = {
    readonly: false,
    placeholder: "Start typings...",
    style: {
      height: 650,
    },
    buttons: [
      "image",
      "fontsize",
      "bold",
      "italic",
      "underline",
      "|",
      "font",
      "brush",
      "align",
    ],
  };

  useEffect(() => {
    setContent(getPrivecyData?.data?.description);
  }, [getPrivecyData]);
  return (
    <div className="w-full flex flex-col">
      {/* Header */}
      <div className="p-4 flex justify-between bg-gray-100 border-b">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Privacy Policy Editor
        </h1>
         <div className="">
        <button
          onClick={handleTerms}
          disabled={isLoading}
          className="bg-[#115E59] py-2 px-4 rounded text-white"
        >
          {isLoading ? <Spin size="small" /> : "Update"}
        </button>
      </div>
      </div>

      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1}
        onBlur={(newContent) => setContent(newContent)}
        // onChange={newContent => { }}
      />

     
    </div>
  );
};

export default PrivacyPolicy;
