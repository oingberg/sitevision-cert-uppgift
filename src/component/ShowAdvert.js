define(function(require) {
    'use strict';
    
    var
    _           = require('underscore'),
    Component   = require('Component'),
    $           = require('jquery'),
    store      = require('store'),
    constant   = require('/module/client/constants'),
    template    = require('/template/showAdvert'),
    ReportModal = require('/component/ReportModal');;
 
    return Component.extend({

        template: template,

        events: {
            dom: {
               'click [data-report-advert]': 'showReportModal' 
            },
        },

        addReportModal: function() {
            var reportModal = new ReportModal({advertDsid: null});
            reportModal.render().$el.insertAfter($('.ws-advertising__advert'));
        },

        showReportModal: function(e) {
            store.dispatch({
                type: constant.ADVERT_DSID,
                advertDsid: e.target.value
            });
            $('#report-modal').envDialog('show');
        },

        onRendered: function() {
            this.addReportModal();
        },

        onDestroy: function() {
            $('#report-modal').remove();
        },

        filterState: function(state) {
            return _.extend({}, {
                user: state.user,
                advert: state.advert,
                standardImage: state.standardImage
            });
        }
    });
 });