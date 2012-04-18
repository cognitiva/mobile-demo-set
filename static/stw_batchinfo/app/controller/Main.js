Ext.define('stw_batchinfo.controller.Main', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            mainPage: '#mainpage',
            infoPage: '#infopage',
            settingsPage: '#settingspage'
        },
        
        control: {
            '#scanButton': {
                tap: 'scanAction'
            },
            'batchpage #blockButton': {
                tap: 'blockAction'
            },
            '#mainpage #navigatehome': {
                activate: 'navigateHome'
            }
        }
    },
    
    navigateHome: function() {
        window.location.href = '/static/stweaver/build/production/index.html';
    },
    
    getActionStatus: function(clabs, cspem) {
        var status;
        if (clabs === '0' && cspem !== '0') {
            status = 'U';  //to unblock
        } else if (clabs !== '0' && cspem === '0') {
            status = 'B';  //to block
        } else {
            status = ''
        }
        return status;
    },
    
    blockAction: function(button) {
        var batch = this.getInfoPage().query('textfield[name=charg]')[0].getValue(),
            werks = this.getInfoPage().query('textfield[name=werks]')[0].getValue(),
            clabs = this.getInfoPage().query('textfield[name=clabs]')[0].getValue(),
            cspem = this.getInfoPage().query('textfield[name=cspem]')[0].getValue(),
            status = this.getActionStatus(clabs, cspem);
        
        Ext.Ajax.request({
            url: '/sap/bc/bsp/sap/ymwbatchinfo/changestatus.do',
            params: {werks:werks, charg:batch, status:status, format:'json'},
            success: this.showBatchPage,
            failure: function() {
                        var msg;
                        if (status === 'B') {
                            msg = 'Failed to block the batch';
                        } else {
                            msg = 'Failed to unblock the batch';
                        }
                        Ext.Msg.alert(msg)
                    },
            scope: this
        });
    },
    
    scanAction: function() {
        //call barcode scanner whe the plugin is available, otherwise use a testing stub
        if (typeof window.plugins === "undefined" || typeof window.plugins.barcodeScanner === "undefined") {
            //example for testing in browser
            this.scannerSuccess({text:'1064732867', format:'EAN13'})
        } else {
            window.plugins.barcodeScanner.scan(this.scannerSuccess, this.scannerFailure);
        }        
    },
    
    scannerSuccess: function(result) {
        var batch;
        if (result.format === 'UPC_A') {
            batch = result.text.substring(0, 10);
        } else {
            batch = result.text;
        }
        var werks = this.getSettingsPage().query('textfield[name=werks]')[0].getValue();
        Ext.Ajax.request({
            url: '/sap/bc/bsp/sap/ymwbatchinfo/batchinfo.do',
            params: { werks: werks, charg: batch, format: 'json' },
            method: 'GET',
            success: this.showBatchPage,
            failure: function() { Ext.Msg.alert('Unable to find batch')},
            scope: this
        });
        
    },
    
    scannerFailure: function() {
        Ext.Msg.alert('Failed to scan a barcode');
    },
    
    showBatchPage: function(response) {
        var qstr,
            fields,
            key,
            button,
            status,
            infopage = this.getInfoPage();
        var batchData = Ext.JSON.decode(response.responseText);
        if (!infopage) {
            infopage = Ext.create('stw_batchinfo.view.BatchPanel');
        }
        for (key in batchData) {
            qstr = 'textfield[name=' + key + ']';
            fields = infopage.query(qstr);
            fields[0].setValue(batchData[key]);
        }
        button = infopage.query('#blockButton')[0];
        status = this.getActionStatus(batchData['clabs'], batchData['cspem']);
        if (status === 'U') {
            button.setText('Unblock Batch');
        } else if (status === 'B') {
            button.setText('Block Batch');
        } else {
            button.hide();
        }
        var mainpage = this.getMainPage();
        mainpage.push(infopage);
    }
});
