package services;


import ballerina.lang.messages;
import ballerina.data.sql;
import ballerina.lang.jsons;
import ballerina.lang.strings;
import ballerina.lang.errors;
import ballerina.lang.system;

string dbURL = "jdbc:mysql://127.0.0.1:3306/licensemanager";
string username = "root";
string password = "#5shashika5#";
map propertiesMap = {"jdbcUrl":dbURL, "username":username, "password":password};
sql:ClientConnector connection = null;

function insertData(message m)(message ){
    if(connection == null){
        connection = create sql:ClientConnector(propertiesMap);
    }

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
        json returnMessage = {"responseType":"Done","responseMessage":""};
        json errorMessage = {"responseType":"Error","responseMessage":"Database Error"};
        if(rowCount >= 1){
            messages:setJsonPayload(response,returnMessage);
        }else{
            messages:setJsonPayload(response,errorMessage);
        }

    }catch(errors:Error err){
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        system:println(err);
        messages:setJsonPayload(response,errorMessage);

    }
    return response;
}

function updateData(message m)(message ){
    if(connection == null){
        connection = create sql:ClientConnector(propertiesMap);
    }
    message response = {};

    try{
        json requestData = messages:getJsonPayload(m);
        string tableName = jsons:toString(requestData.tableName);
        string condition = jsons:toString(requestData.condition);
        string updateQueryColumns = " ";
        int updateColumnNumber = lengthof requestData.columns;
        int i = 0;

        while(i < updateColumnNumber){

            if(i == (updateColumnNumber - 1)){
                updateQueryColumns = updateQueryColumns + jsons:toString(requestData.columns[i]) + " = " + jsons:toString(requestData.data[i]) + " " ;
                i = i + 1;
                continue;
            }
            updateQueryColumns = updateQueryColumns + jsons:toString(requestData.columns[i]) + " = " + jsons:toString(requestData.data[i]) + ", ";
            i = i + 1;


        }
        string query = "UPDATE " + tableName + " SET "+ updateQueryColumns + condition;

        sql:Parameter[] parametersArray = [];
        int rowCount = connection.update(query,parametersArray);
        json returnMessage = {"responseType":"Done","responseMessage":""};
        json errorMessage = {"responseType":"Error","responseMessage":"Database Error"};
        if(rowCount >= 1){
            messages:setJsonPayload(response,returnMessage);
        }else{
            messages:setJsonPayload(response,errorMessage);
        }

    }catch(errors:Error err){
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        system:println(err);
        messages:setJsonPayload(response,errorMessage);

    }
    return response;
}

function selectData(message m)(message ){
    if(connection == null){
        connection = create sql:ClientConnector(propertiesMap);
    }
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


    }catch(errors:Error err){
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        messages:setJsonPayload(response,errorMessage);

    }
    return response;
}

function deleteData(message m)(message ){
    if(connection == null){
        connection = create sql:ClientConnector(propertiesMap);
    }
    message response = {};

    try{
        json requestData = messages:getJsonPayload(m);
        string tableName = jsons:toString(requestData.tableName);
        string condition = jsons:toString(requestData.condition);

        string query = "DELETE FROM " + tableName + "  " + condition;

        sql:Parameter[] parametersArray = [];
        int rowCount = connection.update(query,parametersArray);
        json returnMessage = {"responseType":"Done","responseMessage":""};
        json errorMessage = {"responseType":"Error","responseMessage":"Database Error"};
        if(rowCount >= 1){
            messages:setJsonPayload(response,returnMessage);
        }else{
            messages:setJsonPayload(response,errorMessage);
        }

    }catch(errors:Error err){
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        system:println(err);
        messages:setJsonPayload(response,errorMessage);

    }
    return response;
}
