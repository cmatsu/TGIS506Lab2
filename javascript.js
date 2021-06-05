require([
	"esri/views/MapView",
	"esri/widgets/Legend",
	"esri/WebMap",
	"esri/widgets/ScaleBar",
	"esri/widgets/LayerList"
],
function(
	MapView,
	Legend,
	WebMap,
	ScaleBar,
	LayerList
) {
	var webmap = new WebMap({
		portalItem: { // autocasts as new PortalItem()
			id: "e36243ea18bd4c18b762d7af2a736b9f"
		}
	});

	var view = new MapView({
		container: "viewDiv",
		map: webmap
	});



	view.when(function() {
		// get the first layer in the collection of operational layers in the WebMap
		// when the resources in the MapView have loaded.
		var featureLayer = webmap.layers.getItemAt(0);
		var legend = new Legend({
			view: view
		});

		// Add widget to the bottom right corner of the view
		view.ui.add(legend, "top-right");
	});
	const scalebar = new ScaleBar({
		view: view
	});

	view.ui.add(scalebar, "bottom-left");


	view.when(function() {
		var layerList = new LayerList({
			view: view,

		});
		const facilities = webmap.allLayers.find(function(layer) {
		 return layer.title === "Critical facilities";
		});
		facilities.listMode = "hide";
		const roads = webmap.allLayers.find(function(layer) {
		 return layer.title === "Major roads";
		});
		roads.listMode = "hide";
		const water = webmap.allLayers.find(function(layer) {
		 return layer.title === "Surface water";
		});
		water.listMode = "hide";
		const bounds = webmap.allLayers.find(function(layer) {
		 return layer.title === "City bounds";
		});
		bounds.listMode = "hide";

		// Add widget to the top right corner of the view
		view.ui.add(layerList, "top-right");
	});
});
