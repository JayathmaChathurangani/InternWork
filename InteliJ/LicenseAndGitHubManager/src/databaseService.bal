package src;

import ballerina.net.http;
import ballerina.lang.messages;
import ballerina.data.sql;

import ballerina.lang.jsons;
import ballerina.lang.strings;
import ballerina.lang.errors;




@http:configuration {basePath:"/databaseService"}
service<http> databaseService {


    string dbURL = "jdbc:mysql://127.0.0.1:3306/licensemanager";
    string username = "root";
    string password = "#5shashika5#";
    map propertiesMap = {"jdbcUrl":dbURL, "username":username, "password":password};
    sql:ClientConnector connection = create sql:ClientConnector(propertiesMap);

    @http:POST {}
    resource select(message m){

        message response = {};
        try{
            json requestDataJSON = messages:getJsonPayload(m);

            string tableName = jsons:toString(requestDataJSON.tableName);
            string select = jsons:toString(requestDataJSON.select);
            string query;

            if(requestDataJSON.condition == null){
                query = "SELECT " + select + " FROM " + tableName;
            }else{
                string condition = jsons:toString(requestDataJSON.condition);
                query = "SELECT " + select + " FROM " + tableName + " " + condition;

            }

            sql:Parameter[] parametersArray = [];
            datatable lm_library = connection.select(query ,parametersArray);
            var resultJSON,_ = <json>lm_library;

            messages:setJsonPayload(response,resultJSON);
            reply response;

        }catch(errors:Error err){
            json errorMessage = {"type":"Error","message":err.msg};
            messages:setJsonPayload(response,errorMessage);
            reply response;
        }

    }


    @http:POST {}
    @http:Path {value:"/insertData"}
    resource insertData(message m){
        message response = {};

        try{
            json data = messages:getJsonPayload(m);

            string columns = jsons:toString(data.columns);
            columns = strings:replace(columns,"\""," ");
            columns = strings:replace(columns,"]",")");
            columns = strings:replace(columns,"[","(");

            string inputData = jsons:toString(data.data);
            inputData = strings:replace(inputData,"[","(");
            inputData = strings:replace(inputData,"]",")");
            inputData = strings:replace(inputData,"\"","\'");

            string tableName = jsons:toString(data.tableName);

            string query = "INSERT INTO " + tableName + columns + " VALUES " + inputData;

            sql:Parameter[] parametersArray = [];
            int rowCount = connection.update(query,parametersArray);

            if(rowCount >= 1){
                messages:setStringPayload(response," Request Done !!");
            }
            reply response;
        }catch(errors:Error err){
            json errorMessage = {"type":"Error","message":err.msg};
            messages:setJsonPayload(response,errorMessage);
            reply response;
        }

    }
}