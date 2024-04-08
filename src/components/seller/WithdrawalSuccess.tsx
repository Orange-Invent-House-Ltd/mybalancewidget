import confetti from '../../assets/icon/confetti.svg'
function WithdrawalSuccess() {
  return (
    <div className="absolute top-[58%] left-[0] z-20 w-[45%] h-auto shadow-lg bg-white p-[30px] rounded-xl transition-all">
      <div className='flex flex-col justify-center items-center'>
        <div className='mb-6'>
    <img src={confetti} alt="" />
        </div>

  <p className='text-[30px] mb-6'>[Amount] Withdrawn!</p>
  <p className='text-[20px] text-gray-500 text-center'>Well done! You have successfully withdrawn [amount]. You should receive a credit alert in the next minute.</p>

      </div>
    </div>
  )
}

export default WithdrawalSuccess