Ext.define('signeGeoportal.view.Map', {
    // Ext.panel.Panel-specific options:
    extend: 'Ext.panel.Panel',
    alias : 'widget.map',
    requires: [
		'Ext.container.Viewport',
		'Ext.layout.container.Border',
		'GeoExt.tree.Panel',
		'Ext.tree.plugin.TreeViewDragDrop',
		'GeoExt.panel.Map',
		'GeoExt.panel.PrintMap',
		'GeoExt.tree.OverlayLayerContainer',
		'GeoExt.tree.BaseLayerContainer',
		'GeoExt.data.LayerTreeModel',
		'GeoExt.tree.View',
		'GeoExt.container.WmsLegend',
		'GeoExt.tree.Column',
		'GeoExt.data.MapfishPrintProvider',
		'GeoExt.data.PrintPage',
		'GeoExt.panel.Legend',
		'GeoExt.container.WmsLegend',
		'GeoExt.container.UrlLegend',
		'GeoExt.container.VectorLegend',
		'GeoExt.slider.LayerOpacity',
		'GeoExt.slider.Tip',
        'GeoExt.plugins.PrintExtent',
		// We need to require this class, even though it is used by Ext.EventObjectImpl
		// see: http://www.sencha.com/forum/showthread.php?262124-Missed-(-)-dependency-reference-to-a-Ext.util.Point-in-Ext.EventObjectImpl
		'Ext.util.Point'
    ],
    id: 'Map',
	border: 'false',
    layout: 'fit',
    region: 'center',
	//anchor: '100% 100%',
	//zoom: 7,
	//setCenter: (new OpenLayers.LonLat(-10029760,1779651), 7),
    initComponent: function() {
        var me = this,
		items = [],
		ctrl;
	
		
		printProvider = Ext.create('GeoExt.data.MapfishPrintProvider', {
			method: "GET", // "POST" recommended for production use
			// provide url instead for lazy loading
			capabilities: printCapabilities,
			customParams: {
			mapTitle: "Titulo",
			comment: "Comentario"
			}
		});

		
		printPage = Ext.create('GeoExt.data.PrintPage', {
			printProvider: printProvider
		});
		
		var map = new OpenLayers.Map({
			projection: new OpenLayers.Projection("EPSG:900913"),
			resolutions:[39135.7584765625,19567.8792382813,9783.93961914063,4891.96980957031,2445.98490478516,1222.99245239258,611.496226196289,305.748113098145,152.874056549072,76.4370282745361,38.2185141372681,19.109257068634,9.55462853431702,4.77731426715851,2.38865713357925,1.19432856678963,0.597164283394815],
			displayProjection: new OpenLayers.Projection("EPSG:900913"),
			units: 'm', 
			allOverlays: true,
			maxExtent : new OpenLayers.Bounds(-20037508.34, -20037508.34, 20037508.34, 20037508.34),
			//restrictedExtent : new OpenLayers.Bounds(-10303710, 1480018,-9775377,2137988),//10580107,   1521600,  -9452508,   2130650),
			// define la resolución máxima del mapa*/
			controls: []	
		});

		/*map.addControl(new OpenLayers.Control.PanZoomBar({
                                                        position: new OpenLayers.Pixel(2, 15)
                                        }));*/
		
		map.addControl(new OpenLayers.Control.MousePosition({
                                                        position: new OpenLayers.Pixel(50, 0),
														displayProjection: new OpenLayers.Projection("EPSG:4326")
                                        }));		
		//map.addControl(new OpenLayers.Control.LayerSwitcher());		
		map.addControl(new OpenLayers.Control.PanZoomBar());   // la linea de zoom
		map.addControl(new OpenLayers.Control.Navigation());	//
		map.addControl(new OpenLayers.Control.ScaleLine());     // la linea de escala
		
		var gmap = new OpenLayers.Layer.Google(
			"Google Streets", // the default
			{numZoomLevels: 20, isBaseLayer: true}
		);
	
    	var gphy = new OpenLayers.Layer.Google(
			"Google Physical",
			{type: google.maps.MapTypeId.TERRAIN, isBaseLayer: true, visibility: false}
		);
			   

		var ghyb = new OpenLayers.Layer.Google(
			"Google Hybrid",
			{type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20, isBaseLayer: true, visibility: false}
		);
    
		
		// note that first layer must be visible
		map.addLayers([gmap,gphy,ghyb]);
			
			
		signeGeoportal.xMap = Ext.create('GeoExt.MapPanel', {
			region: "center",
			map: map,
			zoom:7,
			center: new OpenLayers.LonLat(-10048800, 1785400)
			});
						
		items.push(signeGeoportal.xMap);
		
	Ext.apply(me, {
          items: items
			});
		me.callParent(arguments);
	}
});


