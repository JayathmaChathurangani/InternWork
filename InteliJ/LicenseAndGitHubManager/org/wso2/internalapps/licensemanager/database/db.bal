package org.wso2.internalapps.licensemanager.database;

import ballerina.data.sql;
import ballerina.lang.messages;
import ballerina.lang.errors;
import ballerina.lang.system;
import org.wso2.internalapps.licensemanager.conf;

sql:ClientConnector connection = null;

function setConnection(){
    if(connection == null){

        string dbURL = conf:getConfigData("databaseUrl");
        string username = conf:getConfigData("databaseUserName");
        string password = conf:getConfigData("databasePassword");
        map propertiesMap = {"jdbcUrl":dbURL, "username":username, "password":password,"maximumPoolSize":100};
        connection = create sql:ClientConnector(propertiesMap);

    }

}

function repositoryInsertData(string name,string language,boolean buildable,boolean nexus,boolean private,string description,string groupId,int license,int team,int organization,int repoType,string requestBy)(int){

    message response = {};
    int returnValue;

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

function repositoryUpdateRejectDetails(string rejectBy,string rejectReason,int repositoryId)(int){
    message response = {};
    int returnValue;

    if(connection == null){

        setConnection();
    }
    try{


        string query = "UPDATE LM_REPOSITORY SET REPOSITORY_ACCEPT = ? , REPOSITORY_DEACTIVATED_BY = ? , REPOSITORY_DEACTIVATED_REASON = ? WHERE REPOSITORY_ID = ?";

        sql:Parameter paraAccept = {sqlType:"boolean", value:false};
        sql:Parameter paraRejectBy = {sqlType:"varchar", value:rejectBy};
        sql:Parameter paraRejectReason = {sqlType:"varchar", value:rejectReason};
        sql:Parameter paraRepositoryId = {sqlType:"integer", value:repositoryId};
        sql:Parameter[] parameterArray = [paraAccept,paraRejectBy,paraRejectReason,paraRepositoryId];

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
    int returnValue;

    if(connection == null){

        setConnection();
    }

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

    if(connection == null){

        setConnection();
    }
    try{

        string query = "SELECT
                        LM_REPOSITORY.*,
                        LM_LICENSE.LICENSE_NAME,
                        LM_LICENSE.LICENSE_KEY,
                        LM_ORGANIZATION.ORGANIZATION_NAME,
                        LM_REPOSITORYTYPE.REPOSITORYTYPE_KEY,
                        LM_REPOSITORYTYPE.REPOSITORYTYPE_NAME
                        FROM LM_REPOSITORY
                        INNER JOIN LM_LICENSE ON LM_REPOSITORY.REPOSITORY_LICENSE = LM_LICENSE.LICENSE_ID
                        INNER JOIN LM_ORGANIZATION ON LM_REPOSITORY.REPOSITORY_ORGANIZATION = LM_ORGANIZATION.ORGANIZATION_ID
                        INNER JOIN LM_REPOSITORYTYPE ON LM_REPOSITORY.REPOSITORY_TYPE = LM_REPOSITORYTYPE.REPOSITORYTYPE_ID
                        ORDER BY LM_REPOSITORY.REPOSITORY_NAME";
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

    if(connection == null){

        setConnection();
    }
    try{

        string query = "SELECT
        REPOSITORY_ID,
        REPOSITORY_NAME,
        REPOSITORY_LANGUAGE,
        REPOSITORY_BUILDABLE,
        REPOSITORY_NEXUS,
        REPOSITORY_PRIVATE ,
        REPOSITORY_DESCRIPTION,
        REPOSITORY_GROUPID,
        REPOSITORY_LICENSE,
        REPOSITORY_TEAM,
        REPOSITORY_ORGANIZATION,
        REPOSITORY_TYPE,
        REPOSITORY_ACTIVED,
        REPOSITORY_ACCEPT,
        REPOSITORY_REQUEST_BY,
        REPOSITORY_ACCEPTED_BY,
        REPOSITORY_DEACTIVATED_BY,
        REPOSITORY_DEACTIVATED_REASON,
        REPOSITORY_BPMN_TASK_ID,
        REPOSITORY_BPMN_PROCESS_ID
        FROM LM_REPOSITORY WHERE REPOSITORY_NAME = ? ";

        sql:Parameter paraName = {sqlType:"varchar", value:name};
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

function repositorySelectFromId(int id)(json){
    json response;

    if(connection == null){

        setConnection();
    }
    try{

        string query = "SELECT
                        LM_REPOSITORY.*,
                        LM_LICENSE.LICENSE_NAME,
                        LM_LICENSE.LICENSE_KEY,
                        LM_ORGANIZATION.ORGANIZATION_NAME,
                        LM_REPOSITORYTYPE.REPOSITORYTYPE_KEY,
                        LM_REPOSITORYTYPE.REPOSITORYTYPE_NAME
                        FROM LM_REPOSITORY
                        INNER JOIN LM_LICENSE ON LM_REPOSITORY.REPOSITORY_LICENSE = LM_LICENSE.LICENSE_ID
                        INNER JOIN LM_ORGANIZATION ON LM_REPOSITORY.REPOSITORY_ORGANIZATION = LM_ORGANIZATION.ORGANIZATION_ID
                        INNER JOIN LM_REPOSITORYTYPE ON LM_REPOSITORY.REPOSITORY_TYPE = LM_REPOSITORYTYPE.REPOSITORYTYPE_ID
                        WHERE REPOSITORY_ID=?;";

        sql:Parameter paraName = {sqlType:"integer", value:id};
        sql:Parameter[] parameterArray = [paraName];
        datatable responseDataFromDb = connection.select(query ,parameterArray);
        response,_ = <json>responseDataFromDb;


    }catch(errors:Error err){
        response = {"responseType":"Error","responseMessage":err.msg};


    }
    return response;

}

function repositorySelectFromRequestByAndWaiting(string requestBy)(message){
    message response = {};

    if(connection == null){

        setConnection();
    }

    try{

        string query = "SELECT
                        LM_REPOSITORY.*,
                        LM_LICENSE.LICENSE_NAME,
                        LM_LICENSE.LICENSE_KEY,
                        LM_ORGANIZATION.ORGANIZATION_NAME,
                        LM_REPOSITORYTYPE.REPOSITORYTYPE_KEY,
                        LM_REPOSITORYTYPE.REPOSITORYTYPE_NAME
                        FROM LM_REPOSITORY
                        INNER JOIN LM_LICENSE ON LM_REPOSITORY.REPOSITORY_LICENSE = LM_LICENSE.LICENSE_ID
                        INNER JOIN LM_ORGANIZATION ON LM_REPOSITORY.REPOSITORY_ORGANIZATION = LM_ORGANIZATION.ORGANIZATION_ID
                        INNER JOIN LM_REPOSITORYTYPE ON LM_REPOSITORY.REPOSITORY_TYPE = LM_REPOSITORYTYPE.REPOSITORYTYPE_ID
                        WHERE REPOSITORY_REQUEST_BY = ? AND REPOSITORY_ACCEPT IS NULL";

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

function repositorySelectWaitingRequests()(message){
    message response = {};

    if(connection == null){

        setConnection();
    }

    try{

        string query = "SELECT
                        LM_REPOSITORY.*,
                        LM_LICENSE.LICENSE_NAME,
                        LM_LICENSE.LICENSE_KEY,
                        LM_ORGANIZATION.ORGANIZATION_NAME,
                        LM_REPOSITORYTYPE.REPOSITORYTYPE_KEY,
                        LM_REPOSITORYTYPE.REPOSITORYTYPE_NAME
                        FROM LM_REPOSITORY
                        INNER JOIN LM_LICENSE ON LM_REPOSITORY.REPOSITORY_LICENSE = LM_LICENSE.LICENSE_ID
                        INNER JOIN LM_ORGANIZATION ON LM_REPOSITORY.REPOSITORY_ORGANIZATION = LM_ORGANIZATION.ORGANIZATION_ID
                        INNER JOIN LM_REPOSITORYTYPE ON LM_REPOSITORY.REPOSITORY_TYPE = LM_REPOSITORYTYPE.REPOSITORYTYPE_ID
                        WHERE REPOSITORY_ACCEPT IS NULL";


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

function organizationSelectAll()(message){
    message response = {};

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

function roleSelectRepositoryAdminUsers()(json){
    json response;

    if(connection == null){

        setConnection();
    }
    try{

        string query = "SELECT * FROM LM_ROLE WHERE ROLE_TYPE = 'REPOSITORY' AND ROLE_PERMISSION = 'ADMIN'";
        sql:Parameter[] parameterArray = [];
        datatable responseDataFromDb = connection.select(query ,parameterArray);
        response,_ = <json>responseDataFromDb;



    }catch(errors:Error err){
        response = {"responseType":"Error","responseMessage":err.msg};
        system:println(err);

    }
    return response;

}

function roleSelectRepositoryMainUsers()(json){
    json response;

    if(connection == null){

        setConnection();
    }
    try{

        string query = "SELECT * FROM LM_ROLE WHERE ROLE_TYPE = 'REPOSITORY'";
        sql:Parameter[] parameterArray = [];
        datatable responseDataFromDb = connection.select(query ,parameterArray);
        response,_ = <json>responseDataFromDb;



    }catch(errors:Error err){
        response = {"responseType":"Error","responseMessage":err.msg};
        system:println(err);

    }
    return response;

}

function roleRepositoryCheckAdminUsers(string email)(json ){
    json responseDbJson;
    json response;
    system:println("call fun");
    if(connection == null){

        setConnection();
    }
    try{



        string query = "SELECT * FROM LM_ROLE WHERE ROLE_EMAIL = ? AND ROLE_TYPE = 'REPOSITORY'";
        sql:Parameter paraEmail = {sqlType:"varchar", value:email};
        sql:Parameter[] parameterArray = [paraEmail];
        datatable responseDataFromDb = connection.select(query ,parameterArray);
        responseDbJson,_ = <json>responseDataFromDb;

        int length = lengthof responseDbJson;
        if(length > 0){
            response = responseDbJson;
        }else{
            response = [];
        }



    }catch(errors:Error err){
        response = {"responseType":"Error","responseMessage":err.msg};

        system:println(response);

    }
    return response;

}

function roleSelectLibraryMainUsers()(json){
    json response;

    if(connection == null){

        setConnection();
    }
    try{

        string query = "SELECT * FROM LM_ROLE WHERE ROLE_TYPE = 'LIBRARY'";
        sql:Parameter[] parameterArray = [];
        datatable responseDataFromDb = connection.select(query ,parameterArray);
        response,_ = <json>responseDataFromDb;



    }catch(errors:Error err){
        response = {"responseType":"Error","responseMessage":err.msg};
        system:println(err);

    }
    return response;

}

function roleSelectLibraryCategories()(json){
    json response;

    if(connection == null){

        setConnection();
    }
    try{

        string query = "SELECT DISTINCT(ROLE_LIB_TYPE) AS ROLE_LIB_TYPE FROM LM_ROLE WHERE ROLE_LIB_TYPE IS NOT NULL ORDER BY ROLE_LIB_TYPE ASC;";
        sql:Parameter[] parameterArray = [];
        datatable responseDataFromDb = connection.select(query ,parameterArray);
        response,_ = <json>responseDataFromDb;



    }catch(errors:Error err){
        response = {"responseType":"Error","responseMessage":err.msg};
        system:println(err);

    }
    return response;

}

function roleGetUserDetails(string email)(json ){
    json responseDbJson;
    json response;
    system:println("call fun" + email);
    if(connection == null){

        setConnection();
    }
    try{



        string query = "SELECT * FROM LM_ROLE WHERE ROLE_EMAIL = ?";
        sql:Parameter paraEmail = {sqlType:"varchar", value:email};
        sql:Parameter[] parameterArray = [paraEmail];
        datatable responseDataFromDb = connection.select(query ,parameterArray);
        responseDbJson,_ = <json>responseDataFromDb;
        system:println(responseDbJson);
        int length = lengthof responseDbJson;
        if(length > 0){
            response = responseDbJson;
        }else{
            response = [];
        }



    }catch(errors:Error err){
        response = {"responseType":"Error","responseMessage":err.msg};

        system:println(response);

    }
    return response;

}

function jenkinsFolderMatchRegex(string jenkinsJobName)(json ){
    json responseDbJson;
    json response;

    if(connection == null){

        setConnection();
    }
    try{



        string query = "CALL JENKINS_GET_FOLDER(?)";
        sql:Parameter paraJenkinsJobName = {sqlType:"varchar", value:jenkinsJobName};
        sql:Parameter[] parameterArray = [paraJenkinsJobName];
        datatable responseDataFromDb = connection.select(query ,parameterArray);
        responseDbJson,_ = <json>responseDataFromDb;

        response = responseDbJson;




    }catch(errors:Error err){
        response = {"responseType":"Error","responseMessage":err.msg};

        system:println(response);

    }
    return response;

}

function componentInsertData(string key,string url)(int){

    message response = {};
    int returnValue;

    if(connection == null){
        setConnection();
    }


    try{

        string query = "INSERT INTO LM_COMPONENT(
                                                    COMP_KEY,
                                                    COMP_NAME,
                                                    COMP_TYPE,
                                                    COMP_URL,
                                                    COMP_FILE_NAME
                                                  )
                                                   VALUES (?,?,?,?,?)";

        sql:Parameter paraKey = {sqlType:"varchar", value:key};
        sql:Parameter paraName = {sqlType:"varchar", value:key};
        sql:Parameter paraType = {sqlType:"boolean", value:"bundle"};
        sql:Parameter paraUrl = {sqlType:"boolean", value:url};
        sql:Parameter paraFileName = {sqlType:"boolean", value:key};


        sql:Parameter[] parameterArray = [paraKey,paraName,paraType,paraUrl,paraFileName];

        returnValue = connection.update(query,parameterArray);
    }catch(errors:Error err){
        returnValue = -1;

    }

    return returnValue;


}

function libraryAndRequestSelectFromNameAndVersion(string libraryName,string libraryVersion)(json){
    json response;

    if(connection == null){

        setConnection();
    }

    try{

        string query = "(SELECT LIB_ID,LIB_NAME,LIB_VERSION FROM LM_LIBRARY WHERE LIB_NAME=? AND LIB_VERSION=?) UNION
        (SELECT LIBREQUEST_ID,LIBREQUEST_NAME,LIBREQUEST_USE_VERSION FROM LM_LIBREQUEST WHERE LIBREQUEST_NAME=? AND LIBREQUEST_USE_VERSION=?);";

        sql:Parameter paraLibraryName = {sqlType:"varchar", value:libraryName};
        sql:Parameter paraLibraryVersion = {sqlType:"varchar", value:libraryVersion};
        sql:Parameter[] parameterArray = [paraLibraryName,paraLibraryVersion,paraLibraryName,paraLibraryVersion];
        datatable responseDataFromDb = connection.select(query ,parameterArray);
        response,_ = <json>responseDataFromDb;



    }catch(errors:Error err){
        response = {"responseType":"Error","responseMessage":err.msg};


    }
    return response;

}

function librarySelectTypes()(json){
    json response;

    if(connection == null){

        setConnection();
    }

    try{

        string query = "SELECT DISTINCT(LIB_TYPE) AS LIB_TYPE FROM LM_LIBRARY ORDER BY LIB_TYPE ASC";
        sql:Parameter[] parameterArray = [];
        datatable responseDataFromDb = connection.select(query ,parameterArray);
        response,_ = <json>responseDataFromDb;

    }catch(errors:Error err){
        response = {"responseType":"Error","responseMessage":err.msg};


    }
    return response;

}

function libraryRequestInsertData(string name,string libType,string category,string useVersion,string latestVersion,string fileName,string company,boolean sponsored,string purpose,string description,string alternatives,string requestBy)(int){

    int returnValue;

    if(connection == null){
        setConnection();
    }


    try{

        string query = "INSERT INTO LM_LIBREQUEST(
                                                    LIBREQUEST_NAME,
                                                    LIBREQUEST_TYPE,
                                                    LIBREQUEST_CATEGORY,
                                                    LIBREQUEST_USE_VERSION,
                                                    LIBREQUEST_LATEST_VERSION,
                                                    LIBREQUEST_FILE_NAME,
                                                    LIBREQUEST_COMPANY,
                                                    LIBREQUEST_SPONSORED,
                                                    LIBREQUEST_PURPOSE,
                                                    LIBREQUEST_DESCRIPTION,
                                                    LIBREQUEST_ALTERNATIVES,
                                                    LIBREQUEST_REQUESTED_BY
                                                  )
                                                   VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";

        sql:Parameter paraName = {sqlType:"varchar", value:name};
        sql:Parameter paraType = {sqlType:"varchar", value:libType};
        sql:Parameter paraCategory = {sqlType:"varchar", value:category};
        sql:Parameter paraUseVersion = {sqlType:"varchar", value:useVersion};
        sql:Parameter paraLatestVersion = {sqlType:"varchar", value:latestVersion};
        sql:Parameter paraFileName = {sqlType:"varchar", value:fileName};
        sql:Parameter paraCompany = {sqlType:"varchar", value:company};
        sql:Parameter paraSponsored = {sqlType:"boolean", value:sponsored};
        sql:Parameter paraPurpose = {sqlType:"varchar", value:purpose};
        sql:Parameter paraDescription = {sqlType:"varchar", value:description};
        sql:Parameter paraAlternatives = {sqlType:"varchar", value:alternatives};
        sql:Parameter paraRequestBy = {sqlType:"varchar", value:requestBy};


        sql:Parameter[] parameterArray = [
                                             paraName,
                                             paraType,
                                             paraCategory,
                                             paraUseVersion,
                                             paraLatestVersion,
                                             paraFileName,
                                             paraCompany,
                                             paraSponsored,
                                             paraPurpose,
                                             paraDescription,
                                             paraAlternatives,
                                             paraRequestBy
                                         ];

        returnValue = connection.update(query,parameterArray);
    }catch(errors:Error err){
        returnValue = -1;
        system:println(err);

    }

    return returnValue;


}

function libraryInsertData(string name,string libType,string useVersion,string fileName,string description)(int){

    int returnValue;
    if(connection == null){
        setConnection();
    }


    try{

        string query = "INSERT INTO LM_LIBRARY(
                                                    LIB_NAME,
                                                    LIB_TYPE,
                                                    LIB_VERSION,
                                                    LIB_FILE_NAME,
                                                    LIB_DESCRIPTION
                                              )
                                               VALUES (?,?,?,?,?)";

        sql:Parameter paraName = {sqlType:"varchar", value:name};
        sql:Parameter paraType = {sqlType:"varchar", value:libType};
        sql:Parameter paraUseVersion = {sqlType:"varchar", value:useVersion};
        sql:Parameter paraFileName = {sqlType:"varchar", value:fileName};
        sql:Parameter paraDescription = {sqlType:"varchar", value:description};

        sql:Parameter[] parameterArray = [
                                             paraName,
                                             paraType,
                                             paraUseVersion,
                                             paraFileName,
                                             paraDescription
                                         ];

        returnValue = connection.update(query,parameterArray);
    }catch(errors:Error err){
        returnValue = -1;

    }

    return returnValue;


}

function libraryRequestSelectFromNameAndVersion(string libraryName,string libraryVersion)(json){
    json response;

    if(connection == null){

        setConnection();
    }

    try{

        string query = "SELECT * FROM LM_LIBREQUEST WHERE LIBREQUEST_NAME = ? AND LIBREQUEST_USE_VERSION = ?";

        sql:Parameter paraLibraryName = {sqlType:"varchar", value:libraryName};
        sql:Parameter paraLibraryVersion = {sqlType:"varchar", value:libraryVersion};
        sql:Parameter[] parameterArray = [paraLibraryName,paraLibraryVersion];
        datatable responseDataFromDb = connection.select(query ,parameterArray);
        response,_ = <json>responseDataFromDb;



    }catch(errors:Error err){
        response = {"responseType":"Error","responseMessage":err.msg};


    }
    return response;

}