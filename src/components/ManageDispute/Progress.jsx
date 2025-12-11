// cancellationStatus should be

import CancellationStatusComponent from "./CancellationStatusComponent";
import DateExtensionRequestSection from "./DateExtensionRequestSection";
import PricingSection from "./PricingSection";
import ProgressBarComponent from "./ProgressBarComponent";
import TaskDetailsSection from "./TaskDetailsSection";
import TaskInfoSection from "./TaskInfoSection";

// cancellationStatus = "in-progress"
// cancellationStatus = "accepted"
// cancellationStatus = "rejected"
// cancellationStatus = null

const Progress = ({
  cancellationStatus = "in-progress",
  extensionStatus = "in-progress",
}) => {
  const steps = [
    { id: 1, label: "Offered", date: "Feb 21, 2023", completed: true },
    { id: 2, label: "In Progress", date: "Feb 21, 2023", completed: true },
    { id: 3, label: "Completed on", date: "", completed: false },
  ];

  return (
    <div>
      <div className="flex flex-col gap-12 ">
        {/* Task Info Section */}
       

        {/* Progress Bar */}
        <ProgressBarComponent steps={steps} progressWidth="50%" />

        {/* Cancellation Status Section (conditional) */}
        <div >
          <CancellationStatusComponent
            cancellationStatus={cancellationStatus}
          />
          <DateExtensionRequestSection extensionStatus={extensionStatus} />
        </div>
      
      </div>
      
    </div>
  );
};

export default Progress;
