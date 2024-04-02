import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  success?: boolean;
  variant?: "outlined" | "contained" | "black-outlined";
}
export const Button = (props: IButton) => {
  const { children, fullWidth, disabled, success, variant = "contained" } = props;
  return (
    <button
      disabled={disabled}
      {...props}
      className={clsx(
        "rounded-md py-3 px-4 capitalize font-bold cursor-pointer transition-all",
        {
          "w-full": fullWidth === true,
          "bg-primary-normal  text-white hover:bg-primary-dark" :
            variant === "contained",
          "!bg-primary-light hover:bg-primary-light hover:cursor-not-allowed":
            variant === "contained" && disabled,
          "border border-primary-normal text-primary-normal hover:bg-primary-normal/10 ":
            variant === "outlined",
          "border border-slate-300 hover:bg-slate-300/10 ":
            variant === "black-outlined",
          "!border-primary-light !text-primary-light !cursor-not-allowed hover:bg-white ":
            variant === "outlined" && disabled,
          "!bg-[#039855]  text-white hover:!bg-[#04b766] ":
            variant === "contained" && success,
        }
      )}
    >
      {children}
    </button>
  );
};
