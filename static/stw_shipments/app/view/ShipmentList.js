Ext.define('Shipments.view.ShipmentList', {
    extend: 'Ext.dataview.List',
    xtype: 'shiplist',
    initialize: function(opts) {
        var searchbox = this.child('toolbar searchfield');
        searchbox.on({
            scope: this,
            clearicontap: this.onSearchClearIconTap,
            keyup: this.onSearchKeyUp
        });
        this.callParent();
    },
    config: {
        title: 'Shipment List',
        iconCls: 'star',

        itemTpl: '<h3>{title}</h3>{description}',
        disclosure: true,
        //set the function when a user taps on a disclsoure icon
        onItemDisclosure: function(rec, item, index, e) {
            //show a messagebox alert which shows the persons firstName
            e.stopEvent();
            this.fireEvent('itemdisclosure', rec, item);
        },
        store: 'ShipmentList',
        items: [{
            xtype: 'toolbar',
            docked: 'top',

            items: [
                { xtype: 'spacer' },
                {
                    xtype: 'searchfield',
                    placeHolder: 'Search...'
                },
                { xtype: 'spacer' }
            ]
        }]
    },
        /**
     * Called when the search field has a keyup event.
     *
     * This will filter the store based on the fields content.
     */
    onSearchKeyUp: function(field) {
        //get the store and the value of the field
        var value = field.getValue(),
            store = this.getStore();

        //first clear any current filters on thes tore
        store.clearFilter();

        //check if a value is set first, as if it isnt we dont have to do anything
        if (value) {
            //the user could have entered spaces, so we must split them so we can loop through them all
            var searches = value.split(' '),
                regexps = [],
                i;

            //loop them all
            for (i = 0; i < searches.length; i++) {
                //if it is nothing, continue
                if (!searches[i]) continue;

                //if found, create a new regular expression which is case insenstive
                regexps.push(new RegExp(searches[i], 'i'));
            }

            //now filter the store by passing a method
            //the passed method will be called for each record in the store
            store.filter(function(record) {
                var matched = [];

                //loop through each of the regular expressions
                for (i = 0; i < regexps.length; i++) {
                    var search = regexps[i],
                        didMatch = record.get('title').match(search) || record.get('description').match(search);

                    //if it matched the first or last name, push it into the matches array
                    matched.push(didMatch);
                }

                //if nothing was found, return false (dont so in the store)
                if (regexps.length > 1 && matched.indexOf(false) != -1) {
                    return false;
                } else {
                    //else true true (show in the store)
                    return matched[0];
                }
            });
        }
    },

    /**
     * Called when the user taps on the clear icon in the search field.
     * It simply removes the filter form the store
     */
    onSearchClearIconTap: function() {
        //call the clearFilter method on the store instance
        this.getStore().clearFilter();
    }
});

