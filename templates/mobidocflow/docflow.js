
function popAlert(message) {
  // Populate the message text
  $('#alert_message').text(message);

  // Popup the message dialog
  $.mobile.changePage("#message", "pop");
}

function popClose() {
  $.mobile.changePage("#home", { transition: "pop", reverse: true });
}

function clickScan() {
    //window.plugins.barcodeScanner.scan(scannerSuccess, scannerFailure);
    //example for testing in browser
    scannerSuccess({text:'C 7374730019', format:'EAN13'})
}

function scannerFailure(message) {
  popAlert('Scanning failure' + message);
}

function scannerSuccess(result) {
  var parts = result.text.split(' ');
  if (parts.length === 2) {
    var url = '/sap/bc/bsp/sap/ymwdocflow/doc.do?doc=' + parts[0] + '&num=' + parts[1];
    $.mobile.changePage(url);
  } else {
    popAlert('Scanning failure, wrong barcode info ' + result.text);
  }
}

$( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!
    $.mobile.allowCrossDomainPages = true;
});

$(document).ready(function() {
  $.mobile.allowCrossDomainPages = true;
  $('#scanbtn').click(clickScan);
  $('#okbtn').click(popClose);
});
