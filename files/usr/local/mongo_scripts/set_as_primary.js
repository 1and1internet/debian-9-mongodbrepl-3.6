conn = new Mongo();
db = conn.getDB("admin");
db.auth("<ADMINUSER>", "<ADMINPASS>");

printjson("Running set_as_primary.js")

rs.initiate(
    {
        _id: "<REPLICA_SET>",
        version: 1,
        members: [
            { _id: 0, host: "<HOSTNAME>" }
        ]
    }
);
