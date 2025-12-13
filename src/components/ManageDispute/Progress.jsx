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

  return (
    <div>
      <div className="flex flex-col gap-12 ">
        {/* Task Info Section */}
       

        {/* Progress Bar */}
      

        {/* Cancellation Status Section (conditional) */}
        <div >
         
          <DateExtensionRequestSection extensionStatus={extensionStatus} />
        </div>
      
      </div>
      
    </div>
  );
};

export default Progress;
