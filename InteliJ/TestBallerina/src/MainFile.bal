
package src;

import ballerina.lang.files;
import ballerina.lang.blobs;
import ballerina.lang.system;
import ballerina.lang.xmls;
import ballerina.lang.jsons;


function main (string[] args) {

    string fileName = "./services/nexusStagingProfileConf.xml";
    files:File issueFile = {path:fileName};
    files:open(issueFile,"r");
    var content, _ = files:read(issueFile, 100000);
    string s = blobs:toString(content, "utf-8");
    string name = "org";
    xml mainXml = xmls:parse(s);
    xmls:Options option = {};
    json mainJson = xmls:toJSON(mainXml,option);
    mainJson.profileRequest.data.name = name;
    jsons:Options jsonOptions = {};
    mainXml = jsons:toXML(mainJson,jsonOptions);
    system:println(mainXml);

}
