import React from "react";
import pciDssData from "../../assets/data/json/pciDssSessionData.json"; // Import JSON file

const PCIDSSComponent = () => {
  // Convert JSON data to the required string format
  const formattedData = [
    "PCIDSSSessionData",
    pciDssData.PciDssDetails.AgentLiveCallStatus,
    pciDssData.PciDssDetails.SemafoneDetails.ClientRef,
    pciDssData.PciDssDetails.SemafoneDetails.TenantId,
    pciDssData.PciDssDetails.SemafoneDetails.ClientId,
    pciDssData.PciDssDetails.SemafoneDetails.AccountId,
    pciDssData.PciDssDetails.SemafoneDetails.Principle,
    pciDssData.PciDssDetails.SemafoneDetails.LicenceCode,
    pciDssData.PciDssDetails.SemafoneDetails.SemafoneMode,
    pciDssData.PciDssDetails.SemafoneDetails.DomainURL,pciDssData.PciDssDetails.PegasusCardDetails.CvvData+pciDssData.PciDssDetails.PegasusCardDetails.ExpiryDate, // Convert object to string
  ].join("#$#");

  return (
    <div id="PCIDSSDATA" data-pcidssdata={formattedData}>
      {/* PCI DSS Data Component */}
    </div>
  );
};

export const PCIDSSSessionData = PCIDSSComponent; // Alias Export

export default PCIDSSComponent;
