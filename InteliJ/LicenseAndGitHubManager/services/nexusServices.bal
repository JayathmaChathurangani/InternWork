package services;

import ballerina.lang.messages;
import ballerina.lang.jsons;
import ballerina.net.http;


string nexusUrl = "http://localhost:8081/";

function createNexus(message m)(message ){
    json requestJson = messages:getJsonPayload(m);
    string nexusRepositoryName = jsons:toString(requestJson.name);

    string requestNexusUrl =  "nexus/service/local/repositories";
    message requestNexusMessage = {};
    json requestJsonPayload = {
                                  "data": {
                                              "repoType": "proxy",
                                              "id": nexusRepositoryName,
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
    return responseNexus;

}