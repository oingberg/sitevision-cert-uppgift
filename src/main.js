define(function(require) {
   'use strict';

   var
      _          = require('underscore'),
      Component  = require('Component'),
      template   = require('/template/main'),
      templateAdvert = require('/template/advert'),
      templateUserAdverts = require('/template/userAdverts'),
      templateAddAdverts = require('/template/addAdvert'),
      templateSuccessAdvert = require('/template/addAdvertSuccess'),
      templateEditAdvert = require('/template/editAdvert'),
      templateEditAdvertSuccess = require('/template/editAdvertSuccess');

   return Component.extend({

      getTemplate: function() {
         if (this.state.route === '/advert') {
            return templateAdvert;
         } else if (this.state.route === '/userAdverts') {
            return templateUserAdverts;
         } else if (this.state.route === '/addAdvert') {
            return templateAddAdverts;
         } else if (this.state.route === '/addAdvertSuccess') {
            return templateSuccessAdvert;
         } else if (this.state.route === '/editAdvert') {
            return templateEditAdvert;
         } else if (this.state.route === '/editAdvertSuccess') {
            return templateEditAdvertSuccess;
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