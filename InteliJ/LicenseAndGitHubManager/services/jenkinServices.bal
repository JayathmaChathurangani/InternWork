package services;


import ballerina.lang.messages;
import ballerina.lang.jsons;
import ballerina.net.http;
import ballerina.lang.system;

string jenkinsUrl = "http://localhost:8080/";

function createJenkinsJob(message m)(message ){

    json requestJson = messages:getJsonPayload(m);
    string jenkinsJobName = jsons:toString(requestJson.name);
    system:println(jenkinsJobName);
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
    message responseJenkins = jenkinsClientConnector.post(requestJenkinsUrl,requestJenkinsMessage);
    return responseJenkins;


}