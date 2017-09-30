package database;

import ballerina.data.sql;
import ballerina.lang.messages;
import ballerina.lang.errors;
import ballerina.lang.system;

sql:ClientConnector connection = null;

function setConnection(){
    if(connection == null){
        string dbURL = "jdbc:mysql://localhost:3306/licensemanager?useSSL=false";
        string username = "root";
        string password = "#5shashika5#";
        map propertiesMap = {"jdbcUrl":dbURL, "username":username, "password":password,"maximumPoolSize":20};
        connection = create sql:ClientConnector(propertiesMap);
    }

}

function repositoryInsertData(string name,string language,boolean buildable,boolean nexus,boolean private,string description,string groupId,int license,int team,int organization,int repoType,string requestBy)(int){
    message response = {};
    int returnValue;
    if(connection == null){
        setConnection();
    }
    //map propertiesMap = getConnectionDetails();
    //sql:ClientConnector connection = create sql:ClientConnector(propertiesMap);
    //sql:ClientConnector connection = getConnection();
    if(connection == null){

        setConnection();
    }
    try{

        string query = "INSERT INTO LM_REPOSITORY(
                                                    REPOSITORY_NAME,
                                                    REPOSITORY_LANGUAGE,
                                                    REPOSITORY_BUILDABLE,
                                                    REPOSITORY_NEXUS,
                                                    REPOSITORY_PRIVATE,
                                                    REPOSITORY_DESCRIPTION,
                                                    REPOSITORY_GROUPID,
                                                    REPOSITORY_LICENSE,
                                                    REPOSITORY_TEAM,
                                                    REPOSITORY_ORGANIZATION,
                                                    REPOSITORY_TYPE,
                                                    REPOSITORY_REQUEST_BY
                                                  )
                                                   VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";

        sql:Parameter paraName = {sqlType:"varchar", value:name};
        sql:Parameter paraLanguage = {sqlType:"varchar", value:language};
        sql:Parameter paraBuildable = {sqlType:"boolean", value:buildable};
        sql:Parameter paraNexus = {sqlType:"boolean", value:nexus};
        sql:Parameter paraPrivate = {sqlType:"boolean", value:private};
        sql:Parameter paraDescription = {sqlType:"varchar", value:description};
        sql:Parameter paraGroupId = {sqlType:"varchar", value:groupId};
        sql:Parameter paraLicense = {sqlType:"integer", value:license};
        sql:Parameter paraTeam = {sqlType:"integer", value:team};
        sql:Parameter paraOrganization = {sqlType:"integer", value:organization};
        sql:Parameter paraRepoType = {sqlType:"integer", value:repoType};
        sql:Parameter paraRequestBy = {sqlType:"varchar", value:requestBy};

        sql:Parameter[] parameterArray = [paraName,paraLanguage,paraBuildable,paraNexus,paraPrivate,paraDescription,paraGroupId,paraLicense,paraTeam,paraOrganization,paraRepoType,paraRequestBy];

        returnValue = connection.update(query,parameterArray);
    }catch(errors:Error err){
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        messages:setJsonPayload(response,errorMessage);

    }

    return returnValue;


}

function repositoryUpdateTaskAndProcessIds(int taskId,int processId,string repositoryName)(int){
    message response = {};
    int returnValue;
    //map propertiesMap = getConnectionDetails();
    //sql:ClientConnector connection = create sql:ClientConnector(propertiesMap);
    //sql:ClientConnector connection = getConnection();
    if(connection == null){

        setConnection();
    }
    try{


        string query = "UPDATE LM_REPOSITORY SET REPOSITORY_BPMN_TASK_ID = ? , REPOSITORY_BPMN_PROCESS_ID = ? WHERE REPOSITORY_NAME = ?";

        sql:Parameter paraTaskId = {sqlType:"integer", value:taskId};
        sql:Parameter paraProcessId = {sqlType:"integer", value:processId};
        sql:Parameter paraRepositoryName = {sqlType:"varchar", value:repositoryName};

        sql:Parameter[] parameterArray = [paraTaskId,paraProcessId,paraRepositoryName];

        returnValue = connection.update(query,parameterArray);
    }catch(errors:Error err){
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        messages:setJsonPayload(response,errorMessage);

    }

    return returnValue;
}

