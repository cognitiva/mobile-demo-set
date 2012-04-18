
function popAlert(message) {
  // Populate the message text
  $('#alert_message').text(message);

  // Popup the message dialog
  $.mobile.changePage("#message", "pop");
}

function popClose() {
  $.mobile.changePage("#home", { transition: "pop", reverse: true });
}

function setSettings() {
    localStorage.setItem("plant", $('#plant').val());
    popAlert('Values saved to local storage');
}

function clickScan() {
    //call barcode scanner whe the plugin is available, otherwise use a testing stub
    if (typeof window.plugins.barcodeScanner === "undefined") {
        //example for testing in browser
        scannerSuccess({text:'1064732869', format:'EAN13'});
    } else {
        window.plugins.barcodeScanner.scan(scannerSuccess, scannerFailure);
    }
}

function scannerFailure(message) {
  popAlert('Scanning failure' + message);
}

function blockBatch() {
  var batch = $('#blockbatch').data('batch');
  changeBatchStatus(batch, 'B');
}

function unblockBatch() {
  var batch = $('#unblockbatch').data('batch');
  changeBatchStatus(batch, 'U');
}

function changeBatchStatus(batch, status) {
  var data = {werks:$('#plant').val(), charg:batch, status:status};
  var url = '/sap/bc/bsp/sap/ymwbatchinfo/changestatus.do';
  $.mobile.showPageLoadingMsg();
  $.ajax({
         type: "POST",
         url: url,
         data: data,
         dataType: "xml",
        crossDomain: true,
        success: showBatchPage,
        error: function(jqXHR, textStatus, errorThrown) {
          $.mobile.hidePageLoadingMsg();
          popAlert("Failure to connect to SAP server " + textStatus + errorThrown);
        }
      }); // Ajax posting
}

function showBatchPage(data) {
  var content, blockedQty, unrestrictedQty, batchStatus, batchNumber;
  var xmldoc = $(data);
  $('#batchcontent').empty();
  xmldoc.find('error ul li').each(function(index) {
    content += '<p>' + item.attr('errortype') + ' ' + item.text() +'</p>';
  });
  // if content is null then no error was processed, display the batch data
  if (content === undefined) {
    content = '<div class="ui-grid-a">';
    xmldoc.find('ul li').each(function(index) {
      item = $(this);
      if (item.attr('name') === 'clabs') {
        unrestrictedQty = parseFloat(item.text());
      } else if (item.attr('name') === 'cspem') {
        blockedQty = parseFloat(item.text());
      } else if (item.attr('name') === 'charg') {
        batchNumber = item.text();
      }
      content += '<div class="ui-block-a">' + item.attr('description') + '</div>';
      content += '<div class="ui-block-b">' + item.text() + '</div>';
    });
    content += '</div>';

    //check if the batch is blocked / unrestricted or other
    if (unrestrictedQty !== NaN && blockedQty !== NaN) {
      if (unrestrictedQty > 0 && blockedQty < 0.0001) {
        batchStatus = 'UNRES';
      } else if (unrestrictedQty < 0.0001 && blockedQty > 0) {
        batchStatus = 'BLOCKED';
      } else {
        batchStatus = 'OTHER';
      }
    } else {
      batchStatus = 'OTHER';
    }
    $('#blockbatch').hide();
    $('#unblockbatch').hide();
    if (batchStatus === 'UNRES') {
      $('#blockbatch').data('batch', batchNumber);
      $('#blockbatch').show();
    } else if (batchStatus === 'BLOCKED') {
      $('#unblockbatch').data('batch', batchNumber);
      $('#unblockbatch').show();
    }
  }

  $('#batchcontent').html(content);
  $.mobile.hidePageLoadingMsg();
  $.mobile.changePage($('#batch'));
}

function scannerSuccess(result) {
  var url = '/sap/bc/bsp/sap/ymwbatchinfo/batchinfo.do';
  var batch;
  if (result.format === 'UPC_A') {
    batch = result.text.substring(0, 10);
  } else {
    batch = result.text;
  }
  var data = { werks: $('#plant').val(), charg: batch };
  $.mobile.showPageLoadingMsg();
  $.ajax({
         type: "GET",
         url: url,
         data: data,
         dataType: "xml",
         crossDomain: true,
         success: showBatchPage,
         error: function(jqXHR, textStatus, errorThrown) {
          $.mobile.hidePageLoadingMsg();
          popAlert("Failure to connect to SAP server " + textStatus + errorThrown);
        }
      }); 
}

$( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!
    $.mobile.allowCrossDomainPages = true;
});

$(document).ready(function() {
  $.mobile.allowCrossDomainPages = true;
  $('#scanbtn').click(clickScan);
  $('#blockbatch').click(blockBatch);
  $('#unblockbatch').click(unblockBatch);
  $('#savebtn').click(setSettings);
  $('#okbtn').click(popClose);
});
