Ext.define("cogni.view.Main", {
    extend: 'Ext.navigation.View',
    requires: ['Ext.TitleBar'],
    xtype: 'mainview',

    config: {
        navigationBar: {
            items: [
            ]
        },
        items: [
            {
                title: 'SE16',
                xtype: 'selectionscreen'
            },
        ]
    }
});