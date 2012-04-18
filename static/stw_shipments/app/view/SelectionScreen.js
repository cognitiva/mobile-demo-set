function getShipmentListConfig() {
    return {
        xtype: 'shiplist',
        store: Ext.create('Ext.data.Store', {
            extend: 'Ext.data.Store',
            autoLoad: true,
            fields: ['title', 'description'],
            proxy: {
                type: 'ajax',
                url: 's.json',
                reader: {
                    type: 'json',
                    rootProperty: 'shipments'
                }
            }
        })
    }
}

Ext.define("Shipments.view.SelectionScreen", {
    extend: 'Ext.form.Panel',
    xtype: 'selectionscreen',
    requires: [
        'Ext.form.FieldSet',
    ],
    
    config: {
        title: 'Shipment Selection',
        items: [{
                        xtype: 'fieldset',
                        title: 'Shipment Monitor',
                        items: [
                            {
                                 xtype: 'datepickerfield',
                                 name: 'date',
                                 label: 'Date',
                                 value: new Date()
                             },
                                    {
                                        xtype: 'selectfield',
                                        label: 'Status',
                                        name: 'status',
                                        options: [
                                            {value: "", text: "Choose status..."},
                                            {value: "1", text: "Planned"},
                                            {value: "2", text: "Planning completed"},
                                            {value: "3", text: "Check-in"},
                                            {value: "99", text: "Other"}
                                        ]
                                    }
                        ]
                    },
                   {
                       xtype: 'button',
                       ui: 'confirm',
                       text: 'List',
                       handler: function() {
                           this.up('selectionscreen').fireEvent('selection');
//                            this.up('selectionscreen').submit();
//                            this.up('shipments').push(getShipmentListConfig()); // finds the parent xtype 'contactform'
                       }
                   }
       ],

        iconCls: 'home',

        styleHtmlContent: true,
        scrollable: true,

    },
});
