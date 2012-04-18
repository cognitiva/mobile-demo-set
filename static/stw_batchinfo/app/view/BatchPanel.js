Ext.define("stw_batchinfo.view.BatchPanel", {
    extend: 'Ext.form.Panel',
    xtype: 'batchpage',
    
    fullscreen: true,
    
    config: {
        id: 'infopage',
        title: 'Batch Details',
        items: [{
                xtype: 'fieldset',
                items: [
                    { xtype: 'textfield', name: 'matnr', label: 'Material', disabled: true},
                    { xtype: 'textfield', name: 'werks', label: 'Plant', disabled: true},
                    { xtype: 'textfield', name: 'lgort', label: 'Storage Loc.', disabled: true}, 
                    { xtype: 'textfield', name: 'charg', label: 'Batch', disabled: true},
                    { xtype: 'textfield', name: 'laeda', label: 'Last Change', disabled: true},
                    { xtype: 'textfield', name: 'aenam', label: 'Last Person', disabled: true},
                    { xtype: 'textfield', name: 'sperc', label: 'PI Blocked', disabled: true},
                    { xtype: 'textfield', name: 'clabs', label: 'Unrestricted Qty', disabled: true},
                    { xtype: 'textfield', name: 'cumlm', label: 'In Transfer Qty', disabled: true},
                    { xtype: 'textfield', name: 'cinsm', label: 'QI Qty', disabled: true},
                    { xtype: 'textfield', name: 'cspem', label: 'Blocked Qty', disabled: true},
                    { xtype: 'textfield', name: 'meins', label: 'Unit', disabled: true},
                ]
            }, {
                xtype: 'button',
                id: 'blockButton',
                text: ''
        }]
    }
});

