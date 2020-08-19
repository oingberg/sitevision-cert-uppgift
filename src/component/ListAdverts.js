define(function(require) {
    'use strict';
    
    var
    _           = require('underscore'),
    Component   = require('Component'),
    template    = require('/template/listAdverts');
 
    return Component.extend({

        template: template,

        filterState: function(state) {
            return _.extend({}, {
                user: {
                    id: state.user.id
                },
                adverts: state.adverts,
                standardImage: state.standardImage
            });
        }
    });
 });