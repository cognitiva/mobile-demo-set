//namespace for sapmobile utilities
var SMU = {};

SMU.STATUS_FIELDS = [
    ['streg','dareg','uareg'],
    ['stlbg','dalbg','ualbg'],
    ['stlad','dalen','ualen'],
    ['stabf','dtabf','uzabf'],
    ['sttbg','datbg','uatbg'],
    ['stten','daten','uaten']
];

// get/set a shipment from the global cache and return the shipment xml
// wrapped in a jQuery object 
SMU.shipment = function(tknum, upd_shipment) {
    var shipment;
    var shipments = $('#listPage').data('shipmentList'); 
    if (upd_shipment !== undefined) {
        shipments[tknum] = upd_shipment;
        $('#listPage').data('shipmentList', shipments);
        shipment = upd_shipment;
    } else {      
        shipment = shipments[tknum];
    }
    if (shipment !== undefined) {
        return $(shipment);
    }
};

SMU.display_shipment_detail = function(shipment) {
    var page = $("#detailPage");
	page.find('h1').text("Shipment " + shipment.find('tknum').text());
	page.find('span#shipment').text(shipment.find('tknum').text());
	page.find('span#carrier').text(shipment.find('tdlnr').text() + ' ' + 
				shipment.find('name1').text());
	page.find('span#route').text(shipment.find('route').text() + ' ' + 
				shipment.find('bezei').text());
	for (var i=0; i<SMU.STATUS_FIELDS.length; i++ ) {
	    SMU.updateStatusField(SMU.STATUS_FIELDS[i][0], SMU.STATUS_FIELDS[i][1],
	            SMU.STATUS_FIELDS[i][2], page, shipment);
	}
}

SMU.activate_button = function(btn_id) {
	$(btn_id).attr('data-icon','check');
	$(btn_id + ' span.ui-icon').removeClass("ui-icon-arrow-r").addClass("ui-icon-check");
	$(btn_id).attr('data-theme','b').removeClass("ui-btn-up-c").addClass("ui-btn-up-b");
    $(btn_id).removeClass("ui-btn-hover-c").addClass("ui-btn-hover-b");	
};

SMU.deactivate_button = function(btn_id) {
	$(btn_id).attr('data-icon','arrow-r');
	$(btn_id + ' span.ui-icon').removeClass("ui-icon-check").addClass("ui-icon-arrow-r");
	$(btn_id).attr('data-theme','c').removeClass("ui-btn-up-b").addClass("ui-btn-up-c");
	$(btn_id).removeClass("ui-btn-hover-b").addClass("ui-btn-hover-c");	
};

SMU.updateList = function(query_date, query_status) {
	var urlstr = '/sapmobile/list?date=' + query_date + '&status=' + query_status;
	$.mobile.showPageLoadingMsg();
	$.ajax({ url: urlstr, dataType: 'xml', 
	    success: function(data) {
	        var node, tknum, shipmentList, ul, xmldoc;
	        shipmentList = {};
    		ul = $('ul#itemlist');
    		ul.empty();
    		xmldoc = $(data);
    		xmldoc.find('shipment').each( function(index) {
    			var s = '<li><a data-transition="slide" href="#detailPage">';
    			s += '<h3>' + $(this).find('tknum').text() + ' ' + $(this).find('name1').text() + '</h3>';
    			s += '<p>Route ' + $(this).find('route').text() + ' ' + $(this).find('bezei').text(); 
    			s += '| Carrier ' + $(this).find('tdlnr').text() + '</p></a></li>';
                node = $(s);
    			shipment_xml = (new XMLSerializer()).serializeToString(this);
    			tknum = $(this).find('tknum').text();
    			shipmentList[tknum] = shipment_xml;
    			node.find('a:first').data('tknum', tknum);
    			ul.append(node);
    			});
    		$('#listPage').data('shipmentList', shipmentList);
    		ul.listview('refresh');
    		ul.find('a').click( function() {
    			$('#detailPage').data('tknum', $(this).data('tknum'));
    		});
    		$.mobile.hidePageLoadingMsg();
    		},
		error: function() {
		    $.mobile.hidePageLoadingMsg();
		}
	})
};

SMU.format_time = function(time_value) {
    return time_value.substr(0,8);
}

SMU.updateStatusField = function(status_field, date_field, time_field, page, shipment) {
    var status = shipment.find(status_field).text();
	if (status === 'X') { 
	    SMU.activate_button('#btn_' + status_field);
	    page.find('#s_' + date_field + ' p').text(shipment.find(date_field).text());
	    page.find('#s_' + time_field + ' p').text(SMU.format_time(shipment.find(time_field).text()));
	} else {
	    SMU.deactivate_button('#btn_' + status_field);
	    page.find('#s_' + date_field + ' p').text('');
	    page.find('#s_' + time_field + ' p').text('');
	}
};

