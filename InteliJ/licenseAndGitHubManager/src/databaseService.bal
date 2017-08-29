package src;

import ballerina.net.http;
import ballerina.lang.messages;
import ballerina.data.sql;
import ballerina.lang.system;

@http:configuration {basePath:"/databaseService"}
service<http> databaseService {

    sql:ClientConnector connection;
    string dbURL = "jdbc:mysql://127.0.0.1:3306/licensemanager";
    string username = "root";
    string password = "#5shashika5#";
    map propertiesMap = {"jdbcUrl":dbURL, "username":username, "password":password};

    resource setConnection (message m) {
        message response = {};
        connection = create sql:ClientConnector(propertiesMap);
        system:println(connection);
        messages:setStringPayload(response, "Hello World !!!");
        reply response;
    }

    resource select(message m){
        sql:Parameter[] parametersArray;
        sql:Parameter version = {sqlType:"integer",value:1};
        datatable lm_library = connection.select("SELECT * FROM LM_LIBRARY WHERE LIB_VERSION = ?",parametersArray);
        var resultJSON,_ = <json>lm_library;
        system:println(resultJSON);
        reply m;
    }

    @http:POST {}
    @http:Path {value:"/insertData"}
    resource insertData(message m){

         json data = messages:getJsonPayload(m);
         system:println(data);
         reply m;
    }
}
