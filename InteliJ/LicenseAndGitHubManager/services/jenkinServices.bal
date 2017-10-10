package services;


import ballerina.lang.messages;
import ballerina.net.http;
import ballerina.lang.errors;
import ballerina.lang.files;
import ballerina.lang.blobs;
import ballerina.lang.xmls;
import ballerina.lang.system;

string jenkinsUrl = "http://localhost:8080/";

function createJenkinsJob(string jenkinsJobName,string jenkinsJobType)(json ){
    message responseJenkins = {};
    json response;
    try{

        string fileName = "./conf/" + jenkinsJobType + "JenkinsConf.xml";
        files:File issueFile = {path:fileName};
        files:open(issueFile,"r");
        var content, _ = files:read(issueFile, 100000);
        string s = blobs:toString(content, "utf-8");
        string authenticateToken = "Basic " + system:getEnv("JenkinsToken");
        xml jenkinsRequestXml = xmls:parse(s);
        system:println(jenkinsRequestXml);

        string requestJenkinsUrl =  "createItem?name=" +jenkinsJobName;
        message requestJenkinsMessage = {};
        messages:setXmlPayload(requestJenkinsMessage,jenkinsRequestXml);
        messages:setHeader(requestJenkinsMessage,"Content-Type","application/xml");
        messages:setHeader(requestJenkinsMessage,"Authorization",authenticateToken);
        http:ClientConnector jenkinsClientConnector = create http:ClientConnector(jenkinsUrl);
        responseJenkins = jenkinsClientConnector.post(requestJenkinsUrl,requestJenkinsMessage);
        system:println(responseJenkins);
        requestJenkinsUrl = "view/" + jenkinsJobType +  "/addJobToView?name=" + jenkinsJobName;
        requestJenkinsMessage = {};
        messages:setHeader(requestJenkinsMessage,"Authorization",authenticateToken);
        responseJenkins = jenkinsClientConnector.post(requestJenkinsUrl,requestJenkinsMessage);
        system:println(responseJenkins);
        response = {"responseType":"Done","responseMessage":"done"};
        return response;
    }catch(errors:Error err){
        response = {"responseType":"Error","responseMessage":err.msg};
        return response;
    }

    return response;




}

function createCarbonJenkinsJob(string jenkinsJobName)(json ){
    message responseJenkins = {};
    json response;
    try{


        files:File issueFile = {path:"./conf/carbonJenkinsConf.xml"};
        files:open(issueFile,"r");
        var content, _ = files:read(issueFile, 100000);
        string s = blobs:toString(content, "utf-8");

        xml jenkinsRequestXml = xmls:parse(s);

        string requestJenkinsUrl =  "createItem?name=" +jenkinsJobName;
        message requestJenkinsMessage = {};
        messages:setXmlPayload(requestJenkinsMessage,jenkinsRequestXml);
        messages:setHeader(requestJenkinsMessage,"Content-Type","application/xml");
        messages:setHeader(requestJenkinsMessage,"Authorization","Basic QnVkZGhpV2F0aHNhbGE6YjZlZjBjNGU0MDkzYzM3NmNkMjZkMWQ1NDYxOGIwM2Q=");
        http:ClientConnector jenkinsClientConnector = create http:ClientConnector(jenkinsUrl);
        responseJenkins = jenkinsClientConnector.post(requestJenkinsUrl,requestJenkinsMessage);

        response = {"responseType":"Done","responseMessage":"done"};

    }catch(errors:Error err){
        response = {"responseType":"Error","responseMessage":err.msg};

    }

    return response;
}