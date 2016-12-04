sap.ui.define([
    "leverx/sap/gnatyk/Map/controller/BaseController",
    'jquery.sap.global',
    'sap/ui/model/json/JSONModel'
], function(BaseController,jQuery,JSONModel) {
    "use strict";

    return BaseController.extend("leverx.sap.gnatyk.Map.controller.SupplierMode", {


        onInit: function () {
            this.getView().byId("map_canvas").addStyleClass("myMap");
            this.getView().byId("supplierInfoForm").bindElement({
                path: "/Products('HT-1000')/Supplier"
            });
         },

        onItemSelected: function(oEvent){
            var selectedItem = oEvent.getParameters().selectedItem;
            var context = selectedItem.getBindingContext();
            var supplierId = context.getObject().SupplierId;
            this.getView().byId("supplierInfoForm").bindElement({
                path: "/Suppliers('" + supplierId + "')"
            });
            this.showAddressOnMap();
        },

        onAfterRendering: function () {
            if (!this.initialized) {
                this.initialized = true;
                this.geocoder = new google.maps.Geocoder();
                var mapOptions = {
                    center: new google.maps.LatLng(53.9, 27.56),
                    zoom: 8,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                this.map = new google.maps.Map(this.getView().byId("map_canvas").getDomRef(),
                    mapOptions);
            }
        },

        showAddressOnMap: function () {
            var address = this.getView().byId('addressField').getProperty('text');
            var self = this;
            this.geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    self.map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: self.map,
                        position: results[0].geometry.location
                    });
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        },
    });


    return PageController;

});
