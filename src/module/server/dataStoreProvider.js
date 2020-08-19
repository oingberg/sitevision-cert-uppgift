define(function(require) {
    'use strict';
 
    var
       storage = require('storage'),
       logUtil = require('LogUtil'),
       dataStore = storage.getCollectionDataStore('advertsStore');
    
    return {
       getAllAdverts: function() {
        var result = dataStore.find('*', 100);
        
        try {
            var data = result.toArray();

            return data;
        } catch(e) {
            this.logError(e);
        }
       },

       getAdvert: function(dsid) {
            try {
                var advert = dataStore.get(dsid);

                return advert;
            } catch (e) {
                logUtil.error(e);
            }
       },

       searchAdverts: function(condition) {
            var query = 'ds.analyzed.userId:' + condition + '*',
                result = dataStore.find(query, 100);

            try {
                var data = result.toArray();
                return data;
            } catch(e) {
                this.logError(e);
            }
        
       },

       addAdvert: function(advert) {
            try {
                var updatedAdvert = dataStore.add(advert);

                dataStore.instantIndex(updatedAdvert.dsid);
            } catch (e) {
                this.logError(e);
            }
       },

       editAdvert: function(dsid, advert) {
           try {
               var updatedAdvert = dataStore.set(dsid, advert);

               dataStore.instantIndex(updatedAdvert.dsid);
           } catch (e) {
                this.logError(e);
           }
       },

       removeAdvert: function(dsid) {
            try {
                var data = dataStore.remove(dsid);

                dataStore.instantIndex(data.dsid);

                return data;
            } catch(e) {
                this.logError(e);
            }
       },
       
       logError: function(e) {
           logUtil.error(e);
       }
    };
 });