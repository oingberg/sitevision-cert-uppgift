define(function(require) {
    'use strict';
 
    var ListComponent = require('ListComponent');
    var _ = require('underscore');
 
    return ListComponent.extend({
 
       tagName: 'li',
 
       childProperty: 'adverts',
 
       childComponentPath: 'AdvertItem',
       
       filterState: function(state) {
          return _.extend({}, {
              adverts: state.adverts
        });
       }
    });
 });	