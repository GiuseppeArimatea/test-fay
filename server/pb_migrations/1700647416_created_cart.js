migrate((db) => {
  const collection = new Collection({
    "id": "25miakc3lduc66m",
    "created": "2023-11-22 10:03:36.984Z",
    "updated": "2023-11-22 10:03:36.984Z",
    "name": "cart",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "2j2x3spi",
        "name": "thumbnail",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("25miakc3lduc66m");

  return dao.deleteCollection(collection);
})
