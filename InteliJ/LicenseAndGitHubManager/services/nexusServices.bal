package services;

import ballerina.lang.messages;
import ballerina.net.http;
import ballerina.lang.errors;
import ballerina.lang.system;
import ballerina.lang.xmls;


string nexusUrl = "http://localhost:8081/";

function createNexus(string nexusRepositoryName,string nexusRepositoryId)(json ){

    json returnJson;
    try{

        string requestNexusUrl =  "nexus/service/local/repositories";
        message requestNexusMessage = {};
        json requestJsonPayload = {
                                      "data": {
                                                  "repoType": "proxy",
                                                  "id": nexusRepositoryId,
                                                  "name": nexusRepositoryName,
                                                  "browseable": true,
                                                  "indexable": true,
                                                  "notFoundCacheTTL": 1440,
                                                  "artifactMaxAge": -1,
                                                  "metadataMaxAge": 1440,
                                                  "itemMaxAge": 1440,
                                                  "repoPolicy": "RELEASE",
                                                  "provider": "maven2",
                                                  "providerRole": "org.sonatype.nexus.proxy.repository.Repository",
                                                  "downloadRemoteIndexes": true,
                                                  "autoBlockActive": true,
                                                  "fileTypeValidation": true,
                                                  "exposed": true,
                                                  "checksumPolicy": "WARN",
                                                  "remoteStorage": {
                                                                       "remoteStorageUrl": "http://someplace.com/repo",
                                                                       "authentication": null,
                                                                       "connectionSettings": null
                                                                   }
                                              }
                                  };
        messages:setJsonPayload(requestNexusMessage,requestJsonPayload);
        messages:setHeader(requestNexusMessage,"Content-Type","application/json");
        messages:setHeader(requestNexusMessage,"Authorization","Basic YWRtaW46YWRtaW4xMjM=");
        http:ClientConnector nexusClientConnector = create http:ClientConnector(nexusUrl);
        message responseNexus = nexusClientConnector.post(requestNexusUrl,requestNexusMessage);

        returnJson = {"responseType":"Done","responseMessage":""};

    }catch(errors:Error err){
        returnJson = {"responseType":"Error","responseMessage":err.msg};
        system:println(err);


    }
    return returnJson;




}

function createNexusRepositoryTarget(string id,string name,string contentClass,string pattern)(json){

    string idString = "<id>" + id + "</id>";
    string contentClassString = "<contentClass>"+ contentClass + "</contentClass>";
    string nameString = "<name>" + name + "</name>";
    string patternString = "<patterns><pattern>" + pattern + "</pattern></patterns>";
    string xmlString = "<repo-target><data>" + idString + contentClassString + nameString + patternString + "</data></repo-target>";
    system:println(xmlString);
    string requestNexusUrl = "nexus/service/local/repo_targets";
    xml requestXml = xmls:parse(xmlString);
    message requestNexusMessage = {};
    messages:setXmlPayload(requestNexusMessage,requestXml);
    messages:setHeader(requestNexusMessage,"Content-Type","application/xml");
    messages:setHeader(requestNexusMessage,"Authorization","Basic YWRtaW46YWRtaW4xMjM=");
    http:ClientConnector nexusClientConnector = create http:ClientConnector(nexusUrl);
    message responseNexus = nexusClientConnector.post(requestNexusUrl,requestNexusMessage);
    system:println(responseNexus);
    json returnJson = {"responseType":"Done","responseMessage":""};
    return returnJson;

}