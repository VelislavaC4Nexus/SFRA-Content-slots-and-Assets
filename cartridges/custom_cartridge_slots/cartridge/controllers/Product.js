'use strict';

/**
 * @namespace Product
 */

var server = require('server');
server.extend(module.superModule);

/**
* Product-Show : This endpoint is called to show the details of the selected product
* @name Base/Product-Show
* @function
* @memberof Product
* @param {middleware} - cache.applyPromotionSensitiveCache
* @param {middleware} - consentTracking.consent
* @param {querystringparameter} - pid - Product ID
* @param {category} - non-sensitive
* @param {renders} - isml
* @param {serverfunction} - get
*/
server.append('Show', function (req, res, next) {
    var ContentMgr = require('dw/content/ContentMgr');
    var assetContent = ContentMgr.getContent('v_uniqueInfo_belowCartBtn_asset');
    if (assetContent && assetContent.online) {
        var viewData = res.getViewData();
        var ProductMgr = require("dw/catalog/ProductMgr");
        var ProductFactory = require("*/cartridge/scripts/factories/product");

        var productWithAllattr = ProductMgr.getProduct(viewData.product.id);
        var productShippingInformation = productWithAllattr.custom.v_shipping_information ? productWithAllattr.custom.v_shipping_information : null;
        var productRefinementColor = productWithAllattr.custom.refinementColor ? productWithAllattr.custom.refinementColor.displayValue : null;
        var assetBody = assetContent.custom.body.markup;
        assetBody = assetBody.replace("{uuid}", productWithAllattr.UUID);
        assetBody = assetBody.replace("{refinementColor}", productRefinementColor);
        assetBody = assetBody.replace("{shippingInformation}", productShippingInformation);
        viewData.assetBody = assetBody;
    }
    res.setViewData(viewData);
    next();
});

module.exports = server.exports();
