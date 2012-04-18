Ext.define('Shipments.view.ShipmentLog', {
    extend: 'Ext.form.Panel',
    xtype: 'shipmentlog',
    
    config: {
        title: "Shipment Log",

        items: [{
            xtype: 'fieldset',
            items: [{
                xtype: 'textareafield',
                maxRows: 4,
                name: 'shipmentlog'
            }]
        },{
            xtype: 'button',
            id: 'savelogbtn',
            text: 'save',
            ui: 'confirm'
        }]
    },
    
    updateLog: function(record) {
        this.setRecord(record);
        this.child('fieldset textareafield').setValue(record.get('log'));
    },
    
    constructor: function() {
        this.callParent(arguments);
        
        var button = this.down('button');
        
        button.setHandler(function(btn) {
            var shipLog = btn.up('shipmentlog'),
                record = shipLog.getRecord(),
                textarea = btn.up('shipmentlog').down('fieldset textareafield');
            record.set('log', textarea.getValue());
            Ext.Msg.alert('Data Saved', 'Log entry updated', Ext.emptyFn);
        }); 
    }
});