Ext.define("Shipments.view.Main", {
    extend: 'Ext.navigation.View',
    xtype: 'mainview',
    requires: ['Ext.TitleBar'],
    
    config: {
        fullscreen: true,
        autoDestroy: false, // this is REALLY needed! why?
        navigationBar: {
            items: [
                {
                    xtype: 'button',
                    id: 'logButton',
                    text: 'Log',
                    align: 'right',
                    hidden: true,
                    hideAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeOut',
                        duration: 200
                    },
                    showAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeIn',
                        duration: 200
                    }
                },
            ]
        },

        items: [
            {
                xtype: 'selectionscreen'
            },
            {
                docked: 'bottom',
                xtype: 'titlebar',
                title: 'cognitiva.com'
            }
        ],

        title: 'Shipment Monitor',
        iconCls: 'home',

        scrollable: true,

    },
});
