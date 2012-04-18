Ext.define("stw_batchinfo.view.Main", {
    extend: 'Ext.NavigationView',
    requires: ['Ext.TitleBar',
               'Ext.tab.Panel',
               'Ext.form.FieldSet'],
    
    config: {
        id: 'mainpage',

        items: [{
            xtype: 'tabpanel',
            title: 'Batch Info',
            tabBarPosition: 'bottom',   
            items: [{
                title: 'App',
                iconCls: 'compose',

                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },

                items: [{
                    xtype: 'button',
                    id: 'scanButton',
                    text: 'scan',
                    padding: '0 35 0 35',
                    ui: 'confirm'
                    }
                    ]
                },{
                    xtype: 'formpanel',
                    title: 'Settings',
                    iconCls: 'settings',
                    id: 'settingspage',
                    items: [{
                        xtype:'fieldset',
                        items: [{
                            xtype:'textfield',
                            name:'werks',
                            label:'Plant',
                            value: '1100'
                        }]
                    }]
                    
                },{
                    title: 'Home',
                    iconCls: 'home',
                    id: 'navigatehome'
                }]
        }]
    }
});