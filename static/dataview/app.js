//<debug>
Ext.Loader.setPath({
    'Ext': '../sdk/src',
    'Ext.ux.touch.grid': './Ext.ux.touch.grid/Ext.ux.touch.grid'
});
//</debug>

Ext.application({
    name: 'cogni',

    requires: [
        'Ext.MessageBox','Ext.form.FieldSet'
    ],

    views: ['Main', 'Selection', 'TableGrid'],
    controllers: ['Application'],

    icon: {
        57: 'resources/icons/Icon.png',
        72: 'resources/icons/Icon~ipad.png',
        114: 'resources/icons/Icon@2x.png',
        144: 'resources/icons/Icon~ipad@2x.png'
    },

    phoneStartupScreen: 'resources/loading/Homescreen.jpg',
    tabletStartupScreen: 'resources/loading/Homescreen~ipad.jpg',

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('cogni.view.Main'));
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function() {
                window.location.reload();
            }
        );
    }
});
