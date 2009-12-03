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

var bespin = require("bespin");

SC.mixin(exports, {
    /**
     * Center Popup
     */
    showCenterPopup: function(el, isModal) {
        if (isModal) {
            this.showOverlay();
        }
        el.style.display = "block";

        // retrieve required dimensions
        var elDims = dojo.coords(el);
        var browserDims = dijit.getViewport();

        // calculate the center of the page using the browser and element dimensions
        var y = (browserDims.h - elDims.h) / 2;
        var x = (browserDims.w - elDims.w) / 2;

        // set the style of the element so it is centered
        el.style.position = "absolute";
        el.style.top = y + "px";
        el.style.left = x + "px";
    },

    hideCenterPopup: function(el) {
        el.style.display = "none";
        this.hideOverlay();
    },

    showOverlay: function() {
        document.getElementById('overlay').style.display = "block";
    },

    hideOverlay: function() {
        document.getElementById('overlay').style.display = "none";
    },

    /**
     * Take the overlay and make sure it stretches on the entire height of the
     * screen
     */
    fillScreenOverlay: function() {
        var coords = dojo.coords(document.body);

        if (coords.h) {
            document.getElementById('overlay').style.height = coords.h + "px";
        }
    },

    /**
     * Status
     */
    showStatus: function(msg) {
        document.getElementById("status").innerHTML = msg;
        document.getElementById('status').style.display = "block";
    },

    /**
     * showContentOverlay displays the center screen overlay with a scrolling
     * pane for content.
     */
    showContentOverlay: function(msg, options) {
        options = options || {};
        var el = document.getElementById('centerpopup');
        var addTags = "";
        var endTags = "";

        if (options.pre) {
            addTags = addTags + "<pre>";
            endTags = "</pre>" + endTags;
        }

        el.innerHTML = "<div style='background-color: #fff; border: 1px solid #000; height: 100%; overflow: auto'>" + addTags + msg + endTags + "</div>";
        oldwidth = el.style.width;
        oldheight = el.style.height;
        el.style.width = "80%";
        el.style.height = "80%";

        exports.showCenterPopup(el);

        var connection = dojo.connect(el, "onclick", function() {
            exports.hideCenterPopup(el);
            el.style.width = oldwidth;
            el.style.height = oldheight;
            dojo.disconnect(connection);
        });
    }
});
