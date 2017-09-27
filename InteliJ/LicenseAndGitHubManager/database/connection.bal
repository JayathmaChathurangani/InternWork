package database;

import ballerina.data.sql;

function getConnection()(sql:ClientConnector){
    string dbURL = "jdbc:mysql://127.0.0.1:3306/licensemanager";
    string username = "root";
    string password = "#5shashika5#";
    map propertiesMap = {"jdbcUrl":dbURL, "username":username, "password":password};
    sql:ClientConnector connection = create sql:ClientConnector(propertiesMap);

    return connection;

}