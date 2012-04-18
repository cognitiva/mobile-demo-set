Ext.define('Shipments.model.ShipmentDetail', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
           'carrier',
           'route',
           'checkin',
           'load_start',
           'load_end',
           'complete',
           'start',
           'end',
           'checkin_d',
           'load_start_d',
           'load_end_d',
           'complete_d',
           'start_d',
           'end_d',
           'checkin_t',
           'load_start_t',
           'load_end_t',
           'complete_t',
           'start_t',
           'end_t',
           'log'
        ],
        proxy: {
            type: 'ajax',
            url: 'd.json',
            reader: {
                type: 'json',
            }
        }
    }
});

