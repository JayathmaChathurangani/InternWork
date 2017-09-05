package src;

import ballerina.net.http;
import ballerina.lang.messages;
import ballerina.data.sql;

import ballerina.lang.system;
import ballerina.lang.jsons;




@http:configuration {basePath:"/databaseService"}
service<http> databaseService {


    string dbURL = "jdbc:mysql://127.0.0.1:3306/licensemanager";
    string username = "root";
    string password = "#5shashika5#";
    map propertiesMap = {"jdbcUrl":dbURL, "username":username, "password":password};
    sql:ClientConnector connection = create sql:ClientConnector(propertiesMap);


    resource setConnection (message m) {
        message response = {};
        //connection = create sql:ClientConnector(propertiesMap);
        //system:println(connection);
        messages:setStringPayload(response, "Hello World !!!");
        reply response;
    }

    @http:POST {}
    resource selectAll(message m){

        message response = {};

        json requestDataJSON = messages:getJsonPayload(m);
        system:println(requestDataJSON);

        string tableName = jsons:toString(requestDataJSON.tableName);
        string select = jsons:toString(requestDataJSON.select);

        string query = "SELECT " + select + " FROM " + tableName;

        sql:Parameter[] parametersArray = [];
        datatable lm_library = connection.select(query ,parametersArray);
        var resultJSON,_ = <json>lm_library;

        messages:setJsonPayload(response,resultJSON);
        reply response;
    }

    @http:POST {}
    resource select(message m){

        message response = {};

        //json requestDataJSON = messages:getJsonPayload(m);

        //string tableName = jsons:toString(requestDataJSON.tableName);
        //string select = jsons:toString(requestDataJSON.select);
        //string condition = jsons:toString(requestDataJSON.condition);
        //string columnName = jsons:toString(requestDataJSON.parameters.column);
        //string sqlGivenType = jsons:toString(requestDataJSON.parameters.sqlType);
        //string sqlGivenValue = jsons:toString(requestDataJSON.parameters.data);
        //
        //string query = "SELECT " + select + " FROM " + tableName + " " + condition + " " + columnName + " = ?";
        //sql:Parameter givenParameter = {sqlType:sqlGivenType ,value:sqlGivenValue};
        //sql:Parameter[] parametersArray = [givenParameter];
        //datatable lm_library = connection.select(query ,parametersArray);
        //var resultJSON,_ = <json>lm_library;
        //
        //messages:setJsonPayload(response,resultJSON);
        reply response;
    }

    @http:POST {}
    @http:Path {value:"/insertData"}
    resource insertData(message m){

        //json data = messages:getJsonPayload(m);
        //string[] ar = jsons:getKeys(data.parameters);
        //string tableName = jsons:toString(data.tableName);
        //system:println(tableName);
        reply m;
    }
}