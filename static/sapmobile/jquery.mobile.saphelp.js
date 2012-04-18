/*
 * Sources:
 * JQuerymobile.datebox
 * http://www.hiddentao.com/archives/2011/11/07/how-to-write-a-custom-widget-for-jquery-mobile/
 * http://wiki.jqueryui.com/w/page/12138135/Widget%20factory
 * 
 */
(function( $, undefined ) {
    $.widget( "mobile.saphelp", $.mobile.widget /* optional - an existing widget prototype to inherit from */, /* An object literal to become the widget's prototype*/ {
    closed: false,
        /** Available options for the widget are specified here, along with default values. */
    options: {
      resultField: "name",
      disabled: false, // needed?
      baseUrl: "/sapmobile/sh/"
    },
    _saphelpHandler: function(event, payload) {
        // Handle all event triggers that have an internal effect
        
        if ( ! event.isPropagationStopped() ) {
            switch (payload.method) {
                case 'open':
                    $(this).jqmData('saphelp').open();
                    break;
                case 'close':
                    $(this).jqmData('saphelp').close(payload.fromCloseButton);
                    break;
                case 'set':
                    $(this).val(payload.value);
                    $(this).trigger('change');
                    break;
                case 'search':
                    $(this).jqmData('saphelp').search(payload.value);
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
    _buildUrl: function(page) {
      return this.options.baseUrl + page;
    },
    // call the server to get the search help metadata and build the search help form
    // execute the callback after the form initialization
    _initForm: function() {
      var self = this;
      var searchhelpname = this.options.searchHelp;
      $.mobile.showPageLoadingMsg();
      $.ajax({
        url: this._buildUrl('fields'),
        data: { sh: searchhelpname },
        context: this.formPage.children(":jqmData(role='content')").first(),
        dataType: "xml",
        success: function(data) {
          var page = '',
          xmldoc = $(data);
          page += '<form data-role="sapsearchhelpform">';
          page += '<input type="hidden" name="sh" value="' + searchhelpname + '">';
          xmldoc.find('field').each( function(index) {
            var description = $(this).text(),
            name = $(this).attr('name'),
            datatype = $(this).attr('datatype');
            //FIXME logic for different data types
            page += '<label for="' + name + '">' + description + '</label>';
            page += '<input type="text" name="' + name + '">';
          });
          page += '</form>';
          page += '<a href="#searchhelp" id="help-result-button" data-role="button" data-inline="false">Search</a>';
          $(this).html(page);
          self.formPage.page();
          $(this).children(':jqmData(role="sapsearchhelpform")').submit( function(e) {
            e.preventDefault();
            var shFormData = $(this).serialize();
            self.inputElement.trigger('saphelp', {'method':'search', 'value': shFormData});
            return false;
          });
          $(this).find("a").each(function() {
            $(this).bind('vclick', function(e) {
               $(this).parent().children(':jqmData(role="sapsearchhelpform")').submit();
               return false;
            });
          });
          self.formInit = true;
          $.mobile.hidePageLoadingMsg();
          $.mobile.changePage(self.formPage, {'transition': self.transition});
        },
        error: function() {
    		  $.mobile.hidePageLoadingMsg();
    		}
      });      
    },
    open: function() {
        // prevent the parent page from being removed from the DOM,
        this.thisPage.unbind( "pagehide.remove" );
        var self = this;
        self.closed = false;
        if ( this.formInit ) {
          $.mobile.changePage(self.formPage, {'transition': this.transition});          
        } else { 
          this._initForm();
        }
    },
    search: function(value) {
        var transition = 'pop';
        // Let's use a dialog
        // TODO prevent the form page from being removed from the DOM?
        // this.thisPage.unbind( "pagehide.remove" );
        var self=this;
        var searchResultsEl = this.listPage.children(":jqmData(role='content')").first();
        searchResultsEl.empty();
        $.mobile.showPageLoadingMsg();
        $.ajax({
          url: this._buildUrl('search'),
          data: value,
          dataType: "xml",
          context: searchResultsEl,
          error: function() {
              $.mobile.hidePageLoadingMsg();
          },
          success: function(data){
            var xmldoc;
            var resultTable = $('<table class="ui-mobile-saphelp"></table>');
            var resultsExist = false;
            xmldoc = $(data);
            // header row
                xmldoc.find('searchhelp result').each( function(index) {
                // primeira linha (index=0) - header
                if (index == 0) {
                    resultsExist = true;
                    var header = $('<thead></thead>');
                    var headerRow = $('<tr></tr>');
                    $(this).children().each( function() {
                        var th = $('<th></th>').text($(this).attr('title'));
                        headerRow.append(th);
                    });
                    header.append(headerRow);
                    resultTable.append(header);
                }
            });
            if (resultsExist) {
            // data
            var tblBody = $('<tbody></tbody>');
            xmldoc.find('result').each( function(index) {
                var resultText = $(this).find(self.options.resultField).text();
                // TODO exception if not found
                var resRow = $('<tr></tr>',  {class: 'ui-btn ui-btn-up-a', 'data-result': resultText, 'data-theme': 'a'});
                $(this).children().each( function() {
                    var resData = $('<td></td>').text($(this).text());
                    resRow.append(resData);
                });
                tblBody.append(resRow);
            });
            resultTable.append(tblBody);
            $(this).append(resultTable);
            } else {
                $(this).append("<p>No results found</p>");
            }
          $.mobile.hidePageLoadingMsg();
          $.mobile.changePage(self.listPage, {'transition': transition});
          $(this).find("td").each(function() {
            $(this).bind('vclick', function(e) {
                e.preventDefault();
                self.inputElement.trigger('saphelp', {'method':'set', 'value': $(this).parent().attr('data-result')});
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
                //dialog('close') só faz um history back
                if (!self.closed) {
                    window.history.go(-2);
                }
            }
            if( !self.thisPage.data("page").options.domCache ){
                self.thisPage.bind( "pagehide.remove", function() {
                    $(self).remove();
                });
            }
        self.focusedEl.removeClass('ui-focus');
        // FIXME callBack - precisamos?
        if ( self.options.closeCallback !== false ) { callback = new Function(self.options.closeCallback); callback(undefined, self); }
        self.closed = true;
    },
    /** Mandatory method - automatically called by jQuery Mobile to initialise the widget. */
    _create: function() {
      $(document).trigger("saphelpcreate");
      var self = this;
      var inputElement = this.element;
      var transition = 'pop';
      // control when the search help form is initialized
      var formInit = false; 
      var opts = $.extend(this.options, inputElement.jqmData("options"));
      var thisPage = inputElement.closest('.ui-page');
      var thisTheme = 'c';
      var focusedEl = inputElement.wrap('<div class="ui-input-saphelp ui-input-datebox ui-shadow-inset ui-corner-all ui-body-'+ thisTheme +'"></div>').parent();
      var helpBtn = $('<a href="#" class="ui-input-clear ui-saphelp" title="search help">search help</a>')
                .bind('vclick', function (e) {
                    e.preventDefault();
                    if ( !opts.disabled ) { self.inputElement.trigger('saphelp', {'method': 'open'}); }
                    setTimeout( function() { $(e.target).closest("a").removeClass($.mobile.activeBtnClass); }, 300);
                })
                .buttonMarkup({icon: 'saphelp', iconpos: 'notext', corners:true, shadow:true})
                .css({'vertical-align': 'middle', 'float': 'right'});
      // the formPage is kept unitialized and the page() will be called in the first open call
      var formPage = $("<div id='formPage' data-role='dialog' class='ui-dialog-datebox' data-theme='a'>" + 
                            "<div data-role='header' data-backbtn='false' data-theme='a'>" +
                                "<div class='ui-title'>Search Help</div>" +
                            "</div>" +
                        "<div data-role='content'></div>" +
                        "</div>")
                    .appendTo( $.mobile.pageContainer );
                   // .page(); //.css('minHeight', '0px').css('zIndex', o.zindex).addClass(o.transition),
      var listPage = $("<div data-role='dialog' class='ui-dialog-datebox' data-theme='a'>" +
                            "<div data-role='header' data-backbtn='false' data-theme='a'>" +
                                "<div class='ui-title'>Search Help</div>" +
                            "</div>" + 
                            "<div data-role='content'></div>" +
                        "</div>").appendTo( $.mobile.pageContainer )
                    .page();
     

      inputElement.after(helpBtn);
     inputElement.bind('saphelp', this._saphelpHandler);
     inputElement
            .removeClass('ui-corner-all ui-shadow-inset')
            .focus(function(){
                if ( ! opts.disabled ) {
                    focusedEl.addClass('ui-focus');
//                     if ( opts.noButtonFocusMode ) { focusedEl.addClass('ui-focus'); input.trigger('datebox', {'method': 'open'}); }
                }
                inputElement.removeClass('ui-focus');
            })
            .blur(function(){
                focusedEl.removeClass('ui-focus');
                inputElement.removeClass('ui-focus');
            })
            .change(function() {
                self._update();
            });
     $.extend(this, {
            thisPage: thisPage,
            transition: transition,
            formInit: formInit,
            inputElement: inputElement,
            listPage: listPage,
            focusedEl: focusedEl,
            formPage: formPage,
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

})( jQuery );
