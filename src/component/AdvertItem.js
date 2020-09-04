define(function(require) {
    'use strict';
 
    var
       Component      = require('Component'),
       template  = require('/template/advertItem'),
       _ = require('underscore');
 
    return Component.extend({
       template: template,

        filterState: function(state) {
            return _.extend({}, {
                dsid: state.dsid,
                title: state.title,
                shortDescription: state.shortDescription,
                price: state.price,
                standardImage: state.standardImage
            });
        }
    });
 });