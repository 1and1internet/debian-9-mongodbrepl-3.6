conn = new Mongo();
db = conn.getDB("admin");
db.auth("<ADMINUSER>", "<ADMINPASS>");

printjson("Running get_members.js")

var members = rs.status()["members"]
for (var key in members) {
    printjson(members[key]["name"]);
}
