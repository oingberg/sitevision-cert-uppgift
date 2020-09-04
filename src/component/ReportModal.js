define(function(require) {
    'use strict';
    
    var
        _          = require('underscore'),
        $          = require('jquery'),
        router     = require('router'),
        requester  = require('requester'),
        Component  = require('Component'),
        template   = require('/template/reportModal');
    
    return Component.extend({
        template: template,

        events: {
            dom: {
                'click [data-report-button]': 'reportAdvert'
             },
            self: {
                'state:changed': 'render'
            },
            store: 'handleStoreUpdate'
        },

        onRendered: function() {
            $('.report-success').hide();
            $('.report-fail').hide();
            $('.report-wrapper').show();
        },

        reportAdvert: function() {
            requester.doPost({
                url: router.getUrl('/reportAdvert'),
                data: {
                    dsid: this.state.advertDsid,
                    description: $('#description').val(),
                },
                context: this
            }).done(function(response) {
                $('.report-wrapper').hide();
                $('.report-success').show();
            }).fail(function(response) {
                $('.report-wrapper').hide();
                $('.report-fail').show();
            });
        },

        handleStoreUpdate: function(newState) {
            this.setState(newState);
        },

        filterState: function(state) {
            return _.extend({}, {
                advertDsid: state.advertDsid
            });
        }
    });
 });