Ext.define('Shipments.view.StatusItem', {
    extend: 'Ext.Container',
    xtype: 'statusitem',
    
    config: {
        layout: 'hbox',
        text: '', 
        
        items: [{
            title: 'date',
            html:'',
            styleHtmlContent: true,
            flex: 1
        },{
            title: 'time',
            html:'',
            styleHtmlContent: true,
            flex: 1
        },{
            xtype: 'button',
            flex: 1
        }]
        
    },
    
    setButtonChecked: function() {
        this.child('button').setUi('action');
    },
    
    setButtonUnchecked: function() {
        this.child('button').setUi('normal');
    },
    
    setDate: function(date) {
        this.child('container[title="date"]').setHtml(date);
    },
    
    setTime: function(time) {
        this.child('container[title="time"]').setHtml(time);
    },
    
    toggle: function(status, date, time) {
        if (!status) {
            this.setButtonUnchecked();
            this.setDate('&nbsp;'); // XXX temporary hack to keep the button height
            this.setTime('');
        } else {
            this.setDate(date);
            this.setTime(time);
            this.setButtonChecked();
        }
    },
    
    constructor: function() {
        this.callParent(arguments);
        var button = this.down('button');
        button.setText(this.getText());
        //XXX temporary hack to unchecked button with same height as checked buttons
        this.setDate('&nbsp;'); 
    }
});