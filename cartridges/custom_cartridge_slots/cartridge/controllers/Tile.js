'use strict';

/**
 * @namespace Tile
 */

var server = require('server');
server.extend(module.superModule);

/**
 * Tile-Show : Used to return data for rendering a product tile
 * @name Base/Tile-Show
 * @function
 * @memberof Tile
 * @param {middleware} - cache.applyPromotionSensitiveCache
 * @param {querystringparameter} - pid - the Product ID
 * @param {querystringparameter} - ratings - boolean to determine if the reviews should be shown in the tile
 * @param {querystringparameter} - swatches - boolean to determine if the swatches should be shown in the tile
 * @param {querystringparameter} - pview - string to determine if the product factory returns a model for a tile or a pdp/quickview display
 * @param {querystringparameter} - quantity - Quantity
 * @param {querystringparameter} - dwvar_<pid>_color - Color Attribute ID
 * @param {querystringparameter} - dwvar_<pid>_size - Size Attribute ID
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.append('Show', function (req, res, next) {
    var viewData = res.getViewData();
    var ProductMgr = require("dw/catalog/ProductMgr");
    var produtWithAllattr = ProductMgr.getProduct(viewData.product.id);
    viewData.product.shortDescription = produtWithAllattr.shortDescription.markup;
    res.setViewData(viewData);
    next();
});

module.exports = server.exports();