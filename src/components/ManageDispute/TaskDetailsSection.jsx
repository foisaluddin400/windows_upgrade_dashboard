import React from "react";

const TaskDetailsSection = ({singleData}) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-semibold">Details</p>
      <p>{singleData?.task?.description}</p>
    </div>
  );
};

export default TaskDetailsSection;