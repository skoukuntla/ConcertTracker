import mysql from "mysql"

export const db = mysql.createConnection({ //create database connection
    host: "localhost",
    user: "root",
    password: "hero243REFR",
    database: "test"
})