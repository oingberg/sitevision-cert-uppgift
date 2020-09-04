(function() {
   'use strict';

   const router  = require('router');
   const appData = require('appData');
   const resourceLocatorUtil = require('ResourceLocatorUtil');
   const propertyUtil = require('PropertyUtil');
   const portletContextUtil = require('PortletContextUtil');
   const mailUtil = require('MailUtil');
   const mailBuilder = mailUtil.mailBuilder;

   const logUtil = require('LogUtil');
   
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

   const maxAmountOfAdverts = appData.get('maxAmountOfAdverts');

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
         user: { id: userId },
         advert: dataStoreProvider.getAdvert(req.params.dsid),
         standardImage: standardImageObj
      };

      res.render('/advert', renderObj);
   });

   router.post('/reportAdvert', (req, res) => {
      const advert = dataStoreProvider.getAdvert(req.params.dsid);
      const description = req.params.description;

      const mail = mailBuilder.setSubject('Annons reporterad:')
         .setTextMessage(`
            Beskriving på varför annons blev rapporterad:
            ${description}

            Annonsinformation:
            Annonsid: ${advert.dsid}
            Titel: ${advert.title}
            Kortbeskriving: ${advert.shortDescription}
            Beskriving: ${advert.description}
            Pris: ${advert.price}
            Namn på annonsutgivare: ${advert.username}
            id på annonsutgivare: ${advert.userId}
            Telefonnummer: ${advert.phonenumber}
            Epost: ${advert.email}
         `)
         .addRecipient(appData.get('email'))
         .build();

      if (mail.send()) {
         res.json({ mailSentStatus: true });
      } else {
         logUtil.error('Could not send report mail');
         res.json({ mailSentStatus: false });
      }
   });

   router.get('/userAdverts', (req, res) => {
      const renderObj = {
         user: { id: userId },
         maxAmountOfAdverts,
         adverts: dataStoreProvider.searchAdverts(userId),
         standardImage: standardImageObj
      };

      res.render('/userAdverts', renderObj);
   });

   router.get('/addAdvert', (req, res) => {
      const adverts = dataStoreProvider.searchAdverts(userId);

      const renderObj = {
         user: { id: userId },
         maxAmountOfAdverts,
         amountOfAdverts: adverts.length
      }

      res.render('/addAdvert', renderObj);
   });

   router.post('/addAdvert', (req, res) => {
      const advert = {
         userId,
         title: req.params.title,
         shortDescription: req.params.shortDescription,
         description: req.params.description,
         price: req.params.price,
         username: propertyUtil.getString(user, 'name'),
         phonenumber: propertyUtil.getString(user, 'mobil') && propertyUtil.getString(user, 'mobil').length > 0 ? propertyUtil.getString(user, 'mobil') : propertyUtil.getString(user, 'telephoneNumber'),
         email: propertyUtil.getString(user, 'mail')
      };

      dataStoreProvider.addAdvert(advert);

      res.render('/addAdvertSuccess');
   });

   router.get('/editAdvert', (req, res) => {
      const renderObj = {
         user: { id: userId },
         advert: {
            dsid: req.params.dsid,
            title: req.params.title,
            shortDescription: req.params.shortDescription,
            description: req.params.description,
            price: req.params.price
         }
      };

      res.render('/editAdvert', renderObj);
   });

   router.post('/editAdvert', (req, res) => {
      let advert = {
         title: req.params.title,
         shortDescription: req.params.shortDescription,
         description: req.params.description,
         price: req.params.price
      }

      dataStoreProvider.editAdvert(req.params.dsid, advert);

      res.render('/editAdvertSuccess');
   });

   router.post('/removeAdvert', (req, res) => {
      var dsid = req.params.dsid;

      dataStoreProvider.removeAdvert(dsid);

      const renderObj = {
         user: { id: userId },
         maxAmountOfAdverts,
         adverts: dataStoreProvider.searchAdverts(userId),
         standardImage: standardImageObj
      };

      res.render('/userAdverts', renderObj);
   });
}());