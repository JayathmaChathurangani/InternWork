package database;


import ballerina.lang.messages;
import ballerina.data.sql;
import ballerina.lang.errors;



function organizationSelectAll()(message){
    message response = {};
    try{

        sql:ClientConnector connection = getConnection();

        string query = "SELECT * FROM LM_ORGANIZATION";
        sql:Parameter[] parameterArray = [];
        datatable responseDataFromDb = connection.select(query ,parameterArray);
        var resultJSON,_ = <json>responseDataFromDb;
        messages:setJsonPayload(response,resultJSON);

    }catch(errors:Error err){
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        messages:setJsonPayload(response,errorMessage);

    }
    return response;

}