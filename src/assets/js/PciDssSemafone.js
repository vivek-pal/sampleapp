/**
 * June 2019 n465686 Shikhar Shrivastava - initilizes Semafone iFrame for PCI DSS
 * compliant payment details capture.
 * 
 * 
 * **********************Revision History*********************************
 * @author 
 *
 */
console.log ("Version: pciDssSemafone.js 2.0.0");
// import $ from "jquery"; 
// import "./jquery.spin-1.3.2.min";  // This assumes jQuery is already loaded globally

//File scope vars
var constructedSemafoneDomainURL = "";
var paymentState = {};
var PCIDSSSessionData = {};
var semafoneiFrameID = "semafoneiFrame";
var schemaHtml;
var alreadyCardAdded;

/***
 * 
 * 
 * 
 */
// function returnSemafoneFragmentpage(pageType) {
//     switch (true) {
//         case (pageType == 'SchemeCardNumberNameOnCardExpiryDateCSCNumber' && !alreadyCardAdded):
//             return 'SemafoneBACOMPANCVVCaptureFragment.html';
//         case (pageType == 'SchemeCardNumberNameOnCardExpiryDate' && alreadyCardAdded !== ''):
//             return 'NONE';
//         case (pageType == 'SchemeCardNumberNameOnCardExpiryDate'):
//             return 'SemafoneBACOMPANCaptureFragment.html';
//         case (pageType == 'SchemeCardNumberNameOnCardExpiryDate' && alreadyCardAdded !== ''):
//             return 'NONE';
//         case (pageType == 'SchemeCardNumberNameOnCardExpiryDateCSCNumber' && alreadyCardAdded !== ''):
//             return 'SemafoneBACOMCVVCaptureFragment.html';
//         default:
//             return 'SemafoneBACOMPANCVVCaptureFragment.html';
//     }
// };

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
function loadIframe(url, iFrame, schemaHtml, fn) {
    var semafoneCR, sessionId, siteUrl, isSubmitted;
    showSpinner();
    if (schemaHtml !== 'NONE') {
            $('#semafone-iframe').show();
            if ($('#' + iFrame).find('iframe.semafone-iframe').length === 0) {
                $('<iframe id="semafone-iframe" className="semafone-iframe" src="' + url +
                    '" width="600" height="350" scrolling="no" onload="hideSpinner()" frameborder="0"><\/iframe>').appendTo('#' + iFrame);
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
        var bar = JSON.parse(event.data);
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
function hideSpinner() {
    $("#semafone-spinner").attr("style", "display:none");
};

/**
 * hideSpinner method hides the spinner which is used to indicate the
 * loading of the iFrame
 * 
 **/
function showSpinner() {
    $("#semafone-spinner").attr("style", "display:inline-block");
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
function semafoneCb(semafoneCR, sessionId, siteURL, isSubmitted) {
    paymentState.semafoneMessage = {
        'semafoneCR': semafoneCR,
        'sessionId': sessionId,
        'siteURL': siteURL,
        'isSubmitted': isSubmitted
    }
    $("#SemafoneCRNumber").val(semafoneCR);
    $("#semafoneSessionID").val(sessionId);
    $("#SemafoneSiteURL").val(siteURL);
    $("#SemafoneSubmitSuccess").val(isSubmitted);

};

function initSemafoneFragmentForCardDetails() {
    //written this codes to load semafone fragment in pci true condition..
    // var isPciProxyEnabled = $('#PciProxy').val();
    // var cvvFlag = $('#cvvDataFlag').val();
	// var isGizmoCVVConvert = $('#gismoCVVConversion').val();
	// var selectedScheme = $("#CardSchemeCode1").val();
    // if ((isPciProxyEnabled == 'true' && cvvFlag == 'true') || (isPciProxyEnabled == 'false' && cvvFlag == 'true') || (isPciProxyEnabled == 'true' && isGizmoCVVConvert == 'true')) {
	// 	if (selectedScheme == 'TP' || selectedScheme == 'TPC' || selectedScheme == 'TDC' || selectedScheme == 'TPP' || selectedScheme == 'TDP')
	// 	{
	// 		schemaHtml = 'SemafoneBACOMPANCaptureFragment.html';
	// 	}
	// 	else {
    // 	 schemaHtml = 'SemafoneBACOMPANCVVCaptureFragment.html';
	// 	}
    // }
    // else {
    // 	schemaHtml = 'SemafoneBACOMPANCaptureFragment.html';
    // }
    schemaHtml = 'SemafoneBACOMPANCVVCaptureFragment.html';
    constructedSemafoneDomainURL = constructSemafoneURL(PCIDSSSessionData.PCIDSSSessionData, schemaHtml);
    paymentState.PCIDSSSessionData = PCIDSSSessionData.PCIDSSSessionData;
    loadIframe(constructedSemafoneDomainURL, semafoneiFrameID, schemaHtml, semafoneCb);
}

//written this code to prevent load of semafone fragment when not required..
function initSemafoneFragmentForNoCardDetails() {
    schemaHtml = 'NONE';
    constructedSemafoneDomainURL = constructSemafoneURL(PCIDSSSessionData.PCIDSSSessionData, schemaHtml);
    paymentState.PCIDSSSessionData = PCIDSSSessionData.PCIDSSSessionData;
    loadIframe(constructedSemafoneDomainURL, semafoneiFrameID, schemaHtml, semafoneCb);
}


function initSemafoneFragmentForGismo() {
    schemaHtml = getSchemaHTMLFromPCIFragment(PCIDSSSessionData.PCIDSSSessionData.PciFragment);
    constructedSemafoneDomainURL = constructSemafoneURL(PCIDSSSessionData.PCIDSSSessionData, schemaHtml);
    paymentState.PCIDSSSessionData = PCIDSSSessionData.PCIDSSSessionData;
    loadIframe(constructedSemafoneDomainURL, semafoneiFrameID, schemaHtml, semafoneCb);
}

function getSchemaHTMLFromPCIFragment(PCIFragment) {
    switch (PCIFragment) {
        case "PAN":
            return 'SemafoneBACOMPANCaptureFragment.html';
        case "PANCVV":
            return 'SemafoneBACOMPANCVVCaptureFragment.html';
        case "CVV":
            return 'SemafoneBACOMCVVCaptureFragment.html';
        default:
            return 'NONE';
    }
};

function handleGismoForNonGenesysUser(PCIFragment) {
    switch (PCIFragment) {
        case "PAN":
            $(".gismo-security-number").hide();
            return;
        case "CVV":
            $(".gismo-card-number").hide();
            $(".gismo-security-number").show();
            return;
        case "PANCVV":
            $(".gismo-security-number").show();
            return;
        default:
            return;
    }
};

/**
 * initSemafoneFragment method is the used to init the required data
 * to load the semafone fragement. 
 * 
 * 
 */
function initSemafoneFragment(hideCN) {
    var returnMandatoryFields = paymentState.paymentCardDetailsMandatoryFields;
    var semefoneCVV = $("#SemafoneCSCNumber1").val();
    if(returnMandatoryFields[paymentState.selectedCard]) {
        if (semefoneCVV && semefoneCVV.length >= 1){
            schemaHtml = 'NONE';
        }
        else {
            schemaHtml = returnSemafoneFragmentpage(returnMandatoryFields[paymentState.selectedCard].FieldName);
        }
    } else {
        schemaHtml = returnSemafoneFragmentpage('loadDefault');
    }
    if (hideCN) {
        $("#CardNumber1fieldrow").hide();
    } else {
        $("#CardNumber1fieldrow").show();
    }
    constructedSemafoneDomainURL = constructSemafoneURL(PCIDSSSessionData.PCIDSSSessionData, schemaHtml);
    paymentState.PCIDSSSessionData = PCIDSSSessionData.PCIDSSSessionData;
    loadIframe(constructedSemafoneDomainURL, semafoneiFrameID, schemaHtml, semafoneCb);
};


$(document).on("input", ".onlyNumberInput", function() {
    this.value = this.value.replace(/\D/g,'');
});

$(function() {
    var hideCN = false;
    PCIDSSSessionData = initStringToArrayObjectForSemafone($("#PCIDSSDATA").attr("data-pcidssdata"), ["position", "AgentLiveCallStatus", "ClientRef",
        "TenantId", "ClientId", "AccountId", "Principle",
        "LicenceCode", "SemafoneMode", "DomainURL", "isPegasus", "PciFragment"
    ]);
    alreadyCardAdded = ($("#savedCardDetails").find(".card-scheme-name").text()) ? $("#savedCardDetails").find(".card-scheme-name").text() : $("#cardPrePopulated").attr("data-prepopulatecard");
    // savedCardScenario = parseInt(pageConstants.amountOfCards) > 1 && pageConstants.showDefaultCard === "true";
    if (PCIDSSSessionData.PCIDSSSessionData.AgentLiveCallStatus === 'TRUE') {
        if (document.getElementById('pageName').value === 'PEGASUS_PAYMENT') {
            initSemafoneFragmentForCardDetails();
        }
        if (document.getElementById('pageName').value === 'PAYMENT') {
            initSemafoneFragment(hideCN);
        }
        if (document.getElementById('pageName').value === 'SHOW_CARD_DETAILS') {
            initSemafoneFragmentForGismo();
        }
        $(document).ready(function() {
        	$(".spinnerWrapper" ).spin({
        		lines:      14,
        		length:     8,
        		width:      4,
        		radius:     14,
        		rotate:     13,
        		color:      '#2e5c99',
        		speed:      1.0,
        		corners:    0.5,
        		trail:      80,
        		shadow:     false,
        		hwaccel:    true,
        		className:  'spinner',
        		zIndex:     2e9,
        		opacity:    0
        	});
        }); 
    }
    if (document.getElementById('pageName').value === 'SHOW_CARD_DETAILS') {
        handleGismoForNonGenesysUser(PCIDSSSessionData.PCIDSSSessionData.PciFragment);
        if (PCIDSSSessionData.PCIDSSSessionData.AgentLiveCallStatus === 'FALSE') {
            handleGismoForNonGenesysUser(PCIDSSSessionData.PCIDSSSessionData.PciFragment);
        }
        var isPciProxyEnabled = $('#PciProxy').val();
        var isGizmoCVVConvert = $('#gismoCVVConversion').val();
        if (isPciProxyEnabled && isPciProxyEnabled != 'true') {
            //disable copy paste
            $('body').bind('cut copy paste', function (e) {
                e.preventDefault();
            });

            //Disable mouse right click
            $("body").on("contextmenu", function (e) {
                return false;
            });
        }

        //codes written to load the semafone fragment for card conversion pages..
        if (PCIDSSSessionData.PCIDSSSessionData.AgentLiveCallStatus == "TRUE")
		{
			if (isGizmoCVVConvert != 'true') {
				$(".card-scheme-code-cd").on("change", function () {
					switch (this.value) {
						case "CARD_TO_PCI_TOKEN":
							return initSemafoneFragmentForCardDetails();
						case "CARD_TO_SAFENET_TOKEN":
							return initSemafoneFragmentForCardDetails();
						default:
							return initSemafoneFragmentForNoCardDetails();
					}
				})
			}
			else {
				$(".card-scheme-code-cd").on("change", function () {
                    return initSemafoneFragmentForCardDetails();
				})
            }
            // Validation error fixes 
            var cardConversionEvent = $("#cardConversionEvent").val();
            var cardConversionVal = $("#cardConversionVal").val();
            if(cardConversionEvent === "true"){
                if(cardConversionVal === 'CARD_TO_PCI_TOKEN' || cardConversionVal === 'CARD_TO_SAFENET_TOKEN'){
                    return initSemafoneFragmentForCardDetails();
                }
                else {
                    return initSemafoneFragmentForNoCardDetails();
                }
            }
		}
    }
});