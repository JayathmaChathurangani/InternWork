package services;

import ballerina.lang.strings;

function correctString(string givenString)(string ){
    string returnString = strings:replaceAll(givenString,"\\\\n","\\n");
    return returnString;
}