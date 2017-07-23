{
    "xdsVersion": "3.2.0",
    "frameworkVersion": "ext51",
    "internals": {
        "type": "Ext.app.Controller",
        "reference": {
            "name": "items",
            "type": "array"
        },
        "codeClass": null,
        "userConfig": {
            "designer|userClassName": "controladorLogin",
            "stores": [
                "storeLogin",
                "storeSalaVenta",
                "storeUsuarioSalaVenta",
                "storeMenu",
                "storeUsuario"
            ]
        },
        "cn": [
            {
                "type": "controlleraction",
                "reference": {
                    "name": "listeners",
                    "type": "array"
                },
                "codeClass": null,
                "userConfig": {
                    "designer|controlQuery": "#btnIngreso",
                    "designer|targetType": "Ext.button.Button",
                    "fn": "onButtonClickIngresar",
                    "implHandler": [
                        "var win = button.up('window');",
                        "form = win.down('form');",
                        "",
                        "if (form.getForm().isValid()) {",
                        "    win.mask(\"Ingresando al sistema...\");",
                        "",
                        "    var user = form.down('#usuario').getValue();",
                        "    var pwd = form.down('#pass').getValue();",
                        "",
                        "    store = this.getStoreLoginStore();",
                        "",
                        "    store.getProxy().setExtraParam('user', user);",
                        "    store.getProxy().setExtraParam('pwd', pwd);",
                        "",
                        "    storeUSV = this.getStoreUsuarioSalaVentaStore();",
                        "",
                        "    store.load(function(records, operation, success) {",
                        "        ",
                        "        ",
                        "",
                        "        var decodedResponse = Ext.decode(operation._response.responseText);",
                        "        if (decodedResponse.sse > 0){",
                        "            win.unmask();",
                        "            ",
                        "            Ext.MessageBox.show({",
                        "                title: 'Mensaje del Sistema',",
                        "                msg: 'Ya existe una sesión iniciada en el modulo de Inventarios.',",
                        "                icon: Ext.MessageBox.ERROR,",
                        "                buttons: Ext.Msg.OK",
                        "            });",
                        "",
                        "",
                        "        }else{",
                        "",
                        "            if(this.getCount()>=1){",
                        "",
                        "",
                        "                indice = store.getAt(0);",
                        "                signeInventas.xNombreUsuario =  indice.get('nombre') + ' ' + indice.get('apellido');",
                        "",
                        "                win.close();",
                        "",
                        "",
                        "                if (indice.get(\"idtipousuario\") === 1){",
                        "",
                        "",
                        "                    storeUSV.getProxy().setExtraParam('id',0);",
                        "                    storeUSV.load();",
                        "",
                        "",
                        "                    var escritorio= Ext.widget('escritorioPrincipal');",
                        "                    escritorio.show();",
                        "",
                        "                    var cboSV = Ext.getCmp(\"cboSalaVenta1\");",
                        "                    cboSV.setReadOnly(false);",
                        "",
                        "                    statusBar = escritorio.down('#statusBar');",
                        "                    statusBar.items.getAt(0).update('Usuario: ' + signeInventas.xNombreUsuario);",
                        "                }else",
                        "                {",
                        "                    storeUSV.getProxy().setExtraParam('id',indice.get('idusuario'));",
                        "                    storeUSV.load();",
                        "",
                        "                    var windowSucursal= Ext.widget('sucursal');",
                        "                    windowSucursal.show();",
                        "                }",
                        "",
                        "",
                        "            }",
                        "            else{",
                        "                win.unmask();",
                        "",
                        "                Ext.MessageBox.show({",
                        "                    title: 'Mensaje del Sistema',",
                        "                    msg: 'Los datos de usuario que se proporcionarón son inválidos.',",
                        "                    icon: Ext.MessageBox.ERROR,",
                        "                    buttons: Ext.Msg.OK",
                        "                });",
                        "            }",
                        "",
                        "        }",
                        "        //",
                        "    });",
                        "",
                        "}"
                    ],
                    "name": "click",
                    "scope": "me"
                },
                "name": "onButtonClickIngresar"
            },
            {
                "type": "controlleraction",
                "reference": {
                    "name": "listeners",
                    "type": "array"
                },
                "codeClass": null,
                "userConfig": {
                    "designer|controlQuery": "#toolSalir",
                    "designer|targetType": "Ext.panel.Tool",
                    "fn": "onToolClickSalir",
                    "implHandler": [
                        "var escritorio = Ext.getCmp(\"escritorioPrincipal\");",
                        "",
                        "escritorio.destroy();",
                        "",
                        "signeInventas.app.salirSistema();"
                    ],
                    "name": "click",
                    "scope": "me"
                },
                "name": "onToolClickSalir"
            },
            {
                "type": "controllerref",
                "reference": {
                    "name": "items",
                    "type": "array"
                },
                "codeClass": null,
                "userConfig": {
                    "ref": "escritorio",
                    "selector": "#escritorioPrincipal"
                },
                "name": "escritorio"
            },
            {
                "type": "controllerref",
                "reference": {
                    "name": "items",
                    "type": "array"
                },
                "codeClass": null,
                "userConfig": {
                    "ref": "clsSucursal",
                    "selector": "#WindowSucursal"
                },
                "name": "clsSucursal"
            }
        ]
    },
    "linkedNodes": {},
    "boundStores": {},
    "boundModels": {}
}