function repositoryUpdateAll(string name,string language,boolean buildable,boolean nexus,boolean private,string description,string groupId,int license,int team,int organization,int repoType,boolean accept,string acceptBy,int id)(int){
    message response = {};
    //map propertiesMap = getConnectionDetails();
    //sql:ClientConnector connection = create sql:ClientConnector(propertiesMap);
    //sql:ClientConnector connection = getConnection();
    if(connection == null){

        setConnection();
    }
    int returnValue;
    try {
        string query = "UPDATE LM_REPOSITORY SET
                                                    REPOSITORY_NAME = ?,
                                                    REPOSITORY_LANGUAGE = ?,
                                                    REPOSITORY_BUILDABLE = ?,
                                                    REPOSITORY_NEXUS = ?,
                                                    REPOSITORY_PRIVATE = ?,
                                                    REPOSITORY_DESCRIPTION = ?,
                                                    REPOSITORY_GROUPID = ?,
                                                    REPOSITORY_LICENSE = ?,
                                                    REPOSITORY_TEAM = ?,
                                                    REPOSITORY_ORGANIZATION = ?,
                                                    REPOSITORY_TYPE = ?,
                                                    REPOSITORY_ACCEPT = ?,
                                                    REPOSITORY_ACCEPTED_BY = ?

                                                    WHERE REPOSITORY_ID = ?";

        sql:Parameter paraName = {sqlType:"varchar", value:name};
        sql:Parameter paraLanguage = {sqlType:"varchar", value:language};
        sql:Parameter paraBuildable = {sqlType:"boolean", value:buildable};
        sql:Parameter paraNexus = {sqlType:"boolean", value:nexus};
        sql:Parameter paraPrivate = {sqlType:"boolean", value:private};
        sql:Parameter paraDescription = {sqlType:"varchar", value:description};
        sql:Parameter paraGroupId = {sqlType:"varchar", value:groupId};
        sql:Parameter paraLicense = {sqlType:"integer", value:license};
        sql:Parameter paraTeam = {sqlType:"integer", value:team};
        sql:Parameter paraOrganization = {sqlType:"integer", value:organization};
        sql:Parameter paraRepoType = {sqlType:"integer", value:repoType};
        sql:Parameter paraAccept = {sqlType:"boolean", value:accept};
        sql:Parameter paraAcceptBy = {sqlType:"varchar", value:acceptBy};
        sql:Parameter paraRepositoryId = {sqlType:"integer", value:id};

        sql:Parameter[] parameterArray = [paraName, paraLanguage, paraBuildable, paraNexus, paraPrivate, paraDescription, paraGroupId, paraLicense, paraTeam, paraOrganization, paraRepoType, paraAccept, paraAcceptBy, paraRepositoryId];

        returnValue = connection.update(query, parameterArray);

    }catch(errors:Error err){
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        messages:setJsonPayload(response,errorMessage);

    }
    return returnValue;
}

