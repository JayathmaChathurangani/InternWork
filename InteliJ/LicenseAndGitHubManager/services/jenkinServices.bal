package services;


import ballerina.lang.messages;
import ballerina.lang.jsons;
import ballerina.net.http;
import ballerina.lang.system;
import ballerina.lang.errors;

string jenkinsUrl = "http://localhost:8080/";

function createJenkinsJob(message m)(message ){
    message responseJenkins = {};
    message response = {};
    try{

        system:println(m);
        json requestJson = messages:getJsonPayload(m);

        string jenkinsJobName = jsons:toString(requestJson.name);


        xml jenkinsRequestXml = xml`<project>
		<properties>
			<com.dabsquared.gitlabjenkins.connection.GitLabConnectionProperty plugin="gitlab-plugin@1.4.8">
				<gitLabConnection/>
			</com.dabsquared.gitlabjenkins.connection.GitLabConnectionProperty>
			<com.sonyericsson.rebuild.RebuildSettings plugin="rebuild@1.25">
				<autoRebuild>false</autoRebuild>
				<rebuildDisabled>false</rebuildDisabled>
			</com.sonyericsson.rebuild.RebuildSettings>
			<hudson.plugins.throttleconcurrents.ThrottleJobProperty plugin="throttle-concurrents@2.0.1">
				<categories class="java.util.concurrent.CopyOnWriteArrayList"/>
				<throttleEnabled>false</throttleEnabled>
				<throttleOption>project</throttleOption>
				<limitOneJobWithMatchingParams>false</limitOneJobWithMatchingParams>
				<paramsToUseForLimit/>
			</hudson.plugins.throttleconcurrents.ThrottleJobProperty>
		</properties>
    </project>`;

        string requestJenkinsUrl =  "createItem?name=" +jenkinsJobName;
        message requestJenkinsMessage = {};
        messages:setXmlPayload(requestJenkinsMessage,jenkinsRequestXml);
        messages:setHeader(requestJenkinsMessage,"Content-Type","application/xml");
        messages:setHeader(requestJenkinsMessage,"Authorization","Basic QnVkZGhpV2F0aHNhbGE6YjZlZjBjNGU0MDkzYzM3NmNkMjZkMWQ1NDYxOGIwM2Q=");
        http:ClientConnector jenkinsClientConnector = create http:ClientConnector(jenkinsUrl);
        responseJenkins = jenkinsClientConnector.post(requestJenkinsUrl,requestJenkinsMessage);

        json responseMessage = {"responseType":"Done","responseMessage":"done"};
        messages:setJsonPayload(response,responseMessage);
        return response;

    }catch(errors:Error err){
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        system:println(err);
        system:println("jenkins");
        messages:setJsonPayload(response,errorMessage);

    }

    return response;




}