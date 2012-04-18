// Ext.require(['Ext.form.FieldSet']);

Ext.define("cogni.view.Selection", {
    extend: 'Ext.form.Panel',
    xtype: 'selectionscreen',

    config: {
        items: [
            {
                xtype: 'fieldset',
                items: [
                    {
                        xtype: 'textfield',
                        name: 'table',
                        label: 'Table'
                    },
                ]
            },
            {
                xtype: 'button',
                text: 'Get Data',
            }
        ]
    }
});