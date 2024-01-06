'use strict';
var Resource = require("dw/web/Resource");
var ContentMgr = require("dw/content/ContentMgr");

module.exports = function (object, product) {

    var contentAsset = ContentMgr.getContent(`v_uniqueInfo_belowCartBtn_asset`);
    if (contentAsset && contentAsset.online) {
        var shippingInfo;
        var shippingInfoFromCustomAttribute = product.custom.v_shipping_information;
        if (shippingInfoFromCustomAttribute) {
            var contentAssetContent = contentAsset.custom.body.markup;
            shippingInfo = contentAssetContent.replace("{shippingInformation}", shippingInfoFromCustomAttribute)
        }
    }
    Object.defineProperty(object, 'shippingUniqueInformation', {
        enumerable: true,
        value: shippingInfo ? shippingInfo : null
    });

}
