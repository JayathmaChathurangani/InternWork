package services;


import ballerina.lang.messages;
import ballerina.net.http;
import ballerina.lang.errors;
import ballerina.lang.files;
import ballerina.lang.blobs;
import ballerina.lang.xmls;
import ballerina.lang.system;

string jenkinsApiUrl = "http://localhost:8080/";

function createJenkinsJob(string jenkinsJobName,string jenkinsJobType)(json ){
    message responseJenkins = {};
    json response;
    int createJobStatusCode;
    int addJobStatusCode;
    try{

        string fileName = "./conf/" + jenkinsJobType + "JenkinsConf.xml";
        files:File issueFile = {path:fileName};
        files:open(issueFile,"r");
        var content, _ = files:read(issueFile, 100000);
        string s = blobs:toString(content, "utf-8");
        string authenticateToken = "Basic " + system:getEnv("JenkinsToken");
        xml jenkinsRequestXml = xmls:parse(s);


        string requestJenkinsUrl =  "createItem?name=" +jenkinsJobName;
        message requestJenkinsMessage = {};
        messages:setXmlPayload(requestJenkinsMessage,jenkinsRequestXml);
        messages:setHeader(requestJenkinsMessage,"Content-Type","application/xml");
        messages:setHeader(requestJenkinsMessage,"Authorization",authenticateToken);
        http:ClientConnector jenkinsClientConnector = create http:ClientConnector(jenkinsApiUrl);
        responseJenkins = jenkinsClientConnector.post(requestJenkinsUrl,requestJenkinsMessage);
        createJobStatusCode = http:getStatusCode(responseJenkins);
        requestJenkinsUrl = "view/" + jenkinsJobType +  "/addJobToView?name=" + jenkinsJobName;
        requestJenkinsMessage = {};
        messages:setHeader(requestJenkinsMessage,"Authorization",authenticateToken);
        responseJenkins = jenkinsClientConnector.post(requestJenkinsUrl,requestJenkinsMessage);
        addJobStatusCode = http:getStatusCode(responseJenkins);

        if(createJobStatusCode == 200 && addJobStatusCode == 200){

            response = {"responseType":"Done","responseMessage":"done"};
        }else{

            response = {"responseType":"Error","responseMessage":"Jenkins Error"};
        }

        return response;
    }catch(errors:Error err){
        response = {"responseType":"Error","responseMessage":err.msg};
        return response;
    }

    return response;




}

