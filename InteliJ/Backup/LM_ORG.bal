package database;


import ballerina.lang.messages;
import ballerina.data.sql;
import ballerina.lang.errors;
import ballerina.lang.system;



function organizationSelectAll()(message){
    message response = {};
    //map propertiesMap = getConnectionDetails();
    //sql:ClientConnector connection = create sql:ClientConnector(propertiesMap);
    system:println("before 1");

    //sql:ClientConnector connection = getConnection();
    if(connection == null){

        setConnection();
    }
    try{



        string query = "SELECT * FROM LM_ORGANIZATION";
        sql:Parameter[] parameterArray = [];
        system:println("before");
        datatable responseDataFromDb = connection.select(query ,parameterArray);
        system:println("after call");
        var resultJSON,_ = <json>responseDataFromDb;
        messages:setJsonPayload(response,resultJSON);

    }catch(errors:Error err){
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        messages:setJsonPayload(response,errorMessage);

    }
    return response;

}