conn = new Mongo();
db = conn.getDB("admin");
db.auth("<ADMINUSER>", "<ADMINPASS>");

printjson("Running purge_old_hosts.js")

var members = rs.status()["members"]
for (var key in members) {
    if (members[key]["lastHeartbeatMessage"] == "HostUnreachable") {
        printjson("Removing ".concat(members[key]["name"]))
        rs.remove(members[key]["name"])
    }
}
