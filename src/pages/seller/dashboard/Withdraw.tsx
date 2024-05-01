
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Stepper from '../../../components/seller/Stepper';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const schema = z.object({
  bankName: z.string().min(3, 'Field cannot be empty'),
  AccountNumber: z.string().min(10, "Account number must be (10)"),
  AccountName: z.string().min(3, 'Field cannot be empty'),
  Amount: z.string().min(5, 'Field cannot be empty'),
});

type FormFields = z.infer<typeof schema>;

function Withdraw() {
  const navigate = useNavigate(); 
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormFields>(
    {
      defaultValues: {
        bankName: "Kuda MFB",
        AccountNumber: '1234567890',
        AccountName: "BETA JESU VENTURES",
      },
      resolver: zodResolver(schema)
    }
  );

  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmitWrapper = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    handleSubmit(onSubmit)(e); 
  };
  
  const onSubmit = async (data: FormFields) => {
    try {
      setIsSubmitted(true);
      // Simulating server delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // throw new Error()
      navigate('/seller/otp', { state: { progress: 100 } }); 

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full px-[5%] pt-[30px]">
    <ArrowLeft size={40} className="border rounded-[4px] p-2 mb-4 text-[#FD7E14] bg-[#FFF2E8] cursor-pointer " onClick={() => navigate('/seller/dashboard')} />
     <h2 className="font-semibold text-[#303030] text-[23px] ">Withdraw Funds</h2>
     <p className="mb-6">Make your withdrawals seamlessly</p>
    <div className="flex mt-[5rem] md:px-[4rem] px-[.5rem]">
      <Stepper  isSubmitted={isSubmitted}  />

      <div className='w-[60%]'>
        <div>
          <p className='text-gray-700 text-[27px] font-bold mb-2'>Withdraw to Bank</p>
          <p className='text-gray-500 text-[15px] font-semibold mb-2'>Available balance is ₦550,500.90</p>
          <p className='text-gray-500 text-[15px] mb-6'>Use the form below to withdraw funds to your personal account.</p>
        </div>

        <form onSubmit={onSubmitWrapper}>

          <div className='w-full mt-5'>
            <label htmlFor="" className='block text-gray-600 text-[17px] mb-2'>Bank name</label>
            <input {...register("bankName")} type="text" id="" placeholder='Bank Name'
              className='border-gray-400 border-2 p-3 w-full rounded-lg outline-none text-gray-600 font-semibold'
            />
            {errors.bankName && <p className='text-red-500 text-[15px] font-semibold mt-2 mb-[-8px]'>{errors.bankName.message}</p>}
          </div>

          <div className='w-full mt-5'>
            <label htmlFor="" className='block text-gray-600 text-[17px] mb-2'>Account number</label>
            <input {...register("AccountNumber")} type="text" id="" placeholder='Account number'
              className='border-gray-400 border-2 p-3 w-full rounded-lg outline-none text-gray-600 font-semibold'
            />
            {errors.AccountNumber && <p className='text-red-500 text-[15px] font-semibold mt-2 mb-[-8px]'>{errors.AccountNumber.message}</p>}

          </div>

          <div className='w-full mt-5'>
            <label htmlFor="" className='block text-gray-600 text-[17px] mb-2'>Account name</label>
            <input {...register("AccountName")} type="text" id="" placeholder='Account name'
              className='border-gray-400 border-2 p-3 w-full rounded-lg outline-none text-gray-600 font-semibold'
            />
            {errors.AccountName && <p className='text-red-500 text-[15px] font-semibold mt-2 mb-[-8px]'>{errors.AccountName.message}</p>}

          </div>

          <div className='w-full mt-5'>
            <label htmlFor="" className='block text-gray-600 text-[17px] mb-2'>Amount to Withdraw <span className='font-bold'>(₦)</span></label>
            <input {...register("Amount")} type="text" id="" placeholder='e.g 40,000'
              className='border-gray-400 border-2 p-3 w-full rounded-lg outline-none'
            />
            {errors.Amount && <p className='text-red-500 text-[15px] font-semibold mt-2 mb-[-8px]'>{errors.Amount.message}</p>}

          </div>

          <button disabled={isSubmitting}
            type='submit'
            className='p-3 w-full rounded-lg outline-none text-white font-semibold bg-[#FD7E14] my-6'
          >
            {isSubmitting ? 'loading...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Withdraw;
