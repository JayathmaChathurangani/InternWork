package src;

import ballerina.net.http;

import ballerina.lang.messages;
import org.wso2.ballerina.connectors.gmail;
import ballerina.lang.jsons;
import ballerina.lang.errors;






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

            string to = " ";
            string subject = "GitHub Repository Request";
            string from = "webmisproject@gmail.com";
            string messageBody = " ";
            string cc = "";
            string bcc = "";
            string id = "";
            string threadId = "";

            json requestDataJson = messages:getJsonPayload(m);
            int lengthOfRequestArray = lengthof requestDataJson.columns;
            int i = 0;

            while (i < lengthOfRequestArray) {
                messageBody = messageBody + jsons:toString(requestDataJson.columns[i]) + " : " + jsons:toString(requestDataJson.data[i]) + "\n";
                i = i + 1;
            }




            http:ClientConnector httpConnector = create http:ClientConnector("http://localhost:9090/databaseService");
            message requestDataFromDb = {};
            json requestDataFromDbJson =  {"tableName":"LM_USER","select":"USER_EMAIL","condition":"WHERE USER_PERMISSION = 'ALL' OR USER_PERMISSION = 'ACCEPT'"};
            messages:setJsonPayload(requestDataFromDb,requestDataFromDbJson);
            message responseDataFromDb = httpConnector.post("/select",requestDataFromDb);
            json responseDataFromDbJson = messages:getJsonPayload(responseDataFromDb);


            i = 0;
            int lengthOfDataArray = lengthof responseDataFromDbJson;
            while (i < lengthOfDataArray) {
                to = to + jsons:toString(responseDataFromDbJson[i].USER_EMAIL) + ",";
                i = i + 1;
            }


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
