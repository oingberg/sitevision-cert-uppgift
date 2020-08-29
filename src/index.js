(function() {
   'use strict';

   const router  = require('router');
   const appData = require('appData');
   const resourceLocatorUtil = require('ResourceLocatorUtil');
   const propertyUtil = require('PropertyUtil');
   const portletContextUtil = require('PortletContextUtil');
   
   const dataStoreProvider = require('/module/server/dataStoreProvider');

   let standardImageObj = null;

   if (appData.get('showStandardImage')) {
      const getStandardImageNode = resourceLocatorUtil.getNodeByIdentifier(appData.get('standardImage'));
      const standardImage = {
         src: propertyUtil.getString(getStandardImageNode, 'URL'),
         alt: propertyUtil.getString(getStandardImageNode, 'alt')
      }

      standardImageObj = standardImage;
   };

   const user = portletContextUtil.getCurrentUser();
   const userId = propertyUtil.getString(user, 'jcr:uuid');

   router.get('/', (req, res) => {
      const renderObj = {
         user: { id: userId },
         adverts: dataStoreProvider.getAllAdverts(),
         standardImage: standardImageObj
      };

      res.render('/', renderObj);
   });

   router.get('/advert', (req, res) => {
      const renderObj = {
         advert: dataStoreProvider.getAdvert(req.params.dsid),
         standardImage: standardImageObj
      };

      res.render('/advert', renderObj);
   });

   router.get('/userAdverts', (req, res) => {
      const renderObj = {
         user: { id: userId },
         adverts: dataStoreProvider.searchAdverts(userId),
         standardImage: standardImageObj
      };

      res.render('/userAdverts', renderObj);
   });

   router.get('/addAdvert', (req, res) => {
      res.render('/addAdvert');
   });

   router.post('/addAdvert', (req, res) => {
      const advert = {
         userId,
         title: req.params.title,
         shortDescription: req.params.shortDescription,
         description: req.params.description,
         username: propertyUtil.getString(user, 'name'),
         phonenumber: propertyUtil.getString(user, 'mobil').length > 0 ? propertyUtil.getString(user, 'mobil') : propertyUtil.getString(user, 'telephoneNumber'),
         email: propertyUtil.getString(user, 'mail')
      };

      dataStoreProvider.addAdvert(advert);

      res.redirect('/');
   });

   router.get('/editAdvert', (req, res) => {
      const renderObj = {
         advert: {
            dsid: req.params.dsid,
            title: req.params.title,
            shortDescription: req.params.shortDescription,
            description: req.params.description,
         }
      };

      res.render('/editAdvert', renderObj);
   });

   router.post('/editAdvert', (req, res) => {
      let advert = {
         title: req.params.title,
         shortDescription: req.params.shortDescription,
         description: req.params.description,
      }

      if (req.params.img.length > 0) {
         advert = { ...advert, imageSrc: req.params.img }
      }

      dataStoreProvider.editAdvert(req.params.dsid, advert);

      const renderObj = {
         adverts: dataStoreProvider.searchAdverts(userId),
         standardImage: standardImageObj
      };

      res.render('/userAdverts', renderObj);
   });

   router.post('/removeAdvert', (req, res) => {
      var dsid = req.params.dsid;

      dataStoreProvider.removeAdvert(dsid);

      const renderObj = {
         adverts: dataStoreProvider.searchAdverts(userId),
         standardImage: standardImageObj
      };

      res.render('/userAdverts', renderObj);
   });
}());