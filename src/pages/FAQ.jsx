import React, { useState, useEffect } from "react";
import { message, Modal } from "antd";
import { FaRegQuestionCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { HelpCircle } from "lucide-react";

import {
  useAddFaqMutation,
  useDeleteFaqMutation,
  useGetFaqQuery,
  useUpdateFaqMutation,
} from "../redux/api/metaApi";

const FAQ = () => {
const [addLoading, setAddLoading] = useState(false);
const [updateLoading, setUpdateLoading] = useState(false);

  const { data: getFaq, isLoading } = useGetFaqQuery();
  const [addFaq] = useAddFaqMutation();
  const [updateFaq] = useUpdateFaqMutation();
  const [deleteFaq] = useDeleteFaqMutation();

  const [isAccordionOpen, setIsAccordionOpen] = useState(null);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedFaq, setSelectedFaq] = useState(null);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleClick = (index) => {
    setIsAccordionOpen((prevIndex) => (prevIndex === index ? null : index));
  };

  /* -----------------------
     ADD FAQ
  -------------------------*/
const handleAddFaq = async () => {
  if (!question || !answer)
    return message.warning("Please fill all fields");

  try {
    setAddLoading(true);
    await addFaq({ question, answer }).unwrap();
    message.success("FAQ added successfully!");
    setAddModalOpen(false);
    setQuestion("");
    setAnswer("");
  } catch (error) {
    message.error(error?.data?.message || "Failed to add FAQ");
  } finally {
    setAddLoading(false);
  }
};


  /* -----------------------
     UPDATE FAQ
  -------------------------*/
const handleUpdateFaq = async () => {
  if (!question || !answer)
    return message.warning("Please fill all fields");

  try {
    setUpdateLoading(true);
    await updateFaq({
      id: selectedFaq._id,
      data: { question, answer },
    }).unwrap();

    message.success("FAQ updated!");
    setUpdateModalOpen(false);
    setSelectedFaq(null);
  } catch (error) {
    message.error(error?.data?.message || "Update failed");
  } finally {
    setUpdateLoading(false);
  }
};


  /* -----------------------
     DELETE FAQ
  -------------------------*/
  const handleDeleteFaq = async () => {
    try {
      await deleteFaq(selectedFaq._id).unwrap();
      message.success("FAQ deleted!");
      setDeleteModalOpen(false);
      setSelectedFaq(null);
    } catch (error) {
      message.error(error?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="relative bg-white p-3 h-[87vh]">

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <HelpCircle className="w-5 h-5 text-gray-600" />
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            FAQ
          </h1>
        </div>

        <button
          onClick={() => setAddModalOpen(true)}
          className="bg-[#004F44] text-white font-semibold px-5 py-2 rounded"
        >
          + Add FAQ
        </button>
      </div>

      {/* FAQ List */}
      <div className="flex gap-2 flex-col w-full mt-5 p-5">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          getFaq?.data?.map((faq, index) => (
            <section
              key={faq._id}
              className="border-b border-[#e5eaf2] rounded py-3"
            >
              <div
                className="flex gap-2 cursor-pointer items-center justify-between w-full"
                onClick={() => handleClick(index)}
              >
                <h2 className="text-base font-normal md:font-bold md:text-2xl flex gap-2 items-center">
                  <FaRegQuestionCircle className="w-5 h-5 hidden md:flex" />
                  {faq.question}
                </h2>

                <div className="flex gap-2 md:gap-4 items-center">

                  {/* Update */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFaq(faq);
                      setQuestion(faq.question);
                      setAnswer(faq.answer);
                      setUpdateModalOpen(true);
                    }}
                    className="border px-2 py-1 rounded border-[#004F44] bg-[#f0fcf4]"
                  >
                    <CiEdit className="text-2xl text-[#004F44]" />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFaq(faq);
                      setDeleteModalOpen(true);
                    }}
                    className="border px-2 py-1 rounded border-[#004F44] bg-[#f0fcf4]"
                  >
                    <RiDeleteBin6Line className="text-2xl text-red-500" />
                  </button>
                </div>
              </div>

              <div
                className={`grid transition-all duration-300 overflow-hidden ease-in-out ${
                  isAccordionOpen === index
                    ? "grid-rows-[1fr] opacity-100 mt-4"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <p className="text-[#424242] text-[0.9rem] overflow-hidden">
                  {faq.answer}
                </p>
              </div>
            </section>
          ))
        )}
      </div>

      {/* ADD MODAL */}
      <Modal open={addModalOpen} centered onCancel={() => setAddModalOpen(false)} footer={null}>
        <div className="p-5">
          <h2 className="text-2xl font-bold text-center mb-2">Add FAQ</h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="FAQ Question"
              className="w-full p-2 border rounded"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />

            <textarea
              rows={4}
              placeholder="FAQ Answer"
              className="w-full p-2 border rounded"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <button className="py-2 px-4 border rounded" onClick={() => setAddModalOpen(false)}>
              Cancel
            </button>
           <button
  className="py-2 px-4 rounded bg-[#004F44] text-white flex justify-center items-center"
  onClick={handleAddFaq}
  disabled={addLoading}
>
  {addLoading ? "Saving..." : "Save"}
</button>

          </div>
        </div>
      </Modal>

      {/* UPDATE MODAL */}
      <Modal open={updateModalOpen} centered onCancel={() => setUpdateModalOpen(false)} footer={null}>
        <div className="p-5">
          <h2 className="text-2xl font-bold text-center mb-2">Update FAQ</h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="FAQ Question"
              className="w-full p-2 border rounded"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />

            <textarea
              rows={4}
              placeholder="FAQ Answer"
              className="w-full p-2 border rounded"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <button className="py-2 px-4 border rounded" onClick={() => setUpdateModalOpen(false)}>
              Cancel
            </button>
            <button
  className="py-2 px-4 rounded bg-[#004F44] text-white flex justify-center items-center"
  onClick={handleUpdateFaq}
  disabled={updateLoading}
>
  {updateLoading ? "Updating..." : "Save"}
</button>

          </div>
        </div>
      </Modal>

      {/* DELETE MODAL */}
      <Modal open={deleteModalOpen} centered onCancel={() => setDeleteModalOpen(false)} footer={null}>
        <div className="p-5 text-center">
          <h2 className="text-2xl font-bold mb-4">Are you sure you want to delete this FAQ?</h2>

          <div className="grid grid-cols-2 gap-4">
            <button className="py-2 px-4 border rounded" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </button>

            <button className="py-2 px-4 bg-[#115E59] cursor-pointer hover:bg-teal-700 text-white rounded" onClick={handleDeleteFaq}>
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FAQ;
