

import ballerina.lang.xmls;
import ballerina.lang.system;

function main (string[] args) {
    string name = "buddhi";
    string xmlString = "<book>" + name + "</book>";
    xml nameXml = xmls:parse(xmlString);
    string token = system:getEnv("DbPassword");
    system:println(token);
}
