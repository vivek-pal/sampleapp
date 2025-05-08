import React from 'react'

export const Issuenumber = () => {
  return (
    <div id='IssueNumberfieldrow' className='mb-[3rem] relative w-full'>
        <label htmlFor="IssueNumber" id="issueNumberLabel">Issue number<span className="ml-[.4rem] text-[#666666]"> (optional)</span></label>
        <div className='input-icon max-w-[23rem]'>
            <input defaultValue='' maxLength="5" size="4" pattern="\d*" type="text" name="IssueNumber" className="input-primary" id="IssueNumber" tabIndex="130" />
        </div>
    </div>
  )
}
