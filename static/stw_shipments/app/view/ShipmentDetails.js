Ext.define('Shipments.view.ShipmentDetails', {
    extend: 'Ext.Panel',
    xtype: 'shipdetails',
    
    requires: [
        'Shipments.view.StatusItem'
    ],
    
    loadRecord: function(recId) {
        var sd = Ext.ModelManager.getModel('Shipments.model.ShipmentDetail');

        //Uses the configured RestProxy to make a GET request to /users/123
        sd.load(recId, {
            scope: this,
            success: function(record, operation) {
                this.setRecord(record);
                this.displayRecord();
            }
        });
    },
    
    displayRecord: function() {
        var idname,
            dname,
            tname,
            widget,
            r = this.getRecord();
        this.setTitle("Shipment " + r.getId().toString());
        this.child("#shipment-desc").setHtml("Shipment: "+ r.getId().toString() + "<br>" +
                                             "Carrier: " + r.get('carrier') + "<br>" +
                                             "Route: " + r.get('route') + "<br>");
        
        var btns = ['checkin','load_start','load_end','complete','start','end'];
        for (var i=0; i<btns.length; i++) {
            dname = btns[i] + '_d';
            tname = btns[i] + '_t';
            idname = '#' + btns[i] + '_st';
            if (r.get(btns[i])) {
                widget = this.query(idname)[0];
                if (widget) {
                    widget.setButtonChecked();
                    widget.setDate(r.get(dname));
                    widget.setTime(r.get(tname));
                }
            } 
        }
                
        // maybe on initialize or on controller
        this.on({
            // Ext.Buttons have an xtype of 'button', so we use that are a selector for our delegate
            delegate: 'button',

            tap: function(btn) {
                    var record,
                        widgetid,
                        fieldname,
                        fieldname_t,
                        fieldname_d,
                        status,
                        date = '',  
                        time = '',
                        widget = btn.up('statusitem'),
                        pf;
                
                // pad with zeros 
                var pf = function(val) {
                    if (val < 10) { 
                        return '0' + val;
                    } else {
                        return val;
                    }
                };
                // only for buttons in statusitem widgets
                if (widget) {
                    record = widget.up('shipdetails').getRecord();
                    widgetid =  widget.getId()
                    fieldname = widgetid.substring(0, widgetid.length-3);
                    fieldname_d = fieldname + '_d';
                    fieldname_t = fieldname + '_t';
                    if (record.get(fieldname)) {
                        status = false;
                        record.set(fieldname, status);
                        record.set(fieldname_d, '');
                        record.set(fieldname_t, '');
                    } else {
                        var t = new Date(),
                            m = t.getMonth() + 1;
                        
                        date = t.getFullYear() + '-' + pf(m) + '-' + pf(t.getDate());
                        time = pf(t.getHours()) + ':' + pf(t.getMinutes()) + ':' + pf(t.getSeconds());
                        status = true;
                        record.set(fieldname, status);
                        record.set(fieldname_d, date);
                        record.set(fieldname_t, time);                        
                    }                    
                    
                    widget.toggle(status, date, time);
                }
                
            }
        });
    },
    config: {
        record: undefined,
        title: 'Shipment Details',

        store: undefined,
        items: [{
            id: "shipment-desc",
            html: "",
            styleHtmlContent: true,
        },{
            xtype: 'toolbar',
            title: 'Shipment Status'
        },{
            id: "shipment-status",
            styleHtmlContent: true,
            layout: 'vbox',
            items: [{
                    html: "<h4>Realization times</h4>"
                },{
                    id: 'checkin_st',
                    xtype: 'statusitem',
                    text: 'Check In',
                },{
                    id: 'load_start_st',
                    xtype: 'statusitem',
                    text: 'Load Start',
                },{
                    id: 'load_end_st',
                    xtype: 'statusitem',
                    text: 'Load End',
                },{
                    id: 'complete_st',
                    xtype: 'statusitem',
                    text: 'Complete',
                },{
                    id: 'start_st',
                    xtype: 'statusitem',
                    text: 'Start',
                },{
                    id: 'end_st',
                    xtype: 'statusitem',
                    text: 'End',
                }]
        }]
    },
});

