// 'use strict';
// var URLUtils = require('dw/web/URLUtils');
// var base = module.superModule;

// /**
//  * Send an email that would notify the user that account was created
//  * @param {obj} registeredUser - object that contains user's email address and name information.
//  */
// base.sendCreateAccountEmail = function (registeredUser) {
//     var emailHelpers = require('*/cartridge/scripts/helpers/emailHelpers');
//     var Site = require('dw/system/Site');
//     var Resource = require('dw/web/Resource');
//     var exclusiveProductHelpers = require('./exclusiveProductsHelpers');

//     var userObject = {
//         email: registeredUser.email,
//         firstName: registeredUser.firstName,
//         lastName: registeredUser.lastName,
//         url: URLUtils.https('Login-Show'),
//         allExclusiveProductIds: exclusiveProductHelpers.getAllExclusiveProductIds()
//     };

//     var emailObj = {
//         to: registeredUser.email,
//         subject: Resource.msg('email.subject.new.registration', 'registration', null),
//         from: Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@testorganization.com',
//         type: emailHelpers.emailTypes.registration
//     };

//     emailHelpers.sendEmail(
//         emailObj,
//         'checkout/confirmation/accountRegisteredEmail',
//         userObject
//     );
// }

// module.exports = base;

'use strict';
var URLUtils = require('dw/web/URLUtils');
var base = module.superModule;

/**
 * Send an email that would notify the user that account was created
 * @param {obj} registeredUser - object that contains user's email address and name information.
 */
function sendCreateAccountEmail(registeredUser) {
    var emailHelpers = require('*/cartridge/scripts/helpers/emailHelpers');
    var Site = require('dw/system/Site');
    var Resource = require('dw/web/Resource');
    // var context = require('*/cartridge/scripts/helpers/exclusiveProductHelpers');
    var exclusiveProductsIDs = require('./exclusiveProductHelpers');
    
    var userObject = {
        email: registeredUser.email,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
        // context: context.getExclusiveProduct(),
        exclusiveProductsIDs: exclusiveProductsIDs.getExclusiveProducts(),
        url: URLUtils.https('Login-Show')
    };

    var emailObj = {
        to: registeredUser.email,
        subject: Resource.msg('email.subject.new.registration', 'registration', null),
        from: Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@testorganization.com',
        type: emailHelpers.emailTypes.registration
    };

    emailHelpers.sendEmail(emailObj, 'checkout/confirmation/accountRegisteredEmail', userObject);
}

base.sendCreateAccountEmail = sendCreateAccountEmail;
module.exports = base;

