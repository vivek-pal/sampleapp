import React from 'react'

export const ValidationErrorMessage = ({errorMessage}) => {
  return (
    <p className="mb-1 font-mylius-modern text-xs font-light text-red-500"
        data-testid="cvv--inputtext--error"
        id="cvv--inputtext--error">
        {errorMessage}
    </p>
  )
}