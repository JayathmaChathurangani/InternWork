package services;

import ballerina.net.http;
import ballerina.lang.strings;
import ballerina.utils;
import ballerina.lang.jsons;
import ballerina.lang.time;

import ballerina.lang.errors;
import ballerina.lang.system;
import ballerina.lang.messages;


http:Session userSession;
string sessionId = "";

function validateUser(string webToken)(json responseJson){

    string email = "";
    string epocTimeString = "";
    string[] webTokenArray;
    string dencodedString;

    int epocTime;
    int currentTimeInt;
    json decodedJson;
    //message sessionMessage = {};
    boolean isValid = false;

    try{
        responseJson = {"isValid":false,"userEmail":""};
        webTokenArray= strings:split(webToken,"\\.");
        dencodedString = utils:base64decode(webTokenArray[1]);
        decodedJson = jsons:parse(dencodedString);
        email = jsons:toString(decodedJson["http://wso2.org/claims/emailaddress"]);
        epocTimeString = jsons:toString(decodedJson["exp"]);
        epocTime,_ = <int>epocTimeString;
        time:Time currentTime = time:currentTime();
        currentTimeInt = currentTime.time / 1000;

        if((strings:hasSuffix(email,"@wso2.com")) && (currentTimeInt < (epocTime + 86400))){
            system:println("call if");
            message sessionMessage  = {};
            messages:setHeader(sessionMessage,"Cookie",sessionId);
            system:println("ss" + sessionId);
            userSession = http:createSessionIfAbsent(sessionMessage);
            system:println("1");
            isValid = true;

            //http:setAttribute(userSession,"isValid",isValid);
            //http:setAttribute(userSession,"userEmail",email);
            //http:setAttribute(userSession,"loginTime",epocTime);
            system:println("2");
            sessionId = "BSESSIONID=" + http:getId(userSession);

            responseJson = {"isValid":isValid,"userEmail":email};

        }else{
            userSession = null;
            isValid = false;
            responseJson = {"isValid":isValid,"userEmail":""};
            system:println("call else");
        }
    }catch(errors:Error err){
        isValid = false;
        responseJson = {"isValid":isValid,"userEmail":""};
        system:println("call catch");
        system:println(err);
    }

    system:println(responseJson);
    return;

}

