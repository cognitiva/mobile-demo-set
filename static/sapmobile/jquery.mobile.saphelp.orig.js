/*
 * Sources:
 * JQuerymobile.datebox
 * http://www.hiddentao.com/archives/2011/11/07/how-to-write-a-custom-widget-for-jquery-mobile/
 * http://wiki.jqueryui.com/w/page/12138135/Widget%20factory
 * 
 */
(function( $, undefined ) {
    $.widget( "mobile.saphelp", $.mobile.widget /* optional - an existing widget prototype to inherit from */, /* An object literal to become the widget's prototype*/ {
        /** Available options for the widget are specified here, along with default values. */
    options: {
      mode: "default",
    },
    _saphelpHandler: function(event, payload) {
        // Handle all event triggers that have an internal effect
        
        if ( ! event.isPropagationStopped() ) {
            switch (payload.method) {
                case 'open':
                    $(this).jqmData('saphelp').open();
                    break;
                case 'close':
                    console.log("close");
                    $(this).jqmData('saphelp').close(payload.fromCloseButton);
                    break;
                case 'set':
                    console.log("set");
                    $(this).val(payload.value);
                    $(this).trigger('change');
                    break;
//                 case 'doset':
//                     if ( $(this).data('datebox').options.mode === 'timebox' || $(this).data('datebox').options.mode === 'durationbox' ) {
//                         $(this).trigger('datebox', {'method':'set', 'value':$(this).data('datebox')._formatTime($(this).data('datebox').theDate)});
//                     } else {
//                         $(this).trigger('datebox', {'method':'set', 'value':$(this).data('datebox')._formatDate($(this).data('datebox').theDate)});
//                     }
//                 case 'dooffset':
//                     $(this).data('datebox')._offset(payload.type, payload.amount, true);
//                     break;
//                 case 'dorefresh':
//                     $(this).data('datebox')._update();
//                     break;
//                 case 'doreset':
//                     $(this).data('datebox').hardreset();
//                     break;
            }
        } 
    },
    open: function() {
        console.log('open');
        var transition = 'pop';
        // Let's use a dialog
        // prevent the parent page from being removed from the DOM,
        this.thisPage.unbind( "pagehide.remove" );
//         o.useDialog = true;
//         self.pickPageContent.append(self.pickerContent);
//         self.pickerContent.css({'top': 'auto', 'left': 'auto', 'marginLeft': 'auto', 'marginRight': 'auto'}).removeClass('ui-overlay-shadow ui-datebox-hidden');
        $.mobile.changePage(this.pickPage, {'transition': transition});
        //talvez usar o loadpage para ele correr as cenas do mobile
        var self=this;
        $.ajax({
          url: "helpform.html",
          dataType: "html",
          context: this.pickPage.children(":jqmData(role='content')").first(),
          success: function(data){
            $(this).html(data);
            var helpInput = $(this).children("input").first();
            $(this).children("a").each(function() {
                $(this).bind('vclick', function(e) {
                    e.preventDefault();
                    self.inputElement.trigger('saphelp', {'method':'set', 'value': $(helpInput).val()});
                    self.inputElement.trigger('saphelp', {'method':'close'});
                })
                });
          }
        });
    },
    close: function(fromCloseButton) {
        // Close the controls
        var self = this,
            callback;

        
            if (!fromCloseButton) {
                $(self.pickPage).dialog('close');
            }
            if( !self.thisPage.data("page").options.domCache ){
                self.thisPage.bind( "pagehide.remove", function() {
                    $(self).remove();
                });
            }
//             self.pickerContent.addClass('ui-datebox-hidden').removeAttr('style').css('zIndex', self.options.zindex);
//             self.thisPage.append(self.pickerContent);
//         self.focusedEl.removeClass('ui-focus');
        
        if ( self.options.closeCallback !== false ) { callback = new Function(self.options.closeCallback); callback(self.theDate, self); }
    },
    /** Mandatory method - automatically called by jQuery Mobile to initialise the widget. */
    _create: function() {
      $(document).trigger("saphelpcreate");
      var inputElement = this.element;
      var opts = $.extend(this.options, inputElement.jqmData("options"));
      var thisPage = inputElement.closest('.ui-page');
      var helpBtn = $("<button>HELP!!!</button>");
      inputElement.after(helpBtn);
      helpBtn.bind('vclick', function (e) {
              console.log('XXX');
                    e.preventDefault();
                    if ( !opts.disabled ) { inputElement.trigger('saphelp', {'method': 'open'}); }
//                     setTimeout( function() { $(e.target).closest("a").removeClass($.mobile.activeBtnClass); }, 300);
                })
     inputElement.bind('saphelp', this._saphelpHandler);
     
     $.extend(this, {
            thisPage: thisPage,
            inputElement: inputElement,
            pickPage: $("#xpto"), // TODO generate this dinamically
/*            
            pickPage: pickPage,
            pickPageContent: pickPageContent,
            pickPageTitle: pickPageTitle,
            focusedEl: focusedEl,*/
        });
    },
    /** Custom method to handle updates. */
    _update: function() {
      var inputElement = this.element;
      var opts = $.extend(this.options, inputElement.jqmData("options"));
      $(document).trigger("saphelpupdate");

//       inputElement.siblings("button").text(inputElement.val());
        // FIXME
//       
    },
    /* Externally callable method to force a refresh of the widget. */
    refresh: function() {
      return this._update();
    }
    } );
    /* Handler which initialises all widget instances during page creation. */
      $(document).bind("pagecreate", function(e) {
        $(document).trigger("saphelpbeforecreate");
        return $(":jqmData(role='saphelp')", e.target).saphelp();
      });
//   $.fn.myPlugin = function() {
//   
//     // Do your awesome plugin stuff here
// 
//   };
})( jQuery );
