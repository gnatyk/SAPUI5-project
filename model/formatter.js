sap.ui.define([

], function() {
    "use strict";
    var valueFormatter = {
            Value: function(value) {
            return parseFloat(value);
        }
    };
    return valueFormatter;
});