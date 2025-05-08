/**
 * April 2025 n517513 Lakshmi Narayan - initilizes Semafone iFrame for PCI DSS
 * compliant payment details capture.
 * 
 * 
 * **********************Revision History*********************************
 * @author 
 *
 */
console.log ("Version: pciDssSemafone.js 2.0.0");

//File scope vars
var constructedSemafoneDomainURL = "";
var paymentState = {};
var PCIDSSSessionData = {};
var semafoneiFrameID = "semafoneiFrame";
var schemaHtml;
// import $ from 'jquery';
// var alreadyCardAdded;

/**
 * returnSemafoneFragmentForSavedCard method returns the
 * semafone fragment type for the selected saved card
 * 
 * @param cardSchemeCode - Code of the selected card eg. TP, VIP
 * new cardSchemeCode added for UATP variant for PCI Proxy true as,
 * it has more card variants with differet types(TPC,TDC,TPP,TDP)
 **/
// function returnSemafoneFragmentForSavedCard(cardSchemeCode) {
//     switch (cardSchemeCode) {
//         case "TP": case "TPC": case "TDC": case "TPP": case "TDP": 
//             return 'NONE';
//         default:
//             return 'SemafoneBACOMCVVCaptureFragment.html';
//     }
// };

/**
 * loadIframe method interacts with the dom and initilizes the
 * semafone fragment iFrame. This method also sets up a
 * listner to catch messages sent by Semafone. 
 * 
 * 
 * @param url Semafone iFrame src
 * @param iFrame The if of DOM element iFrame is to be added to
 * @param schemaHtml Semafone Fragment type's markup file name  
 * @param fn A callback function to set the values returned by semafone in hidden inputs
 **/

window.resizeIframe = function(iframe) {
  if (iframe && iframe.contentWindow && iframe.contentDocument?.body) {
    iframe.style.height = iframe.contentDocument.body.scrollHeight + "px";
  }
}

// 👇 Make this function globally accessible
// window.initSemafoneFragmentForCardDetails = initSemafoneFragmentForCardDetails;


function loadIframe(url, iFrame, schemaHtml, fn) {
    var semafoneCR, sessionId, siteUrl, isSubmitted;
    showSpinner();
    if (schemaHtml !== 'NONE') {
            $('#semafone-iframe').show();
            if ($('#' + iFrame).find('iframe.semafone-iframe').length === 0) {
                $('<iframe id="semafone-iframe" class="semafone-iframe" src="' + url +
                    '" width="600" height="350" scrolling="no" onload="resizeIframe(this); hideSpinner();" frameborder="0"></iframe>').appendTo('#' + iFrame);
            } else {
                $('#semafone-iframe').attr('src', url);
            }
            $("#constructedSemafoneDomainURL").val(url);
    } else {
        $('#semafone-iframe').remove();
        hideSpinner();
    }

    window.addEventListener("message", receiveMessage, false);
    function receiveMessage(event) {
        // var bar = JSON.parse(event.data);

        let bar;
        console.log("Received message from Semafone:", event.data);
        if (typeof event.data === 'string') {
        try {
            bar = JSON.parse(event.data);
        } catch (err) {
            console.error('Invalid JSON:', event.data);
        }
        } else {
            bar = event.data;
        }
        if (bar.refresh) {
            loadIframe(bar.refreshUrl, semafoneiFrameID, schemaHtml, semafoneCb)
        }
        if (bar.callReference)
            semafoneCR = decodeURIComponent(bar.callReference);
        if (bar.sessionId)
            sessionId = decodeURIComponent(bar.sessionId);
        if (bar.siteUrl)
            siteUrl = decodeURIComponent(bar.siteUrl);
        if (bar.isSubmitted)
            isSubmitted = decodeURIComponent(bar.isSubmitted);
        fn(semafoneCR, sessionId, siteUrl, isSubmitted);
    };
};

/**
 * hideSpinner method hides the spinner which is used to indicate the
 * loading of the iFrame
 * 
 **/

window.hideSpinner = function () {
  const spinner = document.getElementById("semafone-spinner");
  if (spinner) spinner.style.display = "none";
};

/**
 * showSpinner method shows the spinner which is used to indicate the
 * loading of the iFrame
 * 
 **/
window.showSpinner = function () {
  const spinner = document.getElementById("semafone-spinner");
  if (spinner) spinner.style.display = "inline-block";
};

/**
 * Tranform data from string to object
 * 
 * 
 * @param dataString
 * @param elemList
 **/
