Ext.require([
    'Ext.ux.touch.grid.View',
    'Ext.ux.touch.grid.feature.Feature',
    'Ext.ux.touch.grid.feature.Paging',
    'Ext.ux.touch.grid.feature.Editable',
    'Ext.ux.touch.grid.feature.Sorter',
    'Ext.field.Search'
]);

Ext.define('cogni.view.TableGrid', {
    extend: 'Ext.Container',
    xtype: 'tablegrid',
    constructor: function(config) {
        var self=this;
        this.callParent(arguments);
        var gridConfig = this.getGridConfig();
        gridConfig.columns = this.buildColumns(config.columns);
        var model = this.createModel(gridConfig.columns);
        gridConfig.store = {
            model: model,
            pageSize: 10,
            proxy: {
                type: 'ajax',
                url : this.getUrl(),
                reader: {
                    type: 'json',
                    rootProperty: 'values'
                },
                simpleSortMode: true
            },
            autoLoad: true,
            remoteSort: true, //If this is set to true, you will have to manually call the load method after you sort, to retrieve the sorted data from the server.
            remoteFilter: true
        };
        var g = Ext.create('Ext.ux.touch.grid.View', gridConfig);
        this.add(g);

        // Trying to calculate the width based on the loaded data
        g.onBefore('refresh', function() {
            // fixWidth - updates the witdh definitions based on the data to display
            self.fixWidth(this.getColumns(), this.getStore().getData());
            // updates the grid's total width
            g.setWidth(g._buildWidth());
            // the component builds the item template in the "magic" methods applyItemTpl/updateItemTpl
            // http://www.sencha.com/forum/showthread.php?171113-Difference-between-update-and-apply-magic-methods
            // It seems to be building it twice
            // I don't like the way this works very much, but it works.
            g.setItemTpl(false);
        });
    },

    config: {
        fullscreen : true,
        scrollable : 'horizontal',
        layout     : {
            type : 'hbox'
        },
        charWidth: 15,
        maxColWidth: 200,
        gridConfig: {
            flex: 1,
            calcWidth: true,
            features   : [
                {
                    ftype    : 'Ext.ux.touch.grid.feature.Sorter',
                    launchFn : 'initialize'
                },
                {
                    ftype    : 'Ext.ux.touch.grid.feature.Paging',
                    launchFn : 'initialize'
                },
                {
                    ftype    : 'Ext.ux.touch.grid.feature.Editable',
                    launchFn : 'initialize'
                }
            ],
        },
        items: [{
            xtype: 'toolbar',
            docked: 'top',

            items: [
                { xtype: 'spacer' },
                {
                    xtype: 'searchfield',
                    placeHolder: 'Filter...'
                },
                { xtype: 'spacer' }
            ]
        }],
        url: undefined
    },
    fixWidth: function(columns, values) {
        var widths = {},
            headers = [];
        for (var i=0; i<values.length; i++) {
            var row = values.items[i];
            for (var j in row.data) {
                var w = row.data[j].length;
                if (w > (widths[j] || 0)) {
                    widths[j] = w;
                }
            }
        }
        for (var i=0; i<columns.length; i++) {
            var w = widths[columns[i].dataIndex]*this.getCharWidth();
            columns[i].width = (w > this.getMaxColWidth()) ? this.getMaxColWidth() : w;
        }
    },
    buildColumns: function(columns) {
        var headers = [];
        for (var i=0; i<columns.length; i++) {
            var h = {}
            var w = 10; //widths[columns[i]]*this.getCharWidth();
            h.width = (w > this.getMaxColWidth()) ? this.getMaxColWidth() : w;
            h.editor = {
                xtype : 'textfield'
            };
            h.header = h.dataIndex = columns[i];
            headers.push(h);
        }
        return headers;
    },
    createModel: function(columns) {
        var modelDef = [];
        Ext.each(columns, function(c) {modelDef.push(c.header)});
        // cache models and give meaningful name
        var mymodel = Ext.define('Cogni.model.model1', {
            extend: 'Ext.data.Model',
            config: {
                fields : modelDef,
            }
        });
        return 'Cogni.model.model1';
    }
});
