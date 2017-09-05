



import org.wso2.ballerina.connectors.gmail;



function main (string[] args) {


    string clientId = "822748394482-4k12ivqpdq5kfui478kgeuvc9ro9178o.apps.googleusercontent.com";
    string clientSecret = "jZOAUUYBm3JFiBkbksZ4BaAy";
    string userId = "b.wathsala.bw@gmail.com";
    string accessToken = "ya29.Glu6BMp-dqT0Qv7DAHpALWWjTk9cqXswuOVY8bKBA4AMPhd59dIMTkjvGdW-dW1LcMmAXp6z9hDlKsKqPlQiqpFFdYrw6rINt6AdJR33ljaKRLTv9v9_tCLq5wZa";
    string refreshToken = "1/lq-I6zdb8qO98cPX2-Sbk2Wftw1nY8jvPxHZ2ExircAoptbwkmD7S_KTHXulGRqT";
    gmail:ClientConnector gmailConnector = create gmail:ClientConnector(userId,accessToken,refreshToken,clientId,clientSecret);

    string to = "buddhik@wso2.com";
    string subject = "Test Mail";
    string from = "b.wathsala.bw@gmail.com";
    string messageBody = "Hello Ishi!!";
    string cc = "";
    string bcc = "";
    string id = "";
    string threadId = "";
    message gmailResponse;
    json gmailJSONResponse;

    gmailResponse = gmailConnector.sendMail(to, subject, from, messageBody, cc, bcc, id, threadId);

    //gmail:ClientConnector.sendMail(gmailConnector,to, subject, from, messageBody, cc, bcc, id, threadId));
    ////gmailResponse = gmailConnector.sendMail(to,subject,from,messageBody,cc,bcc,id,threadId);

    //gmailJSONResponse = messages:getJsonPayload(gmailResponse);


    //system:println(gmailJSONResponse);
    //system:println("hello");

}
