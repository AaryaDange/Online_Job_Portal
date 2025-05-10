import { createConnection } from "mysql2";

export function createDbConnection() {
    const conn = createConnection({
        host: "localhost",
        user: "root",
        password: "cdac",
        database:"cdac_wpt"
    });

    conn.connect((error) => {
        if (error) {
            console.log("Connection failed:", error);
        } else {
            console.log("DB connected");
        }
    });

    return conn;
}