function initStringToArrayObjectForSemafone(dataString, elemList) {
    "use strict";
    var returnObj = {};
    if (!dataString || elemList.length === 0) {
        return returnObj;
    }
    var stringArray = dataString.split("#~#");
    var subStringArray = [];

    for (var objIndex = 0; objIndex < stringArray.length; objIndex++) {
        subStringArray = stringArray[objIndex].split("#$#");
        returnObj[subStringArray[0].trim()] = {};
        for (var elemIndex = 0; elemIndex < subStringArray.length; elemIndex++) {
            returnObj[subStringArray[0].trim()][elemList[elemIndex]] = subStringArray[elemIndex].trim();
        }
    }
    return returnObj;
};

/**
 * constructSemafoneURL method returns the semafone iFrame src URL
 * 
 * 
 * @param PciDssDetails Object with semafone details from session data
 * @param captureFragmentType semafone fragment type
 **/
function constructSemafoneURL(PciDssDetails, captureFragmentType) {
    return PciDssDetails.DomainURL + captureFragmentType + '?clientReference=' + PciDssDetails.ClientRef +
        '&tenantId=' + PciDssDetails.TenantId +
        '&clientId=' + PciDssDetails.ClientId +
        '&accountId=' + PciDssDetails.AccountId +
        '&principle=' + PciDssDetails.Principle +
        '&licenseCode=' + PciDssDetails.LicenceCode +
        '&semafoneMode=' + PciDssDetails.SemafoneMode;
};


/**
 * semafoneCb method is passed as callback argument
 * 
 * Semafone message values
 * @param semafoneCR
 * @param sessionId
 * @param siteURL
 * @param isSubmitted
 **/
// function semafoneCb(semafoneCR, sessionId, siteURL, isSubmitted) {
//     paymentState.semafoneMessage = {
//         'semafoneCR': semafoneCR,
//         'sessionId': sessionId,
//         'siteURL': siteURL,
//         'isSubmitted': isSubmitted
//     }
//     $("#SemafoneCRNumber").val(semafoneCR);
//     $("#semafoneSessionID").val(sessionId);
//     $("#SemafoneSiteURL").val(siteURL);
//     $("#SemafoneSubmitSuccess").val(isSubmitted);
// };

let semafoneSetter = null;

export function registerSemafoneSetter(setterFunction) {
  semafoneSetter = setterFunction;
}

export function semafoneCb(semafoneCR, sessionId, siteURL, isSubmitted) {
  if (semafoneSetter) {
    semafoneSetter(semafoneCR, sessionId, siteURL, isSubmitted);
  }

  // Optional: also update internal state or global state if needed
  paymentState.semafoneMessage = {
    semafoneCR,
    sessionId,
    siteURL,
    isSubmitted
  };
}

export function initSemafoneFragmentForCardDetails(selectedValue,IfNewCardRadio=null) {
    const selectedValues = ['TP', 'TPC', 'TDC', 'TPP', 'TDP'];
    // let schemaHtml = '';
    let checkCount = 0;
    const maxChecks = 200; // Stop after ~5 seconds
  
    const interval = setInterval(() => {
      const collectCvvElement = document.getElementById('CollectCvvData');
      const CollectCardDataElement = document.getElementById('CollectCardDataOnly');
      const pageType = document.getElementById('pageType');
      const ShowSavedCard = document.getElementById('ShowSavedCard');
      const collectCvvData = collectCvvElement?.value;
      const CollectCardDataOnly = CollectCardDataElement?.value;
  
      if ((collectCvvData && collectCvvData !== "false") || checkCount >= maxChecks) {
        clearInterval(interval);
        if (selectedValues.includes(selectedValue)) {
          schemaHtml = 'SemafoneBACOMPANCaptureFragment.html';
        // } else if (pageType.value === "PAYMENT" || pageType.value === "CDC" && collectCvvData === "true") {
        } else if (pageType?.value === "PAYMENT" || pageType?.value === "CDC" && collectCvvData === "true" && CollectCardDataOnly!="false") {
          schemaHtml = 'SemafoneBACOMPANCVVCaptureFragment.html';
        } else if (pageType?.value === "CDC" && collectCvvData === "false") {
          schemaHtml = 'SemafoneBACOMPANCaptureFragment.html';
        }
        else if (pageType?.value === "CDC" && CollectCardDataOnly==="false") {
          schemaHtml = 'SemafoneBACOMCVVCaptureFragment.html';
        }
        else {
          schemaHtml = 'SemafoneBACOMPANCVVCaptureFragment.html';
        }
  
        constructedSemafoneDomainURL = constructSemafoneURL(
          PCIDSSSessionData.PCIDSSSessionData,
          schemaHtml
        );
  
        paymentState.PCIDSSSessionData = PCIDSSSessionData.PCIDSSSessionData;
  
        loadIframe(constructedSemafoneDomainURL, semafoneiFrameID, schemaHtml, semafoneCb);
      }
      //condition only for payments page
      //as we don't get cvvdataonly etc flags in response
      //IfNewCardRadio is having data if new card is selected in payment screen
      if(pageType?.value==="PAYMENT"){
        if(IfNewCardRadio==null && selectedValue!=undefined && selectedValue=='TP'){
          // schemaHtml = 'SemafoneBACOMCVVCaptureFragment.html';
          schemaHtml = 'SemafoneBACOMPANCaptureFragment.html';
        }
        else if(IfNewCardRadio){
          schemaHtml = 'SemafoneBACOMPANCVVCaptureFragment.html';
          IfNewCardRadio=false;
        }
        //selected any non uatp card and radio btn for new card not selected
        else if(IfNewCardRadio==null && selectedValue!=undefined){
          // schemaHtml = 'SemafoneBACOMPANCVVCaptureFragment.html';
          // schemaHtml = 'SemafoneBACOMCVVCaptureFragment.html';
          schemaHtml = 'SemafoneBACOMCVVCaptureFragment.html';
        }
        else if(IfNewCardRadio==null && selectedValue==undefined){
          // schemaHtml = 'SemafoneBACOMPANCVVCaptureFragment.html';
          if(ShowSavedCard.value=="true"){
            schemaHtml = 'SemafoneBACOMCVVCaptureFragment.html';
          }
          else{
          schemaHtml = 'SemafoneBACOMPANCVVCaptureFragment.html';
          }
        }
        else{
          // schemaHtml = 'SemafoneBACOMPANCVVCaptureFragment11.html';
          schemaHtml = 'SemafoneBACOMPANCVVCaptureFragment.html';
        }
          constructedSemafoneDomainURL = constructSemafoneURL(
          PCIDSSSessionData.PCIDSSSessionData,
          schemaHtml
        );
        clearInterval(interval);
        paymentState.PCIDSSSessionData = PCIDSSSessionData.PCIDSSSessionData;
  
        loadIframe(constructedSemafoneDomainURL, semafoneiFrameID, schemaHtml, semafoneCb);
      }
      checkCount++;
    }, 5); // Check every 100ms
    constructedSemafoneDomainURL = constructSemafoneURL(PCIDSSSessionData.PCIDSSSessionData, schemaHtml);
    paymentState.PCIDSSSessionData = PCIDSSSessionData.PCIDSSSessionData;
    loadIframe(constructedSemafoneDomainURL, semafoneiFrameID, schemaHtml, semafoneCb);
}

