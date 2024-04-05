import React from 'react';
import Stepper from '../../../components/seller/Stepper';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  bankName: z.string().min(3, 'Field cannot be empty'),
  AccountNumber: z.string().min(10,"Account number must be (10)"),
  AccountName: z.string().min(3, 'Field cannot be empty'),
  Amount: z.string().min(5, 'Field cannot be empty'),
});

type FormFields = z.infer<typeof schema>;

function Withdraw() {
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

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      // Simulating server delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error();
      console.log(data);
    } catch (error) {
    //   setError('bankName', {
    //     message: 'Invalid Bank Name'
    //   });
    }
  };

  return (
    <div className="flex mt-[5rem] md:px-[4rem] px-[.5rem]">
      <Stepper />

      <div className='w-[60%]'>
        <div>
          <p className='text-gray-700 text-[27px] font-bold mb-2'>Withdraw to Bank</p>
          <p className='text-gray-500 text-[15px] font-semibold mb-2'>Available balance is ₦550,500.90</p>
          <p className='text-gray-500 text-[15px] mb-6'>Use the form below to withdraw funds to your personal account.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>

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
  );
}

export default Withdraw;
