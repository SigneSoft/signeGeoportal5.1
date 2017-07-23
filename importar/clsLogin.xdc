{
    "xdsVersion": "3.2.0",
    "frameworkVersion": "ext51",
    "internals": {
        "type": "Ext.window.Window",
        "reference": {
            "name": "items",
            "type": "array"
        },
        "codeClass": null,
        "userConfig": {
            "closable": false,
            "designer|initialView": true,
            "designer|userAlias": "WindowLogin",
            "designer|userClassName": "clsLogin",
            "expandOnShow": false,
            "height": 228,
            "hidden": false,
            "id": "WindowLogin",
            "layout": "anchor",
            "modal": true,
            "resizable": [
                "false"
            ],
            "title": "Autenticación de usuario",
            "width": 462
        },
        "configAlternates": {
            "scrollable": "boolean"
        },
        "cn": [
            {
                "type": "Ext.form.Panel",
                "reference": {
                    "name": "items",
                    "type": "array"
                },
                "codeClass": null,
                "userConfig": {
                    "bodyPadding": 10,
                    "title": ""
                },
                "name": "MyForm3",
                "configAlternates": {
                    "scrollable": "boolean"
                },
                "cn": [
                    {
                        "type": "Ext.panel.Panel",
                        "reference": {
                            "name": "items",
                            "type": "array"
                        },
                        "codeClass": null,
                        "userConfig": {
                            "designer|snapToGrid": 10,
                            "height": 45,
                            "html": [
                                "'<img src=\"./app/images/signe_logo.png\" style=\"max-height:70%; max-width:70%;\"/>'"
                            ],
                            "layout": "absolute",
                            "title": "",
                            "width": 612
                        },
                        "name": "MyPanel10",
                        "configAlternates": {
                            "scrollable": "boolean"
                        }
                    },
                    {
                        "type": "Ext.form.FieldSet",
                        "reference": {
                            "name": "items",
                            "type": "array"
                        },
                        "codeClass": null,
                        "userConfig": {
                            "formBind": false,
                            "title": "Datos de identificación"
                        },
                        "name": "MyFieldSet",
                        "configAlternates": {
                            "scrollable": "boolean"
                        },
                        "cn": [
                            {
                                "type": "Ext.form.field.Text",
                                "reference": {
                                    "name": "items",
                                    "type": "array"
                                },
                                "codeClass": null,
                                "userConfig": {
                                    "allowBlank": false,
                                    "blankText": "Este campo es obligatorio",
                                    "fieldLabel": "Usuario",
                                    "id": "usuario",
                                    "inputType": "email",
                                    "layout|anchor": "100%",
                                    "msgTarget": "side",
                                    "validateBlank": true,
                                    "vtype": "email",
                                    "vtypeText": "Este campo debe ser una cuenta de correo electrónico en formato \"usuario@ejemplo.com\"'"
                                },
                                "name": "MyTextField1",
                                "configAlternates": {
                                    "scrollable": "boolean"
                                },
                                "cn": [
                                    {
                                        "type": "basiceventbinding",
                                        "reference": {
                                            "name": "listeners",
                                            "type": "array"
                                        },
                                        "codeClass": null,
                                        "userConfig": {
                                            "fn": "onUsuarioAfterRender",
                                            "implHandler": [
                                                "Ext.defer(function() {",
                                                "    component.focus(true, 100);",
                                                "}, 1);",
                                                ""
                                            ],
                                            "name": "afterrender",
                                            "scope": "me"
                                        },
                                        "name": "onUsuarioAfterRender"
                                    }
                                ]
                            },
                            {
                                "type": "Ext.form.field.Text",
                                "reference": {
                                    "name": "items",
                                    "type": "array"
                                },
                                "codeClass": null,
                                "userConfig": {
                                    "allowBlank": false,
                                    "blankText": "Este campo es obligatorio",
                                    "fieldLabel": "Contraseña",
                                    "id": "pass",
                                    "inputType": "password",
                                    "layout|anchor": "100%",
                                    "msgTarget": "side",
                                    "validateBlank": true
                                },
                                "name": "MyTextField2",
                                "configAlternates": {
                                    "scrollable": "boolean"
                                },
                                "cn": [
                                    {
                                        "type": "basiceventbinding",
                                        "reference": {
                                            "name": "listeners",
                                            "type": "array"
                                        },
                                        "codeClass": null,
                                        "userConfig": {
                                            "fn": "onPassSpecialkey",
                                            "implHandler": [
                                                "if (e.getKey() == e.ENTER){",
                                                "    var submitBtn = field.up('form').down('button#btnIngreso');",
                                                "    submitBtn.fireEvent('click', submitBtn, e);",
                                                "}"
                                            ],
                                            "name": "specialkey",
                                            "scope": "me"
                                        },
                                        "name": "onPassSpecialkey"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "Ext.panel.Panel",
                        "reference": {
                            "name": "items",
                            "type": "array"
                        },
                        "codeClass": null,
                        "userConfig": {
                            "container|align": "center",
                            "layout": "vbox",
                            "title": "",
                            "width": null
                        },
                        "name": "MyPanel11",
                        "configAlternates": {
                            "scrollable": "boolean"
                        },
                        "cn": [
                            {
                                "type": "Ext.button.Button",
                                "reference": {
                                    "name": "items",
                                    "type": "array"
                                },
                                "codeClass": null,
                                "userConfig": {
                                    "id": "btnIngreso",
                                    "layout|flex": null,
                                    "scale": "medium",
                                    "text": "Ingresar",
                                    "tooltip": [
                                        "Ingresar al sistema."
                                    ],
                                    "width": 150
                                },
                                "name": "MyButton54",
                                "configAlternates": {
                                    "scrollable": "boolean"
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    "linkedNodes": {},
    "boundStores": {},
    "boundModels": {},
    "viewController": {
        "xdsVersion": "3.2.0",
        "frameworkVersion": "ext51",
        "internals": {
            "type": "Ext.app.ViewController",
            "reference": {
                "name": "items",
                "type": "array"
            },
            "codeClass": null,
            "userConfig": {
                "designer|userAlias": "WindowLogin",
                "designer|userClassName": "clsLoginViewController"
            }
        },
        "linkedNodes": {},
        "boundStores": {},
        "boundModels": {}
    },
    "viewModel": {
        "xdsVersion": "3.2.0",
        "frameworkVersion": "ext51",
        "internals": {
            "type": "Ext.app.ViewModel",
            "reference": {
                "name": "items",
                "type": "array"
            },
            "codeClass": null,
            "userConfig": {
                "designer|userAlias": "WindowLogin",
                "designer|userClassName": "clsLoginViewModel"
            }
        },
        "linkedNodes": {},
        "boundStores": {},
        "boundModels": {}
    }
}