conn = new Mongo();
db = conn.getDB("admin");
db.auth("<ADMINUSER>", "<ADMINPASS>");

printjson("Running get_replica_status.js")

var replica_state = rs.isMaster();
if (replica_state['ismaster'] == true) {
	printjson("PRIMARY");
} else if (replica_state['secondary'] == true) {
	printjson("SECONDARY");
} else {
    printjson("UNKNOWN");
}
