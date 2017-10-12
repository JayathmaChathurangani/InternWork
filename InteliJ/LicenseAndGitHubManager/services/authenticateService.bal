package services;

import ballerina.net.http;
import ballerina.lang.strings;
import ballerina.utils;
import ballerina.lang.jsons;
import ballerina.lang.time;
import database;
import ballerina.lang.system;

http:Session userSession;

function validateUser(string webToken)(boolean isValid){
    string email = "";
    string epocTimeString = "";
    string[] webTokenArray;
    string dencodedString;
    int epocTime;
    int currentTimeInt;
    json decodedJson;
    message sessionMessage = {};

    webTokenArray= strings:split(webToken,"\\.");
    dencodedString = utils:base64decode(webTokenArray[1]);
    decodedJson = jsons:parse(dencodedString);

    system:println(decodedJson);
    email = jsons:toString(decodedJson["http://wso2.org/claims/emailaddress"]);
    epocTimeString = jsons:toString(decodedJson["exp"]);
    epocTime,_ = <int>epocTimeString;
    time:Time currentTime = time:currentTime();
    currentTimeInt = currentTime.time / 1000;
    system:println(email);
    system:println(epocTime);
    system:println(currentTimeInt);
    if((strings:hasSuffix(email,"@wso2.com")) && (currentTimeInt < (epocTime + 108000))){
        userSession = http:createSessionIfAbsent(sessionMessage);
        http:setAttribute(userSession,"userEmail",email);
        http:setAttribute(userSession,"loginTime",epocTime);
        isValid = true;
        return;

    }else{
        userSession = null;
        isValid = false;
        return;
    }
}

function isAdminUser(string webToken)(boolean isAdmin){
    string email = "";
    string[] webTokenArray;
    string dencodedString;
    json decodedJson;
    json returnJson;
    boolean isAdminFromDb = false;

    if(!validateUser(webToken)){
        isAdmin = false;
        return;
    }

    webTokenArray= strings:split(webToken,"\\.");
    dencodedString = utils:base64decode(webTokenArray[1]);
    decodedJson = jsons:parse(dencodedString);
    email = jsons:toString(decodedJson["http://wso2.org/claims/emailaddress"]);

    returnJson = database:userCheckAdminUsers(email);
    isAdminFromDb,_ = <boolean>jsons:toString(returnJson.isAdmin);
    if(isAdminFromDb){
        isAdmin = true;
        return;
    }else{
        isAdmin = false;
        return;
    }

}