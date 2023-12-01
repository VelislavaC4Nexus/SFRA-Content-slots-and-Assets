'use strict';

/**
 * @namespace Product
 */

var server = require('server');
server.extend(module.superModule);

/**
 * @typedef ProductDetailPageResourceMap
 * @type Object
 * @property {String} global_availability - Localized string for "Availability"
 * @property {String} label_instock - Localized string for "In Stock"
 * @property {String} global_availability - Localized string for "This item is currently not
 *     available"
 * @property {String} info_selectforstock - Localized string for "Select Styles for Availability"
 */

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
        var produtWithAllattr = ProductMgr.getProduct(viewData.product.id);
        var productShippingInformation = produtWithAllattr.custom.v_shipping_information ? produtWithAllattr.custom.v_shipping_information : null;
        var productRefinementColor = produtWithAllattr.custom.refinementColor ? produtWithAllattr.custom.refinementColor.displayValue : null;
        var assetBody = assetContent.custom.body.markup;
        assetBody = assetBody.replace("{uuid}", produtWithAllattr.UUID);
        assetBody = assetBody.replace("{refinementColor}", productShippingInformation);
        assetBody = assetBody.replace("{shippingInformation}", productRefinementColor);
        viewData.assetBody = assetBody;
    }
    res.setViewData(viewData);
    next();
});

module.exports = server.exports();
