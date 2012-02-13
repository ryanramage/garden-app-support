var session = require('session');
var gravatar = require('gravatar');



function getGravatar(userCtx, size) {
    if (!size) size = 16

    return gravatar.avatarURL({
        email : userCtx.userCtx.name,
        size : size,
        default_image : 'mm'
    });
}



function createGardenNav($, settings) {
    var url = bestDashboardURL(settings.pathname);
    var login = bestLoginURL(settings.pathname);

    var template = $('<div id="garden-nav"><a  href="' + url + '" class="help home-icon"  title="Garden Dashboard" ></a><a href="' + login + '" class="user"><div class="name">Sign In</div> <img src="static/css/img/mm.jpg" /></a></div>');
    var home = template.find('a.home-icon');
    var user = template.find('a.user');
    var name = user.find('div.name');
    var img  = user.find('img');

    template.appendTo('body');

    // adjust based on nav height

    template.height(settings.navBarHeight);

    home.height(settings.navBarHeight);
    var bgPos = (settings.navBarHeight / 2) - 8;
    home.css('background-position', '10px ' +  bgPos +  'px');

    user.height(settings.navBarHeight);

    var pdtop = Math.floor( (settings.navBarHeight - 13) / 2 ) - 1;
    name.css('padding-top', pdtop + 'px');

    var imgtop = Math.floor( (settings.navBarHeight - 12) / 2 ) - 1;
    img.css('padding-top', pdtop + 'px');
}



function createProfilePopover($, userCtx, settings) {
    console.log('create profile');
    var gravatar_url = getGravatar(userCtx, 96);
    var template = $('<div id="garden-profile"><img src="'+ gravatar_url +'"/> <div class="info"><h4>'+ userCtx.userCtx.name +'</h4><ul><li><a href="#">Profile</a></li><li><a href="#">Logout</a></li></ul></div></div>');

    template.appendTo('body');
    // adjust based on nav height
    var top = settings.navBarHeight - 1;
    template.css('top',  top + 'px');

}






function bestDashboardURL(pathname) {
    var url = "/dashboard/_design/dashboard/_rewrite/";
    if (inGardenRewriteMode(pathname)) {
        url = "/#/dashboard";
    }
    return url;
}

function bestLoginURL(pathname) {

    var redirect = encodeURIComponent(pathname);

    var url = "/dashboard/_design/dashboard/_rewrite/#/login/redirect/" + redirect;
    if (inGardenRewriteMode(pathname)) {
        url = "/#/login/redirect/" + redirect;
    }
    return url;
}


var user_click = function() {
    var user_a = $(this);
    user_a.addClass('show');
    $('#garden-profile').show();
    return false;
}


function inGardenRewriteMode(pathname) {
    if (pathname.indexOf('_rewrite') >= 0) return false;
    return true;
}

function addUserCtx($, userCtx, settings) {
    if (userCtx.userCtx.name) {
        var gravatarURL = getGravatar(userCtx, 16);
        var img = $('#garden-nav .user img');

        img.attr('src', gravatarURL).show();

        var link = img.closest('a');
        link.attr('href', '#')
            .click(user_click);

        $('#garden-nav .user .name').hide();
        var gardenProfile = $('#garden-profile');
        if (gardenProfile.length == 0) {
            createProfilePopover($, userCtx, settings);
        }
    }


}



exports.navMenu = function($, options) {

    var settings = {
        navBarHeight : 40
    }

    if (window && window.location) {
        settings.pathname = window.location.pathname;
    }

    $.extend( settings, options );

    // check for existance
    var gardenNav = $('#garden-nav');
    if (gardenNav.length == 0) {
        createGardenNav($, settings);
    }
    session.info(function(err, userCtx) {
        addUserCtx($, userCtx, settings);

    })



}