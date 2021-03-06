sap.ui.define([
    'jquery.sap.global',
    "leverx/sap/gnatyk/Map/controller/BaseController",
    'sap/ui/model/json/JSONModel'
], function(jQuery,BaseController,JSONModel) {
    "use strict";

    return BaseController.extend("leverx.sap.gnatyk.Map.controller.SupplierDetails", {

        onInit: function () {
            this.getRouter().getRoute("supplierDetails").attachPatternMatched(this._onObjectMatched, this);
        },

        handleLinkObjectAttributePress : function (oEvent) {
            sap.m.URLHelper.redirect("http://www.sap.com", true);
        },

        _onObjectMatched: function(oEvent){
            var sProductId = oEvent.getParameter("arguments").Id;
            this.getView().bindElement({
                path: "/Products('" + sProductId + "')",
                events: {
                    change: this._onBindingChange.bind(this)
                }
            });
            this.getView().byId("supplierDetailsForm").bindElement({
                path: "/Products('" + sProductId + "')/Supplier",
                events: {
                    change: this._onBindingChange.bind(this)
                }
            });
        },

        _onBindingChange: function(){
            var oView = this.getView(),
                oElementBinding = oView.getElementBinding();

            // No data for the binding
            if (!oElementBinding.getBoundContext()) {
                this.getRouter().getTargets().display("notFound");
                return;
            }
        },
    });
});


