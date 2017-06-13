/*
 * File: app.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

// @require @packageOverrides
Ext.Loader.setConfig({
    paths: {
        GeoExt: '../geoext2210/src/GeoExt'
    }
});


Ext.application({

    requires: [
        'Ext.Loader'
    ],
    models: [
        'modelParametro'
    ],
    stores: [
        'storeCatalogo',
        'storeParametro'
    ],
    views: [
        'Escritorio',
        'LegendPanel',
        'MapPanel',
        'Map',
        'ListaLayer',
        'InfoPanel',
        'ContentPanel',
        'VentanaParametro'
    ],
    controllers: [
        'controllerMapa'
    ],
    name: 'signeGeoportal',

    launch: function() {
        Ext.create('signeGeoportal.view.Escritorio');
        // Carga el listado de capas disponibles en el servidor

        var store = Ext.create('GeoExt.data.WmsCapabilitiesLayerStore', {
            storeId: 'wmscapsStore',
            //url: "http://190.85.233.223:8080/geoserver/siceg/wms?service=wms&version=1.1.1&request=GetCapabilities",
            url: "http://192.168.56.101:8282/geoserver/SIGE/wms?service=wms&version=1.1.1&request=GetCapabilities",
            autoLoad: true
        });


        var grid = Ext.ComponentQuery.query('listalayer')[0];

        grid.reconfigure(store);

        // Define y crea el panel de leyenda

        signeGeoportal.xLayerStore = Ext.create('Ext.data.TreeStore', {
            model: 'GeoExt.data.LayerTreeModel',
            root: {
                plugins: [{
                    ptype: "gx_overlaylayercontainer",
                    //ptype: "gx_layercontainer",
                    /*loader: {
                        createNode: function(attr) {
                            // add a WMS legend to each node created
                            attr.component = {
                                xtype: "gx_wmslegend",
                                layerRecord: signeGeoportal.xMap.layers.getByLayer(attr.layer),
                                showTitle: false,
                                // custom class for css positioning
                                // see tree-legend.html
                                cls: "legend"
                            };
                            return GeoExt.tree.LayerLoader.prototype.createNode.call(this, attr);
                        }
                    }*/
                }]
            }
        });

        //*** Este código añade al panel el arbol que contiene los layers
        var treeLayer = Ext.create('GeoExt.tree.Panel', {
            region: "center",
            autoScroll: true,
            id: 'treelayer',
            viewConfig: {
                plugins: [{
                    ptype: 'treeviewdragdrop',
                    appendOnly: false
                }]
            },
            store: signeGeoportal.xLayerStore,
            rootVisible: false,
            lines: false,
            listeners: {
                itemclick : function(view,rec,item,index,eventObj) {
                    layer = signeGeoportal.getApplication().obtenerLayer();
                    var slider = Ext.getCmp('slider');
                    slider.setValue(layer.opacity * 100);

                }
            }
        });

        var contentpanel = Ext.ComponentQuery.query('contentpanel')[0];
        contentpanel.add(treeLayer);

        /*var slider= new GeoExt.LayerOpacitySlider({
        					id:"opacity_slider",
        					aggressive:true,
        					vertical:false,
        					width:100,
        					value:70,
        					minValue:0,
        					maxValue:100,
        					plugins: new GeoExt.LayerOpacitySliderTip() ,
        					listeners:{change:function(slider,newValue,thumb) {
        											  var record = getRecordTree();
        											  if(record.layer)
        											     record.layer.setOpacity(newValue/100.0);
        											  }

        						  }
        					  });*/

        var slider = Ext.create('GeoExt.slider.LayerOpacity', {
            id:'slider',
            aggressive: true,
            width: '100%',
            inverse: true,
            fieldLabel: "Transparencia",
            value:80,
            plugins: Ext.create("GeoExt.slider.Tip", {
                getText: function(thumb) {
                    return Ext.String.format('Transparencia: {0}%', thumb.value);
                }
            }),
            listeners:{change:function(slider,newValue,thumb) {
                var layer = signeGeoportal.getApplication().obtenerLayer();
                //console.log(layer);
                if(layer)
                    layer.setOpacity(newValue/100.0);
            }
                      }
        });


        var legendtool = Ext.getCmp('tbSlider');
        legendtool.add(slider);
        //legendtool.doLayout();*/

        //*** Este código añade al panel el arbol que contiene la leyenda
        var legendLayer = Ext.create('GeoExt.panel.Legend',{
            region: "center",
            autoScroll: true,
            id: 'legendlayer',
            padding: '5 10 5 10',
            layerStore: signeGeoportal.xMap.layers
        });

        var legendpanel = Ext.ComponentQuery.query('legendpanel')[0];

        legendpanel.add(legendLayer);

        //console.log(signeGeoportal.xMap.map.layers);

        // Define y crea el panel de información
        signeGeoportal.xInfo = new OpenLayers.Control.WMSGetFeatureInfo({
            //    autoActivate: true,
            //infoFormat: "application/vnd.ogc.gml",
            //url: "http://192.168.56.101:8282/geoserver/SIGE/wms?SERVICE=WMS&",
            maxFeatures: 3,
            //    layers: [signeGeoportal.xMap.map.layers['3']],
            eventListeners: {

                //*** codigo original ***

                beforegetfeatureinfo: function(event) {


                    var retArray = [];
                    var vParams = [];
                    var layer;

                    for(var i=0;i<signeGeoportal.xMap.map.layers.length;i++)
                    {


                        layer = signeGeoportal.xMap.map.layers[i];
                        if (layer.params){
                            if (layer.params.VIEWPARAMS){
                                vParams.push(layer.params.VIEWPARAMS);
                            }
                            else{
                                vParams.push('x:0'); // just to have something. Number of params must equal number of layers
                            }
                            retArray.push(layer);
                        }
                    }

                    // put view parameters into a string
                    var viewparams = '';
                    for (i=vParams.length-1; i>=0; i--){
                        viewparams += vParams[i];
                        viewparams += (i>0)? ',' : '';
                    }

                    // add a buffer of 20 pixels around 'click' pluss the viewParams
                    this.vendorParams = (vParams.length > 0)? {'buffer':5, 'viewParams': viewparams} : {buffer:5};
                    // set the layers to be queried
                    this.layers = retArray;

                },
                "getfeatureinfo": function(e) {

                    //          console.log(e.request._object);

                    var items = [];

                    var infopanel = Ext.ComponentQuery.query('infopanel')[0];

                    infopanel.removeAll();
                    //infopanel.remove('infogrid',false);

                    var propiedades = Ext.create('Ext.form.Panel', {
                        //title: 'Simple Form',
                        region: "center",
                        autoScroll: true,
                        padding: '5 10 5 10',
                        html: e.text,
                    });

                    items.push(propiedades);

                    infopanel.add(items);

                }

                /*** fin ***/

            }
        });

        //signeGeoportal.xMap.map.addControl(signeGeoportal.xInfo);

        signeGeoportal.xMap.map.events.register('click', signeGeoportal.xMap.map, function (e) {

            if(Ext.getCmp("btnInformacion").pressed === true){

                var retNameArray = [];
                var vParams = [];

                for(var i=0;i<signeGeoportal.xMap.map.layers.length;i++)
                {

                    layer = signeGeoportal.xMap.map.layers[i];
                    if (layer.params){

                        if (layer.params.VIEWPARAMS){

                            vParams.push(layer.params.VIEWPARAMS);
                        }
                        else{
                            vParams.push('x:0'); // just to have something. Number of params must equal number of layers
                        }
                        retNameArray.push(layer.params.LAYERS);
                    }
                }

                var url =  signeGeoportal.xMap.map.layers[3].getFullRequestString({
                    REQUEST: "GetFeatureInfo",
                    EXCEPTIONS: "application/vnd.ogc.se_xml",
                    FEATURE_COUNT:3,
                    BBOX: signeGeoportal.xMap.map.getExtent().toBBOX(),
                    X: e.xy.x,
                    Y: e.xy.y,
                    INFO_FORMAT: 'text/html',
                    LAYERS:retNameArray,
                    QUERY_LAYERS: retNameArray,//layer_group.params.LAYERS,
                    WIDTH: signeGeoportal.xMap.map.size.w,
                    HEIGHT: signeGeoportal.xMap.map.size.h,
                    VIEWPARAMS:vParams
                });

                window.open(url,
                            "getfeatureinfo",
                            "location=0,status=0,scrollbars=1,width=600,height=400,modal=true"
                           );


            }
        });


    },

    aniadirCapa: function(titulo_capa, url_capa, nombre_capa, clone, variables, parametros, texto) {
        if (!parametros){
            var wms = new OpenLayers.Layer.WMS(
                clone.title,
                clone.url,
                {layers:clone.name,
                 transparent : 'true',
                 format: 'image/png'
                },
                {opacity: 0.7,
                 isBaseLayer: false,
                 //displayInLayerSwitcher:false
                 //     attribution: "<img src='"+url_capa+"request=GetLegendGraphic&format=image/png&width=18&height=17&layer="+nombre_capa+"&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:12;bgColor:0xFFFFEE;dpi:180'>"
                }
            );

            signeGeoportal.xMap.map.addLayer(wms);
        }else{


            var wms = new OpenLayers.Layer.WMS(
                clone.title + " " + texto,
                clone.url + variables,
                {layers:clone.name,
                 transparent : 'true',
                 format: 'image/png',
                 viewparams: parametros,
                },
                {opacity: 0.7,
                 isBaseLayer: false
                 //displayInLayerSwitcher:false
                 //     attribution: "<img src='"+url_capa+"request=GetLegendGraphic&format=image/png&width=18&height=17&layer="+nombre_capa+"&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:12;bgColor:0xFFFFEE;dpi:180'>"
                }
            );

            signeGeoportal.xMap.map.addLayer(wms);

            Ext.MessageBox.show({
                title: 'Mensaje del Sistema',
                msg: 'La capa se esta cargando al visor del mapa.',
                icon: Ext.MessageBox.INFO,
                buttons: Ext.Msg.OK
            });
        }


    },

    obtenerLayer: function() {
        var arbolCapa = Ext.getCmp("treelayer");
        record = arbolCapa.getSelectionModel().getSelection()[0];
        layer = signeGeoportal.xMap.map.getLayer(record.data.layer.id);

        return layer;
        //alert("func cambiando opacidad");


    }

});
