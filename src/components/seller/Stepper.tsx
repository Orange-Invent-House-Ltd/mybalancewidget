import React from 'react';
import * as Progress from '@radix-ui/react-progress';

const Stepper = () => {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(50), 500); // Change the progress to 50%
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='relative w-[30%]'>
    <Progress.Root
      className="relative overflow-hidden bg-slate-200 rounded-full h-[300px] w-[7px] shadow-lg border-none" // Adjusted height and width
      style={{
        transform: 'translateZ(0) rotate(180deg)', // Rotate to make it vertical
      }}
      value={progress}
    >
      <Progress.Indicator
        className="bg-[#FD7E14] h-full w-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]" // Adjusted height and width
        style={{ transform: `translateY(${100 - progress}%)` }} // Adjusted transform
      />
    </Progress.Root>
    <div className='absolute top-[5%] left-[9%]'>
        <div className='flex items-center justify-center w-[25px] h-[25px] border border-[#FD7E14] rounded-full circle'>
             <div className='w-[17px] h-[17px]  bg-[#FD7E14] rounded-full'></div>
        </div>
        <div className='flex items-center justify-center w-[25px] h-[25px] border border-[#FD7E14] rounded-full circle mt-[7.5rem]'>
             <div className='w-[17px] h-[17px]  bg-[#FD7E14] rounded-full'></div>
        </div>
    </div>
    </div>
  );
}; 

export default Stepper;
