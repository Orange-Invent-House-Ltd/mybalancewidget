// import clsx from "clsx";
// import { InputHTMLAttributes } from "react";
// import { UseControllerProps, useController } from "react-hook-form";

// interface ITextField extends InputHTMLAttributes<HTMLInputElement> {
//   label: string;
//   disabled?: boolean;
//   variant?: "long" | "short";
// }
// const TextField = ({
//   label,
//   variant,
//   ...props
// }: UseControllerProps<any> & ITextField) => {
//   const { field, fieldState } = useController(props);

//   return (
//     <div className="w-full">
//       <p
//         className={clsx("text-sm mb-[6px] capitalize", {
//           "text-[#DA1E28]": fieldState.invalid,
//         })}
//       >
//         {label}
//       </p>

//       <input
//         {...field}
//         {...props}
//         className={clsx(
//           "border border-[#B7B7B7] w-full rounded-md p-2 outline-none focus:border-[#747373] disabled:opacity-75 disabled:hover:cursor-not-allowed",
//           {
//             "w-[165px]": variant === "short",
//             "border-[#DA1E28] focus:border-[#DA1E28]": fieldState.invalid,
//           }
//         )}
//       />

//       <p
//         className={clsx("text-sm mt-[6px]", {
//           "text-[#DA1E28]": fieldState.invalid,
//         })}
//       >
//         {fieldState.error?.message}
//       </p>
//     </div>
//   );
// };

// export default TextField;

// <form
//   onSubmit={handleSubmitWithdraw((data) => {
//     delete data.accountName;
//     delete data.accountNumber;
//     withdrawMutate({
//       ...data,
//       accountNumber: accNum,
//       bankCode: code,
//     });
//   })}
//   className="relative"
// >
//   {/* {withdrawLoading && <LoadingOverlay />} */}

//   <div className="w-full mb-5 ">
//     <label htmlFor={"selectBank"} className="block">
//       Select bank
//     </label>
//     <select
//       value={code}
//       onChange={(e) => {
//         setCode(e.target.value);
//       }}
//       className="block border border-[#B7B7B7] w-full rounded-md p-2 outline-none focus:border-[#747373] "
//     >
//       {banks?.data?.map((bank: any) => (
//         <option key={bank.slug} value={bank.code}>
//           {bank.name}
//         </option>
//       ))}
//       {bankIsLoading && <option value="">loading...</option>}
//     </select>
//   </div>
//   <TextField
//     control={controlWithdraw}
//     label="Enter account number"
//     placeholder="e.g 4758593837"
//     name={"accountNumber"}
//     value={accNum}
//     onChange={(e) => {
//       setAccNum(e.target.value);
//     }}
//   />
//   <div className="mb-5 mt-5">
//     {/* {LookupIsLoading && <LoadingOverlay />} */}
//     <TextField
//       readOnly={true}
//       control={controlWithdraw}
//       name={"accountName"}
//       label="Account Name"
//       value={LookupData?.data.accountName}
//       placeholder="e.g JMusty Feet"
//     />
//   </div>
//   <div className=" w-full ">
//     <div>
//       <TextField
//         control={controlWithdraw}
//         rules={{ required: "this field is required" }}
//         label="Amount (₦)"
//         placeholder="e.g 20000"
//         name={"amount"}
//         type="number"
//       />
//     </div>
//     <div className="mt-6 mb-16 w-full bg-[#FD7E14] p-3 rounded-xl text-center text-white font-semibold ">
//       <button type="submit">Withdraw amount</button>
//     </div>
//   </div>
// </form>;
