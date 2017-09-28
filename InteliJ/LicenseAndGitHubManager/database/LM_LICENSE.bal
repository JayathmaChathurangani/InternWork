package database;
import ballerina.lang.messages;
import ballerina.data.sql;
import ballerina.lang.errors;
import ballerina.lang.system;



function licenseSelectAll()(message){
    message response = {};
    try{

        sql:ClientConnector connection = getConnection();

        string query = "SELECT * FROM LM_LICENSE";
        sql:Parameter[] parameterArray = [];
        datatable responseDataFromDb = connection.select(query ,parameterArray);
        json resultJSON;
        resultJSON,_ = <json>responseDataFromDb;
        messages:setJsonPayload(response,resultJSON);

    }catch(errors:Error err){
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        messages:setJsonPayload(response,errorMessage);
        system:println(errorMessage);

    }
    return response;

}