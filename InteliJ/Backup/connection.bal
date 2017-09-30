package database;

import ballerina.data.sql;

sql:ClientConnector connection = null;
function getConnection()(sql:ClientConnector){
    if(connection == null){
        string dbURL = "jdbc:mysql://localhost:3306/licensemanager?useSSL=false";
        string username = "root";
        string password = "#5shashika5#";
        map propertiesMap = {"jdbcUrl":dbURL, "username":username, "password":password,"maximumPoolSize":20};
        connection = create sql:ClientConnector(propertiesMap);
    }
    return connection;
}

function setConnection(){
    if(connection == null){
        string dbURL = "jdbc:mysql://localhost:3306/licensemanager?useSSL=false";
        string username = "root";
        string password = "#5shashika5#";
        map propertiesMap = {"jdbcUrl":dbURL, "username":username, "password":password,"maximumPoolSize":20};
        connection = create sql:ClientConnector(propertiesMap);
    }

}
function getFirstConnection()(sql:ClientConnector){
    string dbURL = "jdbc:mysql://127.0.0.1:3306/licensemanager?useSSL=false";
    string username = "root";
    string password = "#5shashika5#";
    map propertiesMap = {"jdbcUrl":dbURL, "username":username, "password":password};
    sql:ClientConnector connection = create sql:ClientConnector(propertiesMap);
    return connection;

}

function getConnectionDetails () (map ) {
    string dbURL = "jdbc:mysql://127.0.0.1:3306/licensemanager?useSSL=false";
    string username = "root";
    string password = "#5shashika5#";
    map propertiesMap = {"jdbcUrl":dbURL, "username":username, "password":password};
    return propertiesMap;

}
