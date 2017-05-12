/*
 * File: app/controller/controllerMapa.js
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

Ext.define('signeGeoportal.controller.controllerMapa', {
    extend: 'Ext.app.Controller',

    views: [
        'LegendPanel'
    ],

    control: {
        "#btnEnfocar": {
            click: 'onBtnEnfocarClick'
        },
        "#btnEliminarCapa": {
            click: 'onBtnEliminarCapaClick'
        },
        "#btnImprimir": {
            click: 'onBtnImprimirClick'
        },
        "#btnAniadirCapa": {
            click: 'onBtnAniadirCapaClick'
        }
    },

    onBtnEnfocarClick: function(button, e, eOpts) {
        signeGeoportal.xMap.map.zoomToScale(2000000,false);

        //signePortal.xMap.zoomToExtent(new OpenLayers.Bounds(minLng,minLat,maxLng,maxLat));
    },

    onBtnEliminarCapaClick: function(button, e, eOpts) {
        var layer = signeGeoportal.getApplication().obtenerLayer();

        if (layer){
            Ext.MessageBox.show({
                title : 'Eliminar Capa',
                buttons : Ext.MessageBox.YESNO,
                msg : 'Realmente desea eliminar la capa ' + record.data.layer.name +  ' del mapa ?',
                icon : Ext.Msg.WARNING,
                fn : function(btn)
                {
                    if (btn == 'yes')
                    {
                        signeGeoportal.xMap.map.removeLayer(layer);
                    }

                }
            });
        }



    },

    onBtnImprimirClick: function(button, e, eOpts) {
        var printExtent = Ext.create('GeoExt.plugins.PrintExtent', {
            printProvider: printProvider
        });

        printDialog = Ext.create('Ext.Window', {
            height: 580,
            width: 450,
            layout: 'border',
            title: 'Vista previa de impresión.',
            modal: true,
            items: [
                {
                    xtype: 'panel',
                    region: 'north',
                    layout: 'fit',
                    title: '',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'btnImprimirMapa',
                                    text: 'Imprimir PDF',
                                    iconCls: 'print-pdf',
                                    handler: function(){
                                        var legendlayer = Ext.getCmp('legendlayer');
                                        var printMapPanel = Ext.getCmp('printmappanel');

                                        var includeLegend;
                                        includeLegend = true;

                                        var scale = printProvider.scales.getAt(1);
                                        printPage.setScale(scale, "m");


                                        printProvider.customParams.mapTitle = Ext.getCmp('txtTitulo').getValue();
                                        printProvider.customParams.comment = Ext.getCmp('txtComentario').getValue();

                                        var opt = {"mode":"screen"};
                                        printPage.fit(printMapPanel, opt);

                                        printProvider.setDpi(printProvider.dpis.getAt(1));
                                        printProvider.print(printMapPanel, printPage, includeLegend && {legend: legendlayer});
                                    }

                                }
                            ]
                        }
                    ],
                    items: [
                        {
                            xtype: 'fieldset',
                            height: 120,
                            title: 'Información del mapa',
                            items: [
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    id: 'txtTitulo',
                                    fieldLabel: 'Titulo',
                                    name: 'tituloMapa',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'textareafield',
                                    anchor: '100%',
                                    id: 'txtComentario',
                                    fieldLabel: 'Comentario',
                                    name: 'comentarioMapa',
                                    allowBlank: false
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    items: {
                        xtype: "gx_printmappanel",
                        id: 'printmappanel',
                        sourceMap: signeGeoportal.xMap,
                        printProvider: printProvider,
                        //center: new OpenLayers.LonLat(-10048800, 1735400),
                        //limitScales:true,
                        //plugins: [printExtent],
                    },
                    region: 'center',
                    layout: 'fit',
                }]
        });


        printDialog.show();

        //printExtent.addPage();

    },

    onBtnAniadirCapaClick: function(button, e, eOpts) {
        var pgParametro = Ext.getCmp('pgParametro');
        data = pgParametro.getSource();
        store = pgParametro.getStore();
        var strParametros = "";
        var strTexto = "";

        for(var i=0;i<store.data.items.length;i++)
        {
            strParametros = strParametros + "p" + i + ":" + store.data.items[i].data.value + ";";
            strTexto = strTexto + store.data.items[i].data.value + " ";
        }

        signeGeoportal.getApplication().aniadirCapa(signeGeoportal.xClone.title, signeGeoportal.xClone.url, signeGeoportal.xClone.name, signeGeoportal.xClone, strParametros, strTexto);


    }

});
