Ext.define('Shipments.controller.Application', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            main: 'mainview',
            selection: 'selectionscreen',
            shipList: 'shiplist',
            shipDetail: 'shipdetails',
            shipLog: 'shipmentlog',
            logButton: '#logButton'
        },

        control: {
            selection: {
                // how about submit event?
               selection: 'onSelection'
            },
            shiplist: {
                itemdisclosure: 'onItemDisclosure'
            },
            shipdetails: {
            },
            main: {
                push: 'onMainPush',
                pop: 'onMainPop'
            },
            logButton: {
                tap: 'onLogEdit'
            }
        },
        routes: {
            'list': 'showShipmentList',
            'shipment/:id': 'showShipment'
        }
    },
    
    onSelection: function() {
        this.redirectTo('list');
    },
    
    showShipmentList: function() {
        if (!this.shipList) {
            this.shipList = Ext.create('Shipments.view.ShipmentList');
        }

        // Push the show contact view into the navigation view
        this.getMain().push(this.shipList);
    },
    
    showShipment: function(sId) {
        if (!this.shipDetail) {
            this.shipDetail = Ext.create('Shipments.view.ShipmentDetails');
        }
        this.shipDetail.loadRecord(sId);
        this.getMain().push(this.shipDetail);
    },
    
    onItemDisclosure: function(rec, item) {
        this.redirectTo('shipment/' + rec.getId());
    },
    
    onMainPush: function(view, item) {
        if (item.xtype == "shipdetails") {
            // dowesn't work - title comes from item-config
//             var bar = this.getMain().getNavigationBar();
//             if (bar.titleComponent.element) bar.titleComponent.element.setWidth('auto');
//             bar.titleComponent.setTitle(item.getTitle());
//             bar.refreshProxy();
            this.showLogButton();
        }
    },
    
    onMainPop: function(view, item) {
        if (item.xtype == "shipdetails") {
            this.hideLogButton();
        }
    },
    
    onLogEdit: function(sId) {
        if (!this.shipLog) {
            this.shipLog = Ext.create('Shipments.view.ShipmentLog');
        }
        this.shipLog.updateLog(this.shipDetail.getRecord());
        this.getMain().push(this.shipLog);
    },
    
    showLogButton: function() {
        var logButton = this.getLogButton();

        if (!logButton.isHidden()) {
            return;
        }
        logButton.show();
    },

    hideLogButton: function() {
        var logButton = this.getLogButton();

        if (logButton.isHidden()) {
            return;
        }
        logButton.hide();
    },
});
