import React from "react";
import errorIcon from "../../assets/img/error-icon-large.png";

const PreErrorMessage = (isVisible) => {
    if(!isVisible?.isVisible) return null;
  return (
    <div className="bg-[#F2F2F2] my-[3.6rem] relative">
      <div className="border-b-0 text-right p-[1.2rem] px-[2.4rem]">
        <span
          className="absolute top-[27%] right-[41rem] md:right-[41rem] lg:right-[41rem] xl:right-[41rem] 
          h-[2.7rem] w-[2.7rem] bg-no-repeat bg-[length:2.7rem_auto]"
          style={{
            backgroundImage: `url(${errorIcon})`,
            content: '""', // Not valid in inline styles but kept for reference
          }}
        ></span>
        <p>Please ensure you have properly completed all fields</p>
      </div>
    </div>
  );
};

export default PreErrorMessage;
