import React from "react";

const EmptyState = ({img, title, text}:{img:any; title:string; text:string}) => {
  return (
    <div className="shadow-md text-[#6D6D6D] rounded-[16px] h-[300px] px-8 max-w-[600px] mx-auto flex flex-col items-center justify-center">
      {img}
      {/* img={<AlertTriangle className="text-red-600 bg-[#FDE3E3] p-1 w-8 h-8 rounded-sm" />} */}
      <p className="text-lg my-2 font-medium">{title}</p>
      <p className="max-w-[416px] text-[#0E1919] text-center">{text}</p>
    </div>
  );
};

export default EmptyState;
