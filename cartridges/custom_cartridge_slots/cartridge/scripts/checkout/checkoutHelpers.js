'use strict';

var server = require('server');
var base = module.superModule;

var Order = require('dw/order/Order');
var Resource = require('dw/web/Resource');
var Site = require('dw/system/Site');

// static functions needed for Checkout Controller logic

/**
 * Sends a confirmation to the current user
 * @param {dw.order.Order} order - The current user's order
 * @param {string} locale - the current request's locale id
 * @returns {void}
 */
base.sendConfirmationEmail = function (order, locale) {
    var OrderModel = require('*/cartridge/models/order');
    var emailHelpers = require('*/cartridge/scripts/helpers/emailHelpers');
    var Locale = require('dw/util/Locale');
    var currentLocale = Locale.getLocale(locale);
    var orderModel = new OrderModel(order, { countryCode: currentLocale.country, containerView: 'order' });
    var exclusiveProductHelpers = require('../helpers/exclusiveProductsHelpers');
    
    var orderObject = { 
        order: orderModel,
        allExclusiveProductIds: exclusiveProductHelpers.getAllExclusiveProductIds()
     };

    var emailObj = {
        to: order.customerEmail,
        subject: Resource.msg('subject.order.confirmation.email', 'order', null),
        from: Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@testorganization.com',
        type: emailHelpers.emailTypes.orderConfirmation
    };

    emailHelpers.sendEmail(emailObj, 'checkout/confirmation/confirmationEmail', orderObject);
}

module.exports = base;
