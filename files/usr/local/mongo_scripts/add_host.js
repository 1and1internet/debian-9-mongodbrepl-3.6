conn = new Mongo();
db = conn.getDB("admin");
db.auth("<ADMINUSER>", "<ADMINPASS>");

printjson("Running add_host.js for <HOSTNAME>")
rs.add("<HOSTNAME>")
