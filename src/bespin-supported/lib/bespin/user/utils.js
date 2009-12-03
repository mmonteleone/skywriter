/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1
 *
 * The contents of this file are subject to the Mozilla Public License
 * Version 1.1 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied.
 * See the License for the specific language governing rights and
 * limitations under the License.
 *
 * The Original Code is Bespin.
 *
 * The Initial Developer of the Original Code is Mozilla.
 * Portions created by the Initial Developer are Copyright (C) 2009
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Bespin Team (bespin@mozilla.com)
 *
 * ***** END LICENSE BLOCK ***** */

var bespin    = require("bespin");
var webpieces = require("bespin/util/webpieces");
var register  = require("bespin/user/register");

/**
 * Utility functions for the Bespin front page
 * Dealing with login on the front page of the site and beyond
 */
SC.mixin(exports, {
    whenLoginSucceeded: function() {
        // TODO: something else
        // navigate.editor();
    },

    whenLoginFailed: function(xhr) {
        webpieces.showStatus("Sorry, login didn't work. Try again? Caps lock on? (" + xhr.responseText + ")");
    },

    whenServerBusted: function(xhr) {
        webpieces.showStatus("The Bespin server is not responding right now.");
    },

    whenUsernameInUse: function(xhr) {
        document.getElementById("register_register_error").innerHTML = "The username is taken. Please choose another.";
        register.showForm();
    },

    whenUserinfoBad: function(xhr) {
        document.getElementById("register_register_error").innerHTML = xhr.responseText;
        register.showForm();
    },

    whenAlreadyLoggedIn: function(userinfo) {
        document.getElementById('display_username').innerHTML = userinfo.username;
        document.getElementById('logged_in').style.display = "block";
    },

    whenNotAlreadyLoggedIn: function() {
        document.getElementById('not_logged_in').style.display = "block";
    },

    /**
     * make sure that the browser can do our wicked shizzle
     */
    checkBrowserAbility: function() {
        if (typeof document.getElementById('testcanvas').getContext != "function") {
            return false; // no canvas
        }

        var ctx = document.getElementById('testcanvas').getContext("2d");

        if (ctx.fillText || ctx.mozDrawText) {
            return true; // you need text support my friend
        } else {
            return false;
        }
    },

    showingBrowserCompatScreen: function() {
       if (!this.checkBrowserAbility()) {
            // if you don't have the ability
            webpieces.showCenterPopup(document.getElementById('browser_not_compat'), true);
            return true;
        } else {
            return false;
        }
    },

    validateEmail: function(str) {
        var filter=/^([\w-+_]+(?:\.[\w-+_]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return filter.test(str);
    },

    validatePassword: function(str) {
        return (str.length > 5) && (str.length < 21);
    }
});
