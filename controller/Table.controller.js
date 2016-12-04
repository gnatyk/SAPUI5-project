sap.ui.define([
    "leverx/sap/gnatyk/Map/controller/BaseController",
    'sap/m/Button',
    'sap/m/Dialog',
    'sap/m/Text',
    'jquery.sap.global',
    'sap/ui/model/json/JSONModel'

], function(BaseController,Button, Dialog, Text,jQuery,JSONModel) {
    "use strict";

    return BaseController.extend("leverx.sap.gnatyk.Map.controller.Table", {

        onInit : function () {
        },

        onAfterRendering: function () {

        },

        goToSupplierMode: function(oEvent){
            this.getRouter().navTo("supplierMode");
        },

        goToSupplierPage:function(oItem){
            this.getRouter().navTo("supplierDetails", {
                Id: oItem.getSource().getBindingContext().getProperty("Id")
            });
        },

        onPressAdd: function () {
            var self = this;
            var dialog = new Dialog({
                title: "New product",
                type: 'Message',
                content : [
                    new sap.m.Input({
                        type: "Text",
                        placeholder: "Id",
                        id: "idInput",
                        enabled: true
                    }),
                    new sap.m.Input({
                        type: "Text",
                        placeholder: "Product name",
                        id: "nameInput",
                        enabled: true
                    }),
                    new sap.m.Input({
                        type: "Text",
                        placeholder: "Supplier name",
                        id: "supplierInput",
                        enabled: true
                    }),
                    new sap.m.Input({
                        type: "Text",
                        placeholder: "Description",
                        id: "descriptionInput",
                        enabled: true
                    }),
                    new sap.m.Input({
                        type: "Text",
                        placeholder: "Price",
                        id: "priceInput",
                        enabled: true
                    }),
                    new sap.m.Input({
                        type: "Text",
                        placeholder: "Rating",
                        id: "ratingInput",
                        enabled: true
                    })
                ],
                beginButton: new Button({
                    text: 'Create',
                    press: function () {
                        self.onCreate();
                        dialog.close();
                    }
                }),
                endButton: new Button({
                    text: 'Exit',
                    press: function () {
                        dialog.close();}
                }),
                afterClose: function() {
                    dialog.destroy();             }
            });
            //Bind Context to dialog popup

            dialog.open();

        },

        onCreate: function () {
            var core = sap.ui.getCore();
            var id = core.byId('idInput').getValue();
            var name = core.byId('nameInput').getValue();
            var supplier = core.byId('supplierInput').getValue();
            var descr = core.byId('descriptionInput').getValue();
            var price = core.byId('priceInput').getValue();
            var rating = core.byId('ratingInput').getValue();

            var newEntry = new sap.m.ColumnListItem({
                cells: [

                    // Contents of the columns (1)
                    new sap.m.ObjectIdentifier({
                        title: name,
                        text: id
                    }),

                    // (2)
                    new sap.m.Text({
                        text: supplier
                    }),

                    new sap.m.Text({
                        text: descr
                    }),

                    new sap.m.Text({
                        text: price
                    }),

                    new sap.m.RatingIndicator({
                        maxValue: 5,
                        value : parseFloat(rating)
                    }),

                    new sap.m.Button({
                        text: "Reviews",
                        class: "sapUiSmallMarginBottom",
                        press: this.onShowListComment
                    })
                ]
            });
            this.getView().byId('table').addItem(newEntry);
        },

        onSelectionChange: function(){
            var oTable = this.getView().byId('table');
            var count = oTable.getSelectedItems().length;
            var btn = this.getView().byId('deleteBtn');
            if (count > 0){
                btn.setType('Emphasized');
            } else {
                btn.setType('Default');
            }
        },

        onPressDelete:function(oEvent) {
            var source = oEvent.getSource();
            var oTable = this.getView().byId('table');
            var selectedItems = oTable.getSelectedItems();
            for (var i = 0; i < selectedItems.length; i++){
                oTable.removeItem(selectedItems[i]);
            }
            var btn = this.getView().byId('deleteBtn');
            btn.setType('Default');
        },

        goToTestPage: function () {
            window.location.href = ("tests.html");
        },

        // Show Comments
        onShowListComment: function (oEvent) {
            var source = oEvent.getSource();
            var context = source.getBindingContext();
            var model = source.getModel();
            var productId = context.getObject().Id;
            var dialog = new Dialog({
                title: "Comments",
                type: 'Message',
                content : sap.ui.xmlview({
                    viewName: "leverx.sap.gnatyk.Map.view.ReviewItem",
                }),
                beginButton: new Button({
                    text: 'OK',
                    press: function () {
                        dialog.close();}
                }),
                afterClose: function() {
                    dialog.destroy();             }
            });
            dialog.setBindingContext(context);
            dialog.setModel(model);
            dialog.open();
        },
    });
});