package database;
import ballerina.lang.messages;
import ballerina.data.sql;
import ballerina.lang.errors;
import ballerina.lang.system;



function repositoryTypeSelectAll()(message){
    message response = {};
    //map propertiesMap = getConnectionDetails();
    //sql:ClientConnector connection = create sql:ClientConnector(propertiesMap);

    //sql:ClientConnector connection = getConnection();
    if(connection == null){

        setConnection();
    }
    try{



        string query = "SELECT * FROM LM_REPOSITORYTYPE";
        sql:Parameter[] parameterArray = [];
        system:println("before");
        datatable responseDataFromDb = connection.select(query ,parameterArray);
        system:println("after");
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