SMU.addStatusEventManager = function(detailpage, status_field, date_field, time_field) {
    detailpage.find('#btn_' + status_field).click( function() {
        var tknum, shipment, status;
        tknum = $("#detailPage").data('tknum');
        shipment = SMU.shipment(tknum);
	    status = shipment.find(status_field).text();
		$.get('/sapmobile/action', {'mode':status_field, 'sid':tknum}, function(data) {
		    var xmldoc, shipment_node, shipment_xml, shipment;
		    xmldoc = $(data);
		    shipment_node = $(data).find('shipment')[0];
		    shipment_xml = (new XMLSerializer()).serializeToString(shipment_node);
		    shipment = SMU.shipment(tknum, shipment_xml);
		    SMU.display_shipment_detail(shipment);
		    return false;
        }, 'xml');    
	});
};

(function($) { 
	var methods = {
		initSelectionPage : function() { 
			var selpage = $("#selectionPage");
			selpage.find("#selectionform").submit( function(event) {
				var query_date = $(this).find('#date').val();
				var query_status = $(this).find('#status').val();
				var listpage = $('#listPage');
				listpage.data("new_query_flag", true);
				listpage.data("query_date", query_date);
				listpage.data("query_status", query_status);
				$.mobile.changePage("#listPage");
				return false;
			});
		},
		initListPage : function() { 
			var listpage = $("#listPage");
			listpage.bind("pageshow", function(event, ui) {
				if (listpage.data("new_query_flag")) {
					SMU.updateList(listpage.data("query_date"), listpage.data("query_status"));
					listpage.data("new_query_flag", false);
				}
			});
		},
		initDetailPage : function() { 
			var detailpage = $("#detailPage");
			detailpage.bind("pageshow", function(event, ui) {
			    var page, shipment;
				page = $("#detailPage");
				shipment = SMU.shipment(page.data('tknum'));
                SMU.display_shipment_detail(shipment);
			});
			detailpage.find('#logButton').click( function() {
				$('#logPage').data('tknum', $("#detailPage").data('tknum'));
			});
			for (var i=0; i<SMU.STATUS_FIELDS.length; i++ ) {
			    SMU.addStatusEventManager(detailpage, SMU.STATUS_FIELDS[i][0],
			        SMU.STATUS_FIELDS[i][1], SMU.STATUS_FIELDS[i][2]);
			}
		},
		initLogPage : function() {
			$("#logPage").bind("pageshow", function(event, ui) {
			    var page, tknum, shipment;
				page = $("#logPage");
				tknum = page.data('tknum');
				shipment = SMU.shipment(tknum);
				page.find('input#tknum').val(shipment.find('tknum').text());
				page.find('span.var_tknum').text(shipment.find('tknum').text());
				var logtext = shipment.find('textlog').text();
				if (logtext) {
				    logtext = logtext.replace(/\n/g, '<br />');
					page.find('p#var_log').html(logtext);
				}
			});
			$("#logForm").submit( function() {
			    var tknum =  $(this).find('#tknum').val();
			    var logtext = $(this).find('#logtext').val();
			    var urlstr = '/sapmobile/log';
			    $.ajax({ type: 'POST', 
			        url: urlstr, 
			        data: { logtext: logtext, sid: tknum },
			        dataType: 'xml', 
			        success: function(data) {
			            var xmldoc, shipment_node, shipment_xml, shipment, logtext;
			            xmldoc = $(data);
			            shipment_node = $(data).find('shipment')[0];
			            shipment_xml = (new XMLSerializer()).serializeToString(shipment_node);
			            shipment = SMU.shipment(tknum, shipment_xml);
			            logtext = shipment.find('textlog').text();
		                logtext = logtext.replace(/\n/g, '<br />');
		                $("#logPage").find('p#var_log').html(logtext);
		                $("#logPage").find('textarea#logtext').val('');
		            }
	            });
	            return false;
			});
		},
		initAll : function() { 
			$().initApp("initSelectionPage");
			$().initApp("initListPage");
			$().initApp("initDetailPage"); 
			$().initApp("initLogPage");
		}
	};
	$.fn.initApp = function(method) {
		if ( methods[method] ) {
			return methods[ method ].apply( this,
				Array.prototype.slice.call( arguments, 1 )); 
		} else if ( typeof method === 'object' || ! method ) {
			return methods.initAll.apply( this, arguments ); 
		} else {
			$.error( 'Method ' + method + ' does not exist' ); 
		}
	};
})(jQuery);


$(document).ready( function() {
	$(document).initApp("initAll");
 });