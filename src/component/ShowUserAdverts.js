define(function(require) {
    'use strict';
    
    var
    _           = require('underscore'),
    $          = require('jquery'),
    store      = require('store'),
    Component   = require('Component'),
    constant   = require('/module/client/constants'),
    template    = require('/template/showUserAdverts'),
    RemoveModal = require('/component/RemoveModal');
 
    return Component.extend({

        template: template,

        events: {
            dom: {
               'click [data-remove-advert]': 'showRemoveModal' 
            },
        },

        addRemoveModal: function() {
            var removeModal = new RemoveModal({advertDsid: null});
            removeModal.render().$el.insertAfter($('.ws-advertising__list'));
        },

        showRemoveModal: function(e) {
            store.dispatch({
                type: constant.ADVERT_DSID,
                advertDsid: e.target.value
            });
            $('#remove-modal').envDialog('show');
        },

        onRendered: function() {
            this.addRemoveModal();
        },

        onDestroy: function() {
            $('#remove-modal').remove();
        },

        filterState: function(state) {
            return _.extend({}, {
                maxAmountOfAdverts: state.maxAmountOfAdverts,
                adverts: state.adverts,
                standardImage: state.standardImage
            });
        }
    });
 });