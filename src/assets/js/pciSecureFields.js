(function() {
    console.log ("Version: Secure fields 2.0.0");
    
    var prodSecureFields = ["www.britishairways.com", "hotline.ba.com", "badirect-auth.baplc.com",
       "www-cloud.britishairways.com", "disruptionclaim.britishairways.com", "viajes.iberia.com", "ecp-live-left4a.baplc.com", "ecp-live-left4b.baplc.com"
    ];
    
    ((prodSecureFields.indexOf(document.location.hostname) > -1) ? (function() {
          var e = document.createElement("script");
          e.src =  "https://pay.datatrans.com/upp/payment/js/secure-fields-2.0.0.js";
          document.getElementsByTagName("head")[0].appendChild(e);
     }()) : (function() {
          var e = document.createElement("script");
          e.src =  "https://pay.sandbox.datatrans.com/upp/payment/js/secure-fields-2.0.0.js";
          document.getElementsByTagName("head")[0].appendChild(e);
     }()))
 
 })();