function repositorySelectAll()(message){
    message response = {};
    //map propertiesMap = getConnectionDetails();
    //sql:ClientConnector connection = create sql:ClientConnector(propertiesMap);
    //sql:ClientConnector connection = getConnection();
    if(connection == null){

        setConnection();
    }
    try{

        string query = "SELECT * FROM LM_REPOSITORY";
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


function repositorySelectFromName(string name)(message){
    message response = {};
    //map propertiesMap = getConnectionDetails();
    //sql:ClientConnector connection = create sql:ClientConnector(propertiesMap);
    //sql:ClientConnector connection = getConnection();
    if(connection == null){

        setConnection();
    }
    try{
        system:println(name);
        string query = "SELECT * FROM LM_REPOSITORY WHERE REPOSITORY_NAME = ?";
        sql:Parameter paraName = {sqlType:"varchar", value:name};
        sql:Parameter[] parameterArray = [paraName];

        datatable responseDataFromDb = connection.select(query ,parameterArray);
        var resultJSON,_ = <json>responseDataFromDb;

        system:println(resultJSON);
        messages:setJsonPayload(response,resultJSON);


    }catch(errors:Error err){
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        messages:setJsonPayload(response,errorMessage);

    }
    return response;

}

function repositorySelectFromId(int id)(message){
    message response = {};
    //map propertiesMap = getConnectionDetails();
    //sql:ClientConnector connection = create sql:ClientConnector(propertiesMap);
    //sql:ClientConnector connection = getConnection();
    if(connection == null){

        setConnection();
    }
    try{

        string query = "SELECT * FROM LM_REPOSITORY WHERE REPOSITORY_ID = ?";
        sql:Parameter paraName = {sqlType:"integer", value:id};
        sql:Parameter[] parameterArray = [paraName];

        datatable responseDataFromDb = connection.select(query ,parameterArray);
        var resultJSON,_ = <json>responseDataFromDb;


        messages:setJsonPayload(response,resultJSON);


    }catch(errors:Error err){
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        messages:setJsonPayload(response,errorMessage);

    }
    return response;

}

function repositorySelectFromRequestBy(string requestBy)(message){
    message response = {};
    //map propertiesMap = getConnectionDetails();
    //sql:ClientConnector connection = create sql:ClientConnector(propertiesMap);
    //sql:ClientConnector connection = getConnection();
    if(connection == null){

        setConnection();
    }

    try{

        string query = "SELECT * FROM LM_REPOSITORY WHERE REPOSITORY_REQUEST_BY = ?";
        sql:Parameter paraName = {sqlType:"varchar", value:requestBy};
        sql:Parameter[] parameterArray = [paraName];

        datatable responseDataFromDb = connection.select(query ,parameterArray);
        var resultJSON,_ = <json>responseDataFromDb;


        messages:setJsonPayload(response,resultJSON);


    }catch(errors:Error err){
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        messages:setJsonPayload(response,errorMessage);

    }
    return response;

}

function organizationSelectAll()(message){
    message response = {};
    //map propertiesMap = getConnectionDetails();
    //sql:ClientConnector connection = create sql:ClientConnector(propertiesMap);


    //sql:ClientConnector connection = getConnection();
    if(connection == null){

        setConnection();
    }
    try{



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

function licenseSelectAll()(message){
    message response = {};
    //map propertiesMap = getConnectionDetails();
    //sql:ClientConnector connection = create sql:ClientConnector(propertiesMap);
    //sql:ClientConnector connection = getConnection();
    if(connection == null){

        setConnection();
    }
    try{



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

function teamSelectAll()(message){
    message response = {};
    //map propertiesMap = getConnectionDetails();
    //sql:ClientConnector connection = create sql:ClientConnector(propertiesMap);

    //sql:ClientConnector connection = getConnection();
    if(connection == null){

        setConnection();
    }
    try{



        string query = "SELECT * FROM LM_TEAM";
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

function componentSelectAll()(message){
    message response = {};

    if(connection == null){

        setConnection();
    }
    try{



        string query = "SELECT * FROM LM_COMPONENT";
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

function userSelectMainUsers()(message){
    message response = {};

    if(connection == null){

        setConnection();
    }
    try{



        string query = "SELECT * FROM LM_USER WHERE USER_PERMISSION = 'ALL' OR USER_PERMISSION = 'ACCEPT'";
        sql:Parameter[] parameterArray = [];
        system:println("call");
        datatable responseDataFromDb = connection.select(query ,parameterArray);
        system:println(responseDataFromDb);
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