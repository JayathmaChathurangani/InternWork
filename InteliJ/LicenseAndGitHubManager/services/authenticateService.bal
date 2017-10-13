package services;

import ballerina.net.http;
import ballerina.lang.strings;
import ballerina.utils;
import ballerina.lang.jsons;
import ballerina.lang.time;
import database;



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


    email = jsons:toString(decodedJson["http://wso2.org/claims/emailaddress"]);
    epocTimeString = jsons:toString(decodedJson["exp"]);
    epocTime,_ = <int>epocTimeString;
    time:Time currentTime = time:currentTime();
    currentTimeInt = currentTime.time / 1000;

    if((strings:hasSuffix(email,"@wso2.com")) && (currentTimeInt < (epocTime + 86400))){

        userSession = http:createSessionIfAbsent(sessionMessage);
        isValid = true;
        http:setAttribute(userSession,"isValid",isValid);
        http:setAttribute(userSession,"userEmail",email);
        http:setAttribute(userSession,"loginTime",epocTime);
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
        http:setAttribute(userSession,"isValid",isAdmin);
        return;
    }else{
        isAdmin = false;
        return;
    }

}

function getIsValidUser ()(boolean returnIsValid)  {
    boolean isValidUser;
    time:Time currentTime = time:currentTime();
    int currentTimeInt;
    int epocTimeInt;
    currentTimeInt = currentTime.time / 1000;
    if(userSession != null){
        isValidUser,_ = (boolean )http:getAttribute(userSession,"isValid");
        epocTimeInt,_ = (int)http:getAttribute(userSession,"loginTime");
        if((isValidUser == true) && (currentTimeInt < (epocTimeInt + 86400))){
            returnIsValid = true;
            return;
        }else {
            returnIsValid = false;
            return;
        }
    }else{
        returnIsValid = false;
        return;
    }

}