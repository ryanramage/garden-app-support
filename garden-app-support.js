(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory(require('jquery'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquer'], factory);
    } else {
        // Browser globals
        root.returnExports = factory(root.$);
    }
}(this, function ($) {

    var exports = {}

    /**
     * Callback when the topbar has loaded.
     */
    exports.on_topbar = function(/* optional*/ timeout, callback) {
        if (isFunction(timeout)) {
            callback = timeout;
            timeout = 1000;
        }
        if ($('#dashboard-topbar').data('ready')) {
            return callback();
        }
        var has_returned = false;
        var on_complete = function(err) {
            if (!has_returned) {
                 has_returned = true;
                 callback(err);
             }
        }
        setTimeout(function() {
            on_complete('Timeout waiting for the topbar');
        }, timeout);

        $('#dashboard-topbar').live('ready', on_complete);

    }


    /**
     *
     *
     * @param after_login_url and optional url you want the user to be redirected to after they login. If omitted
     * the user will be returned to the current url
     */
    exports.get_login_url = function(/* optional*/ after_login_url, callback) {
        if (isFunction(after_login_url)) {
            callback = after_login_url;
            after_login_url = window.location;
        }
        exports.on_topbar(function(err){
            if (err) return callback(err);
            callback($('#dashboard-topbar-session').data('login') + '?redirect=' + encodeURIComponent(after_login_url));
        })


    }


    exports.get_user_ctx = function() {
        exports.on_topbar(function(err){
            if (err) return callback(err);
            return JSON.parse(decodeURI($('#dashboard-topbar-session').data('userctx')));
        })
    }



    /**
     * There are times you want to be able to link to something, but you dont know where it will be.
     * For example on a graph you may have a legend with things like 'zeptotrophic'. Lets say you want to be able to
     * link to a definition of that word. So use this method like so
     *
     * garden.create_redirect_url('about', 'zeptotrophic');
     *
     * and use the result url as a link. The admin of the garden then can decide where the link should go. Maybe to something like
     * /wiki/zeptotrophic
     *
     * Create a redirect url that can be mapped by a dashboard admin to the proper place.
     *
     * @name createRedirectUrl
     * @param {String} category - A category like, wiki used to define the general place you want the url to go
     * @param {String} id - An identifier for the resource in the category, like 'London_Bridge'
     * @returns {String} - A url.
     * @api public
     */

    exports.create_redirect_url = function(category, id){
        return '/dashboard/_design/dashboard/_rewrite/redirect/' + category + '/' + id;
    }

    return exports;


    function isFunction(obj) {
       return toString.call(obj) == '[object Function]';
     };

}));




exports.addActivityEntry = function(user, actionText, actionUrl, kanso_db_instance, callback) {
    try {
        var entry = {
            date : new Date.getTime(),
            user : user,
            actionText : actionText,
            actionUrl : actionUrl,
            type : 'garden.app.activity'
        }
        kanso_db_instance.saveDoc(entry, callback);

    } catch(e){
        callback(e);
    }
}