// export function initSemafoneFragmentForCardDetails(selectedValue) {
//     const CollectCvvData = $("#CollectCvvData").val();
//     // const CollectCvvData = CollectCvvDataRaw === "true"; // safely convert to boolean
//     const selectedValues = ['TP', 'TPC', 'TDC', 'TPP', 'TDP'];

//     if (selectedValues.includes(selectedValue)) {
//         schemaHtml = 'SemafoneBACOMPANCaptureFragment.html';
//     } else if (CollectCvvData === "true") {
//         schemaHtml = 'SemafoneBACOMPANCVVCaptureFragment.html';
//     } else {
//         schemaHtml = 'SemafoneBACOMPANCaptureFragment.html'; // fallback if needed
//     }

//     constructedSemafoneDomainURL = constructSemafoneURL(PCIDSSSessionData.PCIDSSSessionData, schemaHtml);
//     paymentState.PCIDSSSessionData = PCIDSSSessionData.PCIDSSSessionData;
//     loadIframe(constructedSemafoneDomainURL, semafoneiFrameID, schemaHtml, semafoneCb);
// }

$(function() {
    PCIDSSSessionData = initStringToArrayObjectForSemafone($("#PCIDSSDATA").attr("data-pcidssdata"), ["position", "AgentLiveCallStatus", "ClientRef",
        "TenantId", "ClientId", "AccountId", "Principle",
        "LicenceCode", "SemafoneMode", "DomainURL", "isPegasus", "PciFragment"
    ]);
    // alreadyCardAdded = ($("#savedCardDetails").find(".card-scheme-name").text()) ? $("#savedCardDetails").find(".card-scheme-name").text() : $("#cardPrePopulated").attr("data-prepopulatecard");
    // savedCardScenario = parseInt(pageConstants.amountOfCards) > 1 && pageConstants.showDefaultCard === "true";
    if (PCIDSSSessionData.PCIDSSSessionData.AgentLiveCallStatus === 'TRUE') {
        // if (document.getElementById('pageName').value === 'PEGASUS_PAYMENT') {
            initSemafoneFragmentForCardDetails();
        // }
        $(function() {
        	$(".spinnerWrapper" ).spin({
        		lines:      14,
        		length:     8,
        		width:      4,
        		radius:     14,
        		rotate:     13,
        		color:      '#3468ad',
        		speed:      1.0,
        		corners:    0.8,
        		trail:      100,
        		shadow:     false,
        		hwaccel:    true,
        		className:  'spinner',
        		zIndex:     2e9,
        		opacity:    0
        	});
        }); 
    }
});