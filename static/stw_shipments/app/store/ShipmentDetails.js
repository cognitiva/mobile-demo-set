Ext.define('Shipments.store.ShipmentDetails', {
    extend: 'Ext.data.Store',

    config: {
        model: 'Shipments.model.ShipmentDetail',
        proxy: {
            type: 'ajax',
            url: 'd.json',
            reader: {
                type: 'json',
                rootProperty: 'shipments'
            }
        }
    }
});
