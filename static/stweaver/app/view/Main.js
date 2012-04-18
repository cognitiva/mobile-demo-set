var launcherdata = Ext.create('Ext.data.ArrayStore', {
        fields: ['id','title','url'] }).setData(
            [['1','Batch Monitor','/static/stw_batchinfo/build/production/index.html'],
             ['2','Data View','/sap/bc/bsp/sap/ymwdataview/index.html'],
             ['3','Document Flow','/static/stw_docflow/index.html'],
             ['4','Shipment Control','/sap/bc/bsp/sap/ymwdemoship/home.do']]
            );

Ext.define("stweaver.view.Main", {
    xtype: 'launcher',
    extend: 'Ext.tab.Panel',
    
    requires: ['Ext.dataview.List',
               'Ext.navigation.View'],
    
    config: {
        tabBarPosition: 'bottom',
        
        items: [{
                title: 'Home',
                iconCls: 'home',
                xtype: 'navigationview',
                
                items: {
                    xtype: 'list',
                    id: 'applistpage',
                    title: 'SAP Mobile Apps',
                    itemTpl: '{title}',
                    idIndex: 0,
                    store: launcherdata
                }
        }]
    }
});


