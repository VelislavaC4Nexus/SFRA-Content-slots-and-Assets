"use strict";

function getAllExclusiveProductIds() {
    var ContentMgr = require('dw/content/ContentMgr');
    var exclusiveProductsAsset = ContentMgr.getContent('v_exclusive_products_asset');

    var allExclusiveProductIds = null;
    if (exclusiveProductsAsset && exclusiveProductsAsset.online) {
        allExclusiveProductIds = exclusiveProductsAsset.custom.body.markup.split(',');
    }

    return allExclusiveProductIds;
}

module.exports = {
    getAllExclusiveProductIds: getAllExclusiveProductIds
}