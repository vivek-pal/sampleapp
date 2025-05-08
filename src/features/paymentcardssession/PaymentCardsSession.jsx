import React, { useEffect, useState } from 'react';
import paymentCards from '../assets/data/json/paymentCards.json'; // Import the JSON file

export const PaymentCardsSession = () => {
  const [formattedCardDetails, setFormattedCardDetails] = useState("");

  useEffect(() => {
    // Format the card details into the required string format
    const formattedDetails = Object.entries(paymentCards)
      .map(([value, label]) => `~${value}:${label}::`)
      .join(' '); // Add a space between each formatted entry

    setFormattedCardDetails(formattedDetails);
  }, []);

  return (
    <div 
        id="PaymentCard" 
        data-paymentcarddetails={formattedCardDetails}
      >
        {/* Payment Card Details */}
      </div>
  );
};
