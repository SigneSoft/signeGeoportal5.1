/*
 * File: app/view/ListaLayer.js
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

Ext.define('signeGeoportal.view.ListaLayer', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.listalayer',

    requires: [
        'signeGeoportal.view.ListaLayerViewModel',
        'signeGeoportal.view.ListaLayerViewController',
        'Ext.grid.filters.filter.String',
        'Ext.toolbar.Toolbar',
        'Ext.grid.column.Action',
        'Ext.grid.filters.Filters'
    ],

    controller: 'listalayer',
    viewModel: {
        type: 'listalayer'
    },
    height: '100%',
    id: '',
    itemId: '',
    width: '100%',
    title: 'Buscar capa para añadir al mapa',

    columns: [
        {
            xtype: 'gridcolumn',
            dataIndex: 'title',
            text: 'Titulo',
            flex: 0.7,
            filter: {
                type: 'string',
                emptyText: 'Escriba el título de la capa...'
            }
        },
        {
            xtype: 'gridcolumn',
            hidden: true,
            dataIndex: 'abstract',
            text: 'Descripción',
            flex: 0.3
        },
        {
            xtype: 'actioncolumn',
            id: 'acOpcion',
            width: 30,
            items: [
                {
                    handler: 'aniadir',
                    altText: 'Añadir Capa',
                    iconCls: 'add-file-icon',
                    tooltip: 'Añadir Capa al Mapa'
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            id: 'toolListaLayer'
        }
    ],
    plugins: [
        {
            ptype: 'gridfilters',
            pluginId: 'gfListaLayer',
            menuFilterText: 'Filtrar'
        }
    ]

});