Ext.define('cogni.controller.Application', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            main: 'mainview',
            selection: 'selectionscreen',
            selectionBtn: 'selectionscreen button',
            table: 'tablegrid touchgridpanel',
            gridFilterBox: 'tablegrid searchfield'
        },

        control: {
            selectionBtn: {
               tap: 'onSelection'
            },
            main: {
                pop: 'onMainPop'
            },
            table: {
                itemtap: 'onGridItemTap',
                sort: 'onGridSort'
            },
            gridFilterBox: {
                clearicontap: 'onGridFilterClearIconTap',
                keyup: 'onGridFilterKeyUp'
            }
        },
        routes: {
            '': 'showSelectionScreen',
            '/:tbl': 'showTableData'
        }
    },
    onSelection: function() {
        var values = this.getSelection().getValues();
        this.redirectTo('/' + values.table);
    },
    showTableData: function(tbl) {
        // maybe cache this view?
        var baseUrl = '/sap/bc/bsp/sap/ymwdataview/table/' + tbl;
        Ext.Ajax.request({
            url: baseUrl + '/meta', // not safe, but good enough for now
            scope: this,
            success: function(response){
                var o = Ext.JSON.decode(response.responseText);
                var columns = o.data.headers;
//                 var data = o.data.values;
                var config = {
                    columns: columns,
//                     data: data,
                    url: baseUrl
                };
                this.tableGrid = Ext.create('cogni.view.TableGrid', config);
                this.getMain().push(this.tableGrid);
            }
        });
    },
    showSelectionScreen: function() {
        this.getMain().setActiveItem(this.getSelection());
    },
    onMainPop: function(view, item) {
        var history = this.getApplication().getHistory();
        if (item.xtype == "tablegrid") {
            history.add(new Ext.app.Action({
                url: ''
            }), true);
        }
    },
    onGridItemTap: function(view, item) {
        console.log(item);
        console.log(view.getSelection());
    },
    onGridFilterKeyUp: function(field) {
        //get the store and the value of the field
        var table = this.getTable(),
            value = field.getValue(),
            store = table.getStore();

        //first clear any current filters on the store
        store.clearFilter();

        //check if a value is set first, as if it isnt we dont have to do anything
        if (value) {
            store.filter('ALL', value);
            store.load();
        }
    },
    onGridFilterClearIconTap: function() {
        var table = this.getTable(),
            store = table.getStore();
        store.clearFilter();
        store.load();
    },
    onGridSort: function() { 
        this.getTable().getStore().load();
    }
});
