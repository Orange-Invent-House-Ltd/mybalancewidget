import React, { useEffect } from "react";
import * as Progress from "@radix-ui/react-progress";
import { Check } from "lucide-react";

interface StepperProps {
  isSubmitted: boolean;
  filledCount?: number;
}

const Stepper: React.FC<StepperProps> = ({ isSubmitted, filledCount }) => {
  const [progress, setProgress] = React.useState(13);
  const [innerCircleVisible, setInnerCircleVisible] = React.useState(true);
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(isSubmitted ? 100 : 50);
    }, 500);
    return () => clearTimeout(timer);
  }, [isSubmitted]);

  useEffect(() => {
    setInnerCircleVisible(filledCount !== 6);
  }, [filledCount]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Adjust breakpoint as needed
    };
    handleResize(); // Call once to set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    // <div className="relative w-[30%] rotate-[-90deg] md:rotate-0 left-[30%] mt-[-12rem] mb-[-4rem] md:mb-0 md:mt-0 md:left-0 ">
    <div className="relative w-[30%]  left-[50%] md:mb-0 md:mt-0 md:left-0 ">
      <Progress.Root
        className={`relative overflow-hidden bg-slate-200 rounded-full ${
          isSmallScreen ? "h-[500px] mb-[-11rem] mt-[-11rem]" : "h-[300px]"
        }  w-[7px] shadow-lg border-none`}
        style={{
          transform: isSmallScreen
            ? "rotate(90deg)"
            : "translateZ(0) rotate(180deg)",
        }}
        value={progress}
      >
        <Progress.Indicator
          className="bg-[#FD7E14] h-full w-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
          style={{ transform: `translateY(${100 - progress}%)` }}
        />
      </Progress.Root>
      <div
        className={`absolute ${
          isSmallScreen
            ? "rotate-[-90deg] bottom-[40%] left-[3%]"
            : "top-[5%] left-[9%]"
        }  `}
      >
        <div className="flex items-center justify-center w-[25px] h-[25px] border border-[#FD7E14] rounded-full circle">
          {progress === 50 && !isSubmitted ? (
            <div className="w-[17px] h-[17px] bg-[#FD7E14] rounded-full"></div>
          ) : (
            <Check
              size={20}
              className={`text-[#FD7E14] ${isSmallScreen ? "rotate-90" : ""}`}
            />
          )}
        </div>
        <div className="flex items-center justify-center w-[25px] h-[25px] border border-[#FD7E14] rounded-full circle mt-[7.5rem]">
          {innerCircleVisible ? (
            <div
              className={`w-[17px] h-[17px] bg-[#FD7E14]  rounded-full`}
            ></div>
          ) : (
            <Check
              size={20}
              className={`text-[#FD7E14] ${isSmallScreen ? "rotate-90" : ""}`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
