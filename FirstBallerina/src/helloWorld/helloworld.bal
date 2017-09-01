package src.helloWorld;

import org.wso2.ballerina.connectors.gmail;


function main (string[] args) {

    string clientId = "696591665753-49inll1lr69edbemnec5g5ojckskisku.apps.googleusercontent.com";
    string clientSecret = "gez-cSNi7rFjqUUXrOJzX_15";
    string userId = "webmisproject@gmail.com";
    string accessToken = "ya29.Glu4BBErs86ZM8EQWetW9y8hqJ0gPq-DA9-qabzDpid-h2Yog9Fh4XaSEKYDOUhvknuQtR_8Cp8jQGMJeLIZcYF0SsCqmjnhYkr75ClPpiti-J6Six0aFpTgyjPr";
    string refreshToken = "4/4Tp1Y4iq-G7poM8lc-y8t5M9g3-azIOzBT8eMqvyy00";
    gmail:ClientConnector gmailConnector = create gmail:ClientConnector(userId,accessToken,refreshToken,clientId,clientSecret);

    string to = "b.wathsala.bw@gmail.com";
    string subject = "Test Mail";
    string from = "webmisproject@gmail.com";
    string messageBody = "Hello Buddhi";
    string cc = "";
    string bcc = "";
    string id = "";
    string threadId = "";
    message gmailResponse;
    json gmailJSONResponse;

    gmail:ClientConnector.sendMail(gmailConnector,to,subject,from,messageBody,cc,bcc,id,threadId);


    //gmailJSONResponse = messages:getJsonPayload(gmailResponse);

    //system:println(gmailJSONResponse);

}
