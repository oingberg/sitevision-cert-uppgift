define(function(require) {
    'use strict';
 
    var
    _      = require('underscore'),
    constant   = require('/module/client/constants');

    var reducer = function(state, action) {
       switch (action.type) {
          case constant.ADVERT_DSID:
             return _.extend({}, state, { advertDsid: action.advertDsid });
          default:
             return state;
       }
    }

    return reducer;
 });