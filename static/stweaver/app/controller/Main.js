Ext.define('stweaver.controller.Main', {
    extend: 'Ext.app.Controller',
    
    config: {
        control: {
            'launcher #applistpage': {
                itemtap: 'openUrl'
            }
        }
    },
    
    openUrl: function(list, index, target, record) {
        var url = record.get('url');
        window.location.href = url;
    },
    
});