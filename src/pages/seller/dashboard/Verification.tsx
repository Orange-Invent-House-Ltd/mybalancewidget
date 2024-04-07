import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Stepper from '../../../components/seller/Stepper';

function Verification() {
  const location = useLocation();
  const navigate = useNavigate();
  const inputRefs = useRef<HTMLInputElement[]>(Array(6).fill(null));

  const [otp, setOTP] = useState<string[]>(['', '', '', '', '', '']); // Initialize OTP state with empty strings
  const [filledCount, setFilledCount] = useState(0); // Track the count of filled OTP boxes

  // Function to handle changes in OTP input fields
  const handleChange = (index: number, value: string) => {
    if (isNaN(parseInt(value)) || value.length > 1) return; // Ensure only one digit is entered

    // Update the OTP state with the new value at the specified index
    setOTP(prevOTP => {
      const newOTP = [...prevOTP];
      newOTP[index] = value;
      return newOTP;
    });

    // Update the filled count
    if (value !== '' && otp[index] === '') {
      setFilledCount(prevCount => prevCount + 1);
    } else if (value === '' && otp[index] !== '') {
      setFilledCount(prevCount => prevCount - 1);
    }

    // Move focus to the next input field if available
    if (value !== '' && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus(); // No need for type assertion here
    }
  };


  const progressFromWithdraw = location.state?.progress || 0;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const enteredOTP = otp.join('');
      console.log('Entered OTP:', enteredOTP);
      setIsSubmitted(true);
      console.log('Clicked');
      navigate('', { state: { progress: 100 } });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        const currentIndex = inputRefs.current.findIndex(ref => document.activeElement === ref);
        if (currentIndex > 0 && otp[currentIndex] === '') {
          inputRefs.current[currentIndex - 1].focus();
        }
        setOTP(prevOTP => {
          const newOTP = [...prevOTP];
          newOTP[currentIndex] = '';
          return newOTP;
        });
      } else if (e.key === 'ArrowLeft' && filledCount > 0) {
        const currentIndex = inputRefs.current.findIndex(ref => document.activeElement === ref);
        if (currentIndex > 0 && otp[currentIndex - 1] !== '') {
          inputRefs.current[currentIndex - 1].focus();
        }
      } else if (e.key === 'ArrowRight' && filledCount < 6) {
        const currentIndex = inputRefs.current.findIndex(ref => document.activeElement === ref);
        if (currentIndex < 5 && otp[currentIndex + 1] !== '') {
          inputRefs.current[currentIndex + 1].focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [otp, filledCount]);
  

  return (
    <div className="md:w-[80%] w-full ml-auto px-[5%] pt-[30px]">
      <ArrowLeft
        size={40}
        className="border rounded-[4px] p-2 mb-4 text-[#FD7E14] bg-[#FFF2E8] cursor-pointer"
        onClick={() => navigate(-1)}
     
      />
      <h2 className="font-semibold text-[#303030] text-[23px]">Withdraw Funds</h2>
      <p className="mb-6">Make your withdrawals seamlessly</p>
      <div className="flex mt-[5rem] md:px-[3rem] px-[.5rem]">
        <Stepper isSubmitted={progressFromWithdraw === 100 || isSubmitted} />

        <div className='w-[60%]'>
        <div>
          <p className='text-gray-700 text-[27px] font-bold mb-2'>Verify OTP</p>
          <p className='text-gray-500 text-[19px] mb-6'>Enter the 6-digits OTP that was sent to your email address your provided.</p>
        </div>
        
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <div className="flex">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el as HTMLInputElement)}
                    id={`otp-input-${index}`}
                    type="text"
                    value={otp[index]}
                    onChange={(e) => handleChange(index, e.target.value)}
                    className=" w-[60px] h-[70px] border-4 mr-2 py-2 px-3
                      focus:outline-none focus:shadow-outline rounded-lg text-[45px] text-gray-600"
                    maxLength={1}
                    placeholder='3'
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
            <button
  type='submit'
  className='p-3 w-full rounded-lg outline-none text-white font-semibold bg-[#FD7E14] my-6'
>
  Withdraw Now
</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Verification;
