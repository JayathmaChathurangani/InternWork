
package src;
import ballerina.lang.xmls;
import ballerina.lang.system;


function main (string[] args) {
    string name1 = "buddhi";
    string xmlString = "<book>" + name1 + "</book>";
    xml nameXml = xmls:parse(xmlString);
    string token = system:getEnv("DbPassword");

}
