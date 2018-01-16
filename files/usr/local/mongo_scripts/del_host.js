conn = new Mongo();
db = conn.getDB("admin");
db.auth("<ADMINUSER>", "<ADMINPASS>");

printjson("Running del_host.js for <HOSTNAME>")
rs.remove("<HOSTNAME>:27017")
