sap.ui.require(
    [
        "leverx/sap/gnatyk/Map/model/formatter",
        "sap/ui/thirdparty/sinon",
        "sap/ui/thirdparty/sinon-qunit"
    ],
    function (formatter) {
        "use strict";
        QUnit.module("Formatting functions",{
            setup: function(){

            },
            teardown: function(){

            }
        });
        QUnit.test("Should check string to float casting", function(assert){
            var fnFormatter = formatter.Value;
            assert.strictEqual(fnFormatter("3.5"), 3.5, "Correct");
            assert.strictEqual(fnFormatter("7.5"), 7.5, "Correct");
            assert.strictEqual(fnFormatter("3.5"), "3.5", "Correct");
            assert.strictEqual(fnFormatter("3.5"), 6.5, "Correct");
        });
    }
)