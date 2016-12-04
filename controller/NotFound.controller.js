sap.ui.define([
    "leverx/sap/gnatyk/Map/controller/BaseController"
], function(BaseController) {
    "use strict";

    return BaseController.extend("leverx.sap.gnatyk.Map.controller.NotFound", {

        /**
         * Navigates to the worklist when the link is pressed
         * @public
         */
        onLinkPressed: function() {
            this.getRouter().navTo("table");
        }

    });

});