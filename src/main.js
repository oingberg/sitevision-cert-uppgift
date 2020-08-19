define(function(require) {
   'use strict';

   var
      _          = require('underscore'),
      Component  = require('Component'),
      template   = require('/template/main'),
      templateAdvert = require('/template/advert'),
      templateUserAdverts = require('/template/userAdverts'),
      templateAddAdverts = require('/template/addAdvert'),
      templateEditAdvert = require('/template/editAdvert');

   return Component.extend({

      getTemplate: function() {
         if (this.state.route === '/advert') {
            return templateAdvert;
         } else if (this.state.route === '/userAdverts') {
            return templateUserAdverts;
         } else if (this.state.route === '/addAdvert') {
            return templateAddAdverts;
         } else if (this.state.route === '/editAdvert') {
            return templateEditAdvert;
         }

         return template;
      },

      filterState: function(state) {
         return _.extend({}, {
            route: state.route
         });
      }
   });
});