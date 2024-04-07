import React from 'react';
import * as Progress from '@radix-ui/react-progress';
import { Check } from 'lucide-react';


interface StepperProps {
  isSubmitted: boolean;
}

const Stepper: React.FC<StepperProps> = ({ isSubmitted }) => {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(isSubmitted ? 100 : 50), 500); // 
    return () => clearTimeout(timer);
  }, [isSubmitted]);

 
  return (
    <div className='relative w-[30%]'>
      <Progress.Root
        className="relative overflow-hidden bg-slate-200 rounded-full h-[300px] w-[7px] shadow-lg border-none"
        style={{
          transform: 'translateZ(0) rotate(180deg)',
        }}
        value={progress}
      >
        <Progress.Indicator
          className="bg-[#FD7E14] h-full w-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
          style={{ transform: `translateY(${100 - progress}%)` }}
        />
      </Progress.Root>
      <div className='absolute top-[5%] left-[9%]'>
        <div className='flex items-center justify-center w-[25px] h-[25px] border border-[#FD7E14] rounded-full circle'>
        <div className={`w-[17px] h-[17px] bg-[#FD7E14]  ${progress === 50 && !isSubmitted ? 'block' : 'hidden'} rounded-full`}></div>
        <Check size={20}  className={`text-[#FD7E14]  ${progress === 50 && !isSubmitted ? 'hidden' : 'block'}  `}/>
        </div>
        <div className='flex items-center justify-center w-[25px] h-[25px] border border-[#FD7E14] rounded-full circle mt-[7.5rem]'>
        <Check size={20} className={`text-[#FD7E14] ${progress === 100 && !isSubmitted ? 'block' : 'hidden'}`} />
          <div className={`w-[17px] h-[17px] bg-[#FD7E14] ${progress === 100 && !isSubmitted ? 'hidden' : 'block'} rounded-full`}></div>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
{/* <form onSubmit={onSubmit}>
Verification

</form> */}