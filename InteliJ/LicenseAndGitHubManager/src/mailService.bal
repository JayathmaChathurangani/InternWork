package src;

import ballerina.net.http;

import ballerina.lang.messages;
import org.wso2.ballerina.connectors.gmail;
import ballerina.lang.jsons;
import ballerina.lang.errors;
import ballerina.lang.strings;


@http:configuration {basePath:"/mailService"}
service<http> mailService {

    string URL = "http://localhost:9090/databaseService/";
    @http:POST {}
    @http:Path {value:"/sendMail"}
    resource sendMail (message m) {

        message response = {};

        try{
            string clientId = "1072671897981-3gi0mlt4f7nlqdird9knbgoeoj8ulf5s.apps.googleusercontent.com";
            string clientSecret = "NcimadTUT67Xi6AZlU8D5ojw";
            string userId = "buddhik@wso2.com";
            string accessToken = "ya29.Glu5BCgLXyUejwtx3gU73n7YV8yw7lrF2stu9T7M-Tuu1rsPEn1nKxWnR1sZWTMMVxoX77NpZelTVXz_gKn0WTAAbffq8L1BpwJJFb0WY_W9m_xaDRt6Td65aQh5";
            string refreshToken = "1/yQqXYfemqis8b-zPOavGksfCJ2vaXc7kKhB4Xc_JAaw";
            gmail:ClientConnector gmailConnector = create gmail:ClientConnector(userId,accessToken,refreshToken,clientId,clientSecret);

            http:ClientConnector httpConnector = create http:ClientConnector("http://localhost:9090/databaseService");
            message requestDataFromDb = {};
            json requestDataFromDbJson;
            message responseDataFromDb = {};
            json responseDataFromDbJson;
            string condition;
            string description;

            string to = " ";
            string subject = "GitHub Repository Request";
            string from = "webmisproject@gmail.com";
            string messageBody = "";
            string cc = "";
            string bcc = "";
            string id = "";
            string threadId = "";

            json requestDataJson = messages:getJsonPayload(m);
            int lengthOfRequestArray = lengthof requestDataJson.columns;
            int i = 0;

            //change IDs of the content into real values which stored in DB
            while (i < lengthOfRequestArray) {

                if(strings:trim(jsons:toString(requestDataJson.data[i])) == "false"){
                    messageBody = messageBody + jsons:toString(requestDataJson.columns[i]) + " : " + "No" + "\n";
                    i = i + 1;
                    continue;
                }

                if(strings:trim(jsons:toString(requestDataJson.data[i])) == "true"){
                    messageBody = messageBody + jsons:toString(requestDataJson.columns[i]) + " : " + "Yes" + "\n";
                    i = i + 1;
                    continue;
                }
                if(strings:trim(jsons:toString(requestDataJson.columns[i])) == "License"){
                    condition = "WHERE LICENSE_ID = '" + jsons:toString(requestDataJson.data[i]) + "' ";
                    requestDataFromDbJson =  {"tableName":"LM_LICENSE","select":"LICENSE_NAME","condition":condition};
                    messages:setJsonPayload(requestDataFromDb,requestDataFromDbJson);
                    responseDataFromDb = httpConnector.post("/select",requestDataFromDb);
                    responseDataFromDbJson = messages:getJsonPayload(responseDataFromDb);
                    messageBody = messageBody + jsons:toString(requestDataJson.columns[i]) + " : " + jsons:toString(responseDataFromDbJson[0].LICENSE_NAME) + "\n";
                    i = i + 1;
                    continue;
                }

                if(strings:trim(jsons:toString(requestDataJson.columns[i])) == "Team"){
                    condition = "WHERE TEAM_ID = '" + jsons:toString(requestDataJson.data[i]) + "' ";
                    requestDataFromDbJson =  {"tableName":"LM_TEAM","select":"TEAM_NAME","condition":condition};
                    messages:setJsonPayload(requestDataFromDb,requestDataFromDbJson);
                    responseDataFromDb = httpConnector.post("/select",requestDataFromDb);
                    responseDataFromDbJson = messages:getJsonPayload(responseDataFromDb);
                    messageBody = messageBody + jsons:toString(requestDataJson.columns[i]) + " : " + jsons:toString(responseDataFromDbJson[0].TEAM_NAME) + "\n";
                    i = i + 1;
                    continue;
                }

                if(strings:trim(jsons:toString(requestDataJson.columns[i])) == "Organization"){
                    condition = "WHERE ORGANIZATION_ID = '" + jsons:toString(requestDataJson.data[i]) + "' ";
                    requestDataFromDbJson =  {"tableName":"LM_ORGANIZATION","select":"ORGANIZATION_NAME","condition":condition};
                    messages:setJsonPayload(requestDataFromDb,requestDataFromDbJson);
                    responseDataFromDb = httpConnector.post("/select",requestDataFromDb);
                    responseDataFromDbJson = messages:getJsonPayload(responseDataFromDb);
                    messageBody = messageBody + jsons:toString(requestDataJson.columns[i]) + " : " + jsons:toString(responseDataFromDbJson[0].ORGANIZATION_NAME) + "\n";
                    i = i + 1;
                    continue;
                }

                if(strings:trim(jsons:toString(requestDataJson.columns[i])) == "Type"){
                    condition = "WHERE REPOSITORYTYPE_ID = '" + jsons:toString(requestDataJson.data[i]) + "' ";
                    requestDataFromDbJson =  {"tableName":"LM_REPOSITORYTYPE","select":"REPOSITORYTYPE_NAME","condition":condition};
                    messages:setJsonPayload(requestDataFromDb,requestDataFromDbJson);
                    responseDataFromDb = httpConnector.post("/select",requestDataFromDb);
                    responseDataFromDbJson = messages:getJsonPayload(responseDataFromDb);
                    messageBody = messageBody + jsons:toString(requestDataJson.columns[i]) + " : " + jsons:toString(responseDataFromDbJson[0].REPOSITORYTYPE_NAME) + "\n";
                    i = i + 1;
                    continue;
                }

                if(strings:trim(jsons:toString(requestDataJson.columns[i])) == "Description"){
                    description = jsons:toString(requestDataJson.columns[i]) + " for README: " + jsons:toString(requestDataJson.data[i]) + "\n";
                    i = i + 1;
                    continue;
                }
                messageBody = messageBody + jsons:toString(requestDataJson.columns[i]) + " : " + jsons:toString(requestDataJson.data[i]) + "\n";

                i = i + 1;
            }

            //end change IDs of the content into real values which stored in DB

            //set mail receivers
            condition = "WHERE USER_PERMISSION = 'ALL' OR USER_PERMISSION = 'ACCEPT'";
            requestDataFromDbJson =  {"tableName":"LM_USER","select":"USER_EMAIL,USER_NAME","condition":condition};
            messages:setJsonPayload(requestDataFromDb,requestDataFromDbJson);
            responseDataFromDb = httpConnector.post("/select",requestDataFromDb);
            responseDataFromDbJson = messages:getJsonPayload(responseDataFromDb);
            string mailGreeting = "Hi ";

            i = 0;
            int lengthOfDataArray = lengthof responseDataFromDbJson;
            while (i < lengthOfDataArray) {

                if(i == (lengthOfDataArray-1)){

                    to = to + jsons:toString(responseDataFromDbJson[i].USER_EMAIL);
                    mailGreeting = mailGreeting + jsons:toString(responseDataFromDbJson[i].USER_NAME);
                    i = i + 1;
                    continue;
                }
                mailGreeting = mailGreeting + jsons:toString(responseDataFromDbJson[i].USER_NAME) + ",";
                to = to + jsons:toString(responseDataFromDbJson[i].USER_EMAIL) + ",";
                i = i + 1;
            }

            //set mail receivers ends

            //set cc

            condition = "WHERE USER_PERMISSION = 'REJECT' OR USER_PERMISSION = 'READ'";
            requestDataFromDbJson =  {"tableName":"LM_USER","select":"USER_EMAIL","condition":condition};
            messages:setJsonPayload(requestDataFromDb,requestDataFromDbJson);
            responseDataFromDb = httpConnector.post("/select",requestDataFromDb);
            responseDataFromDbJson = messages:getJsonPayload(responseDataFromDb);


            i = 0;
            lengthOfDataArray = lengthof responseDataFromDbJson;
            while (i < lengthOfDataArray) {

                if(i == (lengthOfDataArray-1)){

                    cc = cc + jsons:toString(responseDataFromDbJson[i].USER_EMAIL);
                    i = i + 1;
                    continue;
                }
                cc = cc + jsons:toString(responseDataFromDbJson[i].USER_EMAIL) + ",";
                i = i + 1;
            }
            //set cc ends

            //set other mail content
            string mailBodyMessage = "Please note that, We need to create a GitHub repository according to following details \n\n\n";
            string acceptLink = " https://clickme.com";
            string mailLinkMessage = "\n\nNote: \nTo confirm request please click this link below \n\n Link : " + acceptLink + " \n\n\n Thank You!!";
            messageBody = mailGreeting + " !" + "\n\n\n" + mailBodyMessage + messageBody + description + mailLinkMessage;

            //set other mail content ends
            message gmailResponse;
            gmailResponse = gmail:ClientConnector.sendMail(gmailConnector,to, subject, from, messageBody, cc, bcc, id, threadId);

            json responseMessage = {"type":"done"};
            messages:setJsonPayload(response,responseMessage);
            reply response;
        }catch(errors:Error err){
            json errorMessage = {"type":"Error","message":err.msg};
            messages:setJsonPayload(response,errorMessage);
            reply response;
        }

    }
}
