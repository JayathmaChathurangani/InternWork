package org.wso2.internalapps.licensemanager.services;

import ballerina.net.http;
import ballerina.lang.strings;
import ballerina.utils;
import ballerina.lang.jsons;
import ballerina.lang.time;
import ballerina.lang.errors;
import ballerina.lang.system;
import ballerina.lang.messages;
import org.wso2.internalapps.licensemanager.database;

http:Session userSession = null;
string sessionId;

function validateUser(message request)(message){

    string email = "";
    string epocTimeString = "";
    string[] webTokenArray;
    string dencodedString;
    string webToken;
    string roleLibType;
    string rolePermission;
    int epocTime;
    int currentTimeInt;
    json decodedJson;
    json requestJson;
    json returnJson;
    json responseJson;
    json userLibraryPermissionJson;
    json userLibraryPermissionJsonArray = [];
    boolean isValid = false;
    boolean isRepositoryAdmin = false;
    int i = 0;
    int returnJsonLength = 0;
    int userLibraryPermissionJsonArrayLength;

    try{
        requestJson = messages:getJsonPayload(request);
        webToken = jsons:toString(requestJson.token);
        responseJson = {"isValid":false,"userEmail":""};
        webTokenArray= strings:split(webToken,"\\.");
        dencodedString = utils:base64decode(webTokenArray[1]);
        decodedJson = jsons:parse(dencodedString);
        email = jsons:toString(decodedJson["http://wso2.org/claims/emailaddress"]);
        epocTimeString = jsons:toString(decodedJson["exp"]);
        epocTime,_ = <int>epocTimeString;
        time:Time currentTime = time:currentTime();
        currentTimeInt = currentTime.time / 1000;
        if((strings:hasSuffix(email,"@wso2.com")) && (currentTimeInt < (epocTime + 86400)) ){
            userSession = http:createSessionIfAbsent(request);
            returnJson = database:roleGetUserDetails(email);
            returnJsonLength = lengthof returnJson;
            while(i<returnJsonLength){
                if(jsons:toString(returnJson[i].ROLE_TYPE) == "REPOSITORY" && jsons:toString(returnJson[i].ROLE_PERMISSION) == "ADMIN"){
                    isRepositoryAdmin = true;

                }
                if(jsons:toString(returnJson[i].ROLE_TYPE) == "LIBRARY"){
                    roleLibType = jsons:toString(returnJson[i].ROLE_LIB_TYPE);
                    rolePermission = jsons:toString(returnJson[i].ROLE_PERMISSION);
                    userLibraryPermissionJson = {
                                                    "roleType":"LIBRARY",
                                                    "roleLibType":roleLibType,
                                                    "rolePermission":rolePermission
                                                };
                    userLibraryPermissionJsonArrayLength = lengthof userLibraryPermissionJsonArray;
                    userLibraryPermissionJsonArray[userLibraryPermissionJsonArrayLength] = userLibraryPermissionJson;



                }
                i = i + 1;
            }
            isValid = true;
            http:setAttribute(userSession,"isValid",isValid);
            http:setAttribute(userSession,"userEmail",email);
            http:setAttribute(userSession,"loginTime",epocTime);
            http:setAttribute(userSession,"isRepositoryAdmin",isRepositoryAdmin);
            http:setAttribute(userSession,"libraryUserDetails",userLibraryPermissionJsonArray);
            sessionId = http:getId(userSession);
            system:println("post "+sessionId);
            responseJson = {"isValid":isValid,"isRepositoryAdmin":isRepositoryAdmin,"libraryUserDetails":userLibraryPermissionJsonArray,"userEmail":email};

        }else{
            userSession = null;
            isValid = false;
            responseJson = {"isValid":isValid,"isRepositoryAdmin":isRepositoryAdmin,"libraryUserDetails":userLibraryPermissionJsonArray,"userEmail":""};

        }
    }catch(errors:Error err){
        isValid = false;
        responseJson = {"isValid":isValid,"isRepositoryAdmin":isRepositoryAdmin,"libraryUserDetails":userLibraryPermissionJsonArray,"userEmail":""};
    }

    messages:setJsonPayload(request,responseJson);
    return request;

}

function getIsValidUser ()(boolean returnIsValid)  {

    boolean isValidUser;
    time:Time currentTime = time:currentTime();
    int currentTimeInt;
    int epocTimeInt;
    currentTimeInt = currentTime.time / 1000;

    try{
        if(userSession != null){

            isValidUser,_ = (boolean )http:getAttribute(userSession,"isValid");
            epocTimeInt,_ = (int)http:getAttribute(userSession,"loginTime");

            if((isValidUser == true) && (currentTimeInt < (epocTimeInt + 86400))){

                returnIsValid = true;
                return;
            }else {

                returnIsValid = false;

            }
        }else{

            returnIsValid = false;

        }
    }catch(errors:Error err){
        returnIsValid = false;


    }
    return;


}

function getIsRepositoryAdminUser ()(boolean returnIsAdmin)  {

    boolean isValidUser;
    boolean isRepositoryAdminUser;
    time:Time currentTime = time:currentTime();
    int currentTimeInt;
    int epocTimeInt;
    currentTimeInt = currentTime.time / 1000;
    system:println("call admin");
    try{
        if(userSession != null){
            isRepositoryAdminUser, _ = (boolean )http:getAttribute(userSession,"isRepositoryAdmin");
            isValidUser,_ = (boolean )http:getAttribute(userSession,"isValid");
            epocTimeInt,_ = (int)http:getAttribute(userSession,"loginTime");
            system:println(userSession);
            system:println(isRepositoryAdminUser);
            if((isRepositoryAdminUser == true) && (isValidUser == true) && (currentTimeInt < (epocTimeInt + 86400))){

                returnIsAdmin = true;
                return;
            }else {

                returnIsAdmin = false;

            }
        }else{

            returnIsAdmin = false;

        }
    }catch(errors:Error err){
        returnIsAdmin = false;


    }
    return;


}

function getSessionDetails()(json sessionDetails){
    string email;
    try{
        if(userSession != null){
            email,_ = (string) http:getAttribute(userSession,"userEmail");
            sessionDetails = {"userEmail":email};
        }else{
            sessionDetails = {"userEmail":null};
        }
    }catch(errors:Error err){
        sessionDetails = {"userEmail":null};


    }



    return;
}