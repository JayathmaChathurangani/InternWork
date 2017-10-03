

import ballerina.lang.system;
import ballerina.lang.files;
import ballerina.lang.blobs;
import ballerina.utils;

function main (string[] args) {
    system:println("Hello, World!");
    files:File issueFile = {path:"./services/issue_template.md"};
    files:open(issueFile,"r");
    var content, _ = files:read(issueFile, 100000);
    string s = blobs:toString(content, "utf-8");
    string encodeString = utils:base64encode(s);
    system:println("file content: " + encodeString);
    files:close(issueFile);
}
