import React from "react";

const PageNotFound = () => {
  return (
    <div className='payment-content w-full max-w-[120rem] mt-[0] mb-[0] ml-auto mr-auto'>
    <div className='columns-7xl pl-[1.5rem] pr-[1.5rem] relative'>
        <div hidden="hidden" className="min-h-[100vh] m-0 p-0" id="mfErrors">&nbsp;</div>
        <form action="#" className='form' method="post" id="cardDetailsForm" name="payment">
            <h2>Page Not found</h2>
            <h1 className="text-[2rem]">We are sorry we couldn't find the page you were looking for.</h1>
        </form>
    </div>
</div>
  );
};

export default PageNotFound;
