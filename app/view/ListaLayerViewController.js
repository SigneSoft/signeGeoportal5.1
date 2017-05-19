/*
 * File: app/view/ListaLayerViewController.js
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

Ext.define('signeGeoportal.view.ListaLayerViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.listalayer',

    aniadir: function(view, rowIndex, colIndex, item, e, record, row) {
        var clone = record.clone();

        var storeParametro = Ext.StoreMgr.lookup("storeParametro");

        storeParametro.getProxy().setExtraParam("nombre_capa", clone.data.name);

        storeParametro.load(function(records, operation, success) {

            if (this.getCount()>=1){
                signeGeoportal.xClone = clone.data;

                var windowParametro= Ext.widget('ventanaparametro');
                windowParametro.setTitle(clone.data.title);
                windowParametro.show();

                var pgParametro = Ext.getCmp('pgParametro');
                pgParametro.setTitle("Seleccione el(los) parámetro(s) de la capa");

                var sources = {};
                var sourcesconf = {};
                var types = {};

                Ext.define('CustomEditorField', {
                    extend: 'Ext.form.field.Picker',
                    alias: 'widget.customeditorfield',
                    editable: false,
                    hideTrigger: true,
                    pickerOffset: [ 0, -20 ],
                    listeners: {
                        focus: function( fld, e, opts ) {
                            fld.expand();

                        }
                    },
                    applyValues: function() {
                        var me = this;
                        form = me.picker;
                        me.fireEvent('blur');
                        //me.collapse();
                    },
                    createPicker: function() {
                        var me = this;
                        format = Ext.String.format;
                        return Ext.create('Ext.form.Panel', {
                            title: 'Seleccione el color',
                            bodypadding:5,
                            pickerField: CustomEditorField,
                            ownerCt: CustomEditorField.ownerCt,
                            renderTo: document.body,
                            floating: true,
                            bodyPadding:8,
                            modal:true,
                            items: [
                            {
                                xtype: 'colorpicker',
                                value: '000000',
                                listeners: {
                                    select: function (metaData, value) {

                                        var color = value;

                                        me.setValue(color);
                                        me.setFieldStyle('background-color:color ;background-image: none;');
                                        me.collapse();
                                    }
                                }
                            }
                            ],
                            dockedItems: [
                            {
                                xtype: 'toolbar',
                                dock: 'bottom',
                                items: [
                                {
                                    xtype: 'button',
                                    name:'cancel',
                                    text:'Cancelar',
                                    iconCls: 'cancel-file-icon',
                                    handler: function( btn, e, opts ) {
                                        me.collapse();
                                    }
                                }
                                ]
                            }
                            ],
                            listeners: {
                                afterrender: function( panel, opts ) {
                                    panel.getForm().setValues("");
                                }
                            }
                        });
                    }
                });

                sources['0. Color'] = "";

                sourcesconf['0. Color']=  {
                    editor: new CustomEditorField()
                };


                storeParametro.each(function(record) {
                    sources[record.get('descripcion')] = "";
                    sourcesconf[record.get('descripcion')]=record.get('tipo');


                    if (record.get('tipo')=='text'){
                        sourcesconf[record.get('descripcion')]=  {
                            editor: new Ext.form.field.Text({
                                allowBlank: false,
                                blankText: 'Campo obligatorio.'
                            })
                        };

                    }
                    if (record.get('tipo')=='number'){
                        sourcesconf[record.get('descripcion')]=  {
                            editor: new Ext.form.field.Number({
                                allowBlank: false,
                                blankText: 'Campo obligatorio.'
                            })
                        };
                    }
                    if (record.get('tipo')=='combobox'){


                        Ext.define('modelCatalogo',{
                            extend: 'Ext.data.Model',
                            fields: [
                            { name: 'valor', type: 'string' },
                            { name: 'descripcion', type: 'string' }
                            ]
                        });

                        Ext.Ajax.request({
                            //                    url: '../serverside/getCatalogo.jsp',
                            url: 'http://192.168.56.101:8282/serverside/getCatalogo.jsp',
                            method: 'POST',
                            timeout: 30000,
                            async: false,
                            params: { id: record.get('id')
                            },
                            success: function (response, opts ) {
                                if(response.responseText!=="")
                                {
                                    var decodedResponse = Ext.decode(response.responseText);
                                    if(decodedResponse.success===true)
                                    {

                                        sourcesconf[record.get('descripcion')]=  {
                                            editor: new Ext.create('Ext.form.ComboBox', {
                                                id:record.get('nombre'),
                                                store: {
                                                    model: 'modelCatalogo',
                                                    data: decodedResponse.data
                                                },
                                                queryMode: 'local',
                                                displayField: 'descripcion',
                                                valueField: 'valor',
                                                forceSelection: true,
                                            }),
                                            renderer: function(val){

                                                var storeCombo = Ext.getCmp(record.get('nombre')).getStore();

                                                index = storeCombo.findExact('valor',val);
                                                if (index != -1){
                                                    rs = storeCombo.getAt(index).data;
                                                    return rs.descripcion;
                                                }
                                            }

                                        };
                                    }
                                    else if(decodedResponse.success===false)
                                    {
                                        Ext.MessageBox.show({
                                            title: 'Mensaje del Sistema',
                                            msg: decodedResponse.message,
                                            buttons: Ext.MessageBox.OK,
                                            icon: Ext.MessageBox.ERROR
                                        });
                                    }
                                }
                                else
                                {
                                    Ext.Msg.show({
                                        title: 'Mensaje del Sistema',
                                        msg: 'Error en el archivo de acceso a datos.',
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.MessageBox.ERROR
                                    });
                                }

                            },

                            failure:    function() {


                                Ext.Msg.show({
                                    title: 'Mensaje del Sistema',
                                    msg: 'Error en el archivo de acceso a datos.',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.MessageBox.ERROR
                                });
                            }
                        });

                    }
                });


                pgParametro.setSource(sources, sourcesconf);
                pgParametro.columns[0].setText('Parámetro');
                pgParametro.columns[1].setText('Valor');
                pgParametro.columns[0].sortable = false;
                pgParametro.columns[1].sortable = false;
                pgParametro.columns[0].setWidth(200);


            }else{
                signeGeoportal.getApplication().aniadirCapa(clone.data.title, clone.data.url, clone.data.name,  clone.data, "" , null, "");
            }
        });

    }

});
