migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("25miakc3lduc66m")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ucrds7zz",
    "name": "name",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "idtv7jx6",
    "name": "price",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gmldhftd",
    "name": "sku",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("25miakc3lduc66m")

  // remove
  collection.schema.removeField("ucrds7zz")

  // remove
  collection.schema.removeField("idtv7jx6")

  // remove
  collection.schema.removeField("gmldhftd")

  return dao.saveCollection(collection)
})
