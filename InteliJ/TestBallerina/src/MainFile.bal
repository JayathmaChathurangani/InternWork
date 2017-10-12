
package src;

import ballerina.net.http;
import ballerina.lang.system;
import ballerina.utils;
import ballerina.lang.strings;
import ballerina.lang.jsons;
import ballerina.lang.time;

function main (string[] args) {

    message m = {};
    http:Session ss = http:createSessionIfAbsent(m);
    http:setAttribute(ss,"name","buddhi");
    string jwt = "eyJ4NXQiOiJRelJCTmpBMk1qazFOakJCUWtRM05VRTNNemczUWtReU16RXdNVUUwUVRkQk16UTBSRUpETlE9PSIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJodHRwOi8vd3NvMi5vcmcvY2xhaW1zL3JvbGUiOiJJUy1XU08yLkNPTS93c28yLmludGVybnMsSVMtV1NPMi5DT00vd3NvMi5zaG9ydHRlcm0tZW1wbG95ZWVzLElTLVdTTzIuQ09NL2FkbWluLmVuZ2luZWVyaW5nLnByb2ZpbGUuYWxsLmFwcHMsSW50ZXJuYWwvZXZlcnlvbmUiLCJzdWIiOiJJUy1XU08yLkNPTS9idWRkaGlrQHdzbzIuY29tQHdzbzJpbnRlcm5hbHN0ZyIsImh0dHA6Ly93c28yLm9yZy9jbGFpbXMvZW1haWxhZGRyZXNzIjoiYnVkZGhpa0B3c28yLmNvbSIsImF1ZCI6WyJFQ1Atd3NvMmludGVybmFsc3RnLTEuMCIsImNhcmJvblNlcnZlciJdLCJTdWJqZWN0IjoiSVMtV1NPMi5DT00vYnVkZGhpa0B3c28yLmNvbUB3c28yaW50ZXJuYWxzdGciLCJpc3MiOiJ3c28yLm9yZy9wcm9kdWN0cy9hcHBtIiwiZXhwIjoxNTA3MTExMjE4fQ.2KURn1P1Z1eRfcoW--ZRFGyLHhwvpPJ7I3kkdwPogg8";
    string[] data = strings:split(jwt,"\\.");
    system:println(data);
    string name = utils:base64decode(data[1]);
    json jwtJson = jsons:parse(name);
    system:println(jwtJson);
    string[] keys = jsons:getKeys(jwtJson);
    system:println(keys);
    string email = jsons:toString(jwtJson["http://wso2.org/claims/emailaddress"]);
    string dateString = jsons:toString(jwtJson["exp"]);
    int epocTime;
    epocTime,_ = <int>dateString;
    time:Time currentTime = time:currentTime();
    system:println(epocTime);
    system:println((currentTime.time/1000));
    system:println((currentTime.time > epocTime + 3600));

    system:println(strings:hasSuffix(email,"@wso2.com1"));
    system:println(name);
}
