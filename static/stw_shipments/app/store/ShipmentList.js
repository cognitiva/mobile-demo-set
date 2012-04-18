Ext.define('Shipments.store.ShipmentList', {
    extend: 'Ext.data.Store',

    config: {
        model: 'Shipments.model.ShipmentSummary',
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 's.json',
            reader: {
                type: 'json',
                rootProperty: 'shipments'
            }
        }
    }
});
