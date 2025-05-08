import React from "react";
import { useForm } from "react-hook-form";

export const DummyForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (formData) => {
    const finalPayload = {
      urlToken: "b09f4214-f4b2-4ba2-af8d-291c2b85aefa",
      paymentRequest: {
        InterfaceVersion: "V1",
        Audience: "BA_Agent",
        AgentCredentials: {
          OfficeID: formData.officeID,
          AgentID: formData.agentID,
        },
        LanguageCode: "EN",
        RevenueType: "NONREVENUE",
        SaleType: "NonRevenue",
        CountryOfResidence: "GB",
        PointOfSaleCountry: "GB",
        BookingTransactionType: "New",
        CallingApplication: "PEGPAY",
        PegasusCardDetails: {
          CollectCardDataOnly: "true",
          CollectExpiryDate: "true",
          CollectCvvData: "true",
          BookingReference: formData.bookingReference,
        },
      },
      pageSubmissionData: {
        crReference: Number(formData.crReference),
        domainURL: formData.domainURL,
        ExpiryDate: formData.expiryDate,
        BookingReference: formData.bookingReference,
      },
      pageType: "CDC",
      userId: formData.userId,
    };

    console.log("Final Payload:", finalPayload);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto bg-white p-6 shadow-md rounded-lg space-y-5"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Payment Form</h2>

      <div>
        <label className="block text-sm font-medium text-gray-600">Office ID</label>
        <input
          {...register("officeID")}
          className="mt-1 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600">Agent ID</label>
        <input
          {...register("agentID")}
          className="mt-1 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600">Booking Reference</label>
        <input
          {...register("bookingReference")}
          className="mt-1 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600">CR Reference</label>
        <input
          type="number"
          {...register("crReference")}
          className="mt-1 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600">Domain URL</label>
        <input
          type="url"
          {...register("domainURL")}
          className="mt-1 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600">Expiry Date</label>
        <input
          placeholder="MM/YY"
          {...register("expiryDate")}
          className="mt-1 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600">User ID</label>
        <input
          {...register("userId")}
          className="mt-1 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
      >
        Submit
      </button>
    </form>
  );
}
