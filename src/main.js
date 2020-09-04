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
         switch (this.state.route) {
            case '/advert':
               return templateAdvert;
            case  '/userAdverts':
               return templateUserAdverts;
            case '/addAdvert':
               return templateAddAdverts;
            case '/addAdvertSuccess':
               return templateSuccessAdvert;
            case '/editAdvert':
               return templateEditAdvert;
            case '/editAdvertSuccess':
               return templateEditAdvertSuccess;
            default:
               return template;
         }
      },

      filterState: function(state) {
         return _.extend({}, {
            route: state.route
         });
      }
   });
});