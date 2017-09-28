package database;
import ballerina.lang.messages;
import ballerina.data.sql;
import ballerina.lang.errors;
import ballerina.lang.system;



function repositoryTypeSelectAll()(message){
    message response = {};
    try{

        map propertiesMap = getConnectionDetails();
        sql:ClientConnector connection = create sql:ClientConnector(propertiesMap);

        string query = "SELECT * FROM LM_REPOSITORYTYPE";
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