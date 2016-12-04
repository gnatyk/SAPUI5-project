sap.ui.core.Control.extend("leverx.sap.gnatyk.Map.controls.Map", {


    metadata : {
    },
    renderer: function (oRm, oControl) {
        oRm.write(' <VBox fitContainer="true" justifyContent="Center" alignItems="Center"> ');
        oRm.write(' <HBox id="map_canvas" fitContainer="true" justifyContent="Center" alignItems="Center" /> ');
        oRm.write(" </VBox>");
    },

});