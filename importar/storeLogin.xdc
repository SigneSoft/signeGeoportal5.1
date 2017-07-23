{
    "xdsVersion": "3.2.0",
    "frameworkVersion": "ext51",
    "internals": {
        "type": "jsonstore",
        "reference": {
            "name": "items",
            "type": "array"
        },
        "codeClass": null,
        "userConfig": {
            "autoLoad": false,
            "autoSave": false,
            "autoSync": true,
            "designer|userClassName": "storeLogin",
            "listeners": [
                "{",
                "write: function(store, operation, eOpts){",
                "",
                "if (operation.action == 'destroy') {",
                "\tExt.MessageBox.show({",
                "\ttitle: 'Mensaje del Sistema  ',",
                "\tmsg:  operation._resultSet.message,",
                "\tbuttons: Ext.MessageBox.OK,",
                "\ticon: Ext.MessageBox.INFO",
                "\t});    ",
                "}",
                "",
                "if (operation.action == 'create') {",
                "\tExt.MessageBox.show({",
                "\ttitle: 'Mensaje del Sistema  ',",
                "\tmsg:  operation._resultSet.message,",
                "\tbuttons: Ext.MessageBox.OK,",
                "\ticon: Ext.MessageBox.INFO",
                "\t});    ",
                "}",
                "",
                "",
                "if (operation.action == 'update') {",
                "\tExt.MessageBox.show({",
                "\ttitle: 'Mensaje del Sistema  ',",
                "\tmsg:  operation._resultSet.message,",
                "\tbuttons: Ext.MessageBox.OK,",
                "\ticon: Ext.MessageBox.INFO",
                "\t});    ",
                "}        ",
                "\tthis.load();",
                "/*this.load({",
                "\tmetodo: 'READ',",
                "\tid: 0",
                "});*/",
                "}",
                "}"
            ],
            "model": "modelLogin",
            "storeId": "storeLogin"
        },
        "configAlternates": {
            "autoSave": "boolean",
            "listener": "object",
            "listeners": "object"
        },
        "customConfigs": [
            {
                "group": "(Custom Properties)",
                "name": "autoSave",
                "type": "string"
            },
            {
                "group": "(Custom Properties)",
                "name": "listeners",
                "type": "string"
            }
        ],
        "cn": [
            {
                "type": "Ext.data.proxy.Ajax",
                "reference": {
                    "name": "proxy",
                    "type": "object"
                },
                "codeClass": null,
                "userConfig": {
                    "api": [
                        "{\r",
                        "\tread: './app/data/login/getLogin.php'/*,\r",
                        "    create:'./app/data/ejercicio/CreateEjercicio.php',   \r",
                        "    update: './app/data/ejercicio/UpdateEjercicio.php',\r",
                        "    destroy : \"./app/data/ejercicio/DestroyEjercicio.php\"*/\r",
                        "}"
                    ],
                    "url": ""
                },
                "name": "MyAjaxProxy22",
                "cn": [
                    {
                        "type": "Ext.data.reader.Json",
                        "reference": {
                            "name": "reader",
                            "type": "object"
                        },
                        "codeClass": null,
                        "userConfig": {
                            "messageProperty": "message",
                            "rootProperty": "data"
                        },
                        "name": "MyJsonReader21"
                    },
                    {
                        "type": "Ext.data.writer.Json",
                        "reference": {
                            "name": "writer",
                            "type": "object"
                        },
                        "codeClass": null,
                        "userConfig": {
                            "encode": true,
                            "rootProperty": "data"
                        },
                        "name": "MyJsonWriter21"
                    },
                    {
                        "type": "basiceventbinding",
                        "reference": {
                            "name": "listeners",
                            "type": "array"
                        },
                        "codeClass": null,
                        "userConfig": {
                            "fn": "onAjaxException",
                            "implHandler": [
                                "if (operation.getError()){",
                                "\tif (operation.getError().statusText){",
                                "\t\tExt.MessageBox.show({",
                                "\t\t\ttitle: 'Mensaje del Sistema',",
                                "\t\t\tmsg: operation.getError().statusText,",
                                "\t\t\ticon: Ext.MessageBox.ERROR,",
                                "\t\t\tbuttons: Ext.Msg.OK",
                                "\t\t});",
                                "\t}else{",
                                "\t\tExt.MessageBox.show({",
                                "\t\t\ttitle: 'Mensaje del Sistema',",
                                "\t\t\tmsg: operation.getError(),",
                                "\t\t\ticon: Ext.MessageBox.ERROR,",
                                "\t\t\tbuttons: Ext.Msg.OK",
                                "\t\t});",
                                "\t}",
                                "}else{",
                                "\tvar json = Ext.decode(request.responseText);",
                                "\tExt.MessageBox.show({",
                                "\t\ttitle: 'Mensaje del Sistema',",
                                "\t\tmsg: json.message,",
                                "\t\ticon: Ext.MessageBox.ERROR,",
                                "\t\tbuttons: Ext.Msg.OK",
                                "\t});",
                                "}"
                            ],
                            "name": "exception",
                            "scope": "me"
                        },
                        "name": "onAjaxException"
                    }
                ]
            }
        ]
    },
    "linkedNodes": {},
    "boundStores": {},
    "boundModels": {
        "19835bdd-e386-4a55-a435-b2d0ff17d39f": {
            "type": "Ext.data.Model",
            "reference": {
                "name": "items",
                "type": "array"
            },
            "codeClass": null,
            "userConfig": {
                "designer|userClassName": "modelLogin"
            },
            "name": "MyModel",
            "cn": [
                {
                    "type": "Ext.data.field.Field",
                    "reference": {
                        "name": "fields",
                        "type": "array"
                    },
                    "codeClass": null,
                    "userConfig": {
                        "name": "idusuario"
                    },
                    "name": "MyField130"
                },
                {
                    "type": "Ext.data.field.Field",
                    "reference": {
                        "name": "fields",
                        "type": "array"
                    },
                    "codeClass": null,
                    "userConfig": {
                        "name": "idtipousuario"
                    },
                    "name": "MyField131"
                },
                {
                    "type": "Ext.data.field.Field",
                    "reference": {
                        "name": "fields",
                        "type": "array"
                    },
                    "codeClass": null,
                    "userConfig": {
                        "name": "usuario"
                    },
                    "name": "MyField132"
                },
                {
                    "type": "Ext.data.field.Field",
                    "reference": {
                        "name": "fields",
                        "type": "array"
                    },
                    "codeClass": null,
                    "userConfig": {
                        "name": "nombre"
                    },
                    "name": "MyField133"
                },
                {
                    "type": "Ext.data.field.Field",
                    "reference": {
                        "name": "fields",
                        "type": "array"
                    },
                    "codeClass": null,
                    "userConfig": {
                        "name": "apellido"
                    },
                    "name": "MyField134"
                },
                {
                    "type": "Ext.data.field.Field",
                    "reference": {
                        "name": "fields",
                        "type": "array"
                    },
                    "codeClass": null,
                    "userConfig": {
                        "name": "cambiar_pass"
                    },
                    "name": "MyField135"
                }
            ]
        }
    }
}