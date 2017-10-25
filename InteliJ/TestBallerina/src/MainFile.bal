
package src;


import ballerina.net.http;
import services;






string id = "";
http:Session userSession;
function main (string[] args) {
    //try{
    //    message sessionMessage1 = {};
    //    messages:setHeader(sessionMessage1,"Cookie",id);
    //    userSession = http:createSessionIfAbsent(sessionMessage1);
    //
    //    http:setAttribute(userSession,"name","buddhi");
    //    id = "BSESSIONID=" + http:getId(userSession);
    //    system:println(id);
    //
    //    message sessionMessage2 = {};
    //    messages:setHeader(sessionMessage1,"Cookie",id);
    //    userSession = http:createSessionIfAbsent(sessionMessage2);
    //    id = "BSESSIONID=" + http:getId(userSession);
    //    system:println(id);
    //}catch(errors:Error err){
    //
    //    system:println(err);
    //}
    string token = "eyJ4NXQiOiJRelJCTmpBMk1qazFOakJCUWtRM05VRTNNemczUWtReU16RXdNVUUwUVRkQk16UTBSRUpETlE9PSIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJodHRwOi8vd3NvMi5vcmcvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImJ1ZGRoaWtAd3NvMi5jb20iLCJTdWJqZWN0IjoiSVMtV1NPMi5DT00vYnVkZGhpa0B3c28yLmNvbUB3c28yaW50ZXJuYWxzdGciLCJzdWIiOiJJUy1XU08yLkNPTS9idWRkaGlrQHdzbzIuY29tQHdzbzJpbnRlcm5hbHN0ZyIsImh0dHA6Ly93c28yLm9yZy9jbGFpbXMvcm9sZSI6IklTLVdTTzIuQ09NL3dzbzIuaW50ZXJucyxJUy1XU08yLkNPTS93c28yLnNob3J0dGVybS1lbXBsb3llZXMsSVMtV1NPMi5DT00vYWRtaW4uZW5naW5lZXJpbmcucHJvZmlsZS5hbGwuYXBwcyxJbnRlcm5hbC9ldmVyeW9uZSIsImF1ZCI6WyJFQ1Atd3NvMmludGVybmFsc3RnLTEuMCIsImNhcmJvblNlcnZlciJdLCJleHAiOjE1MDg5MDU4MDksImlzcyI6IndzbzIub3JnL3Byb2R1Y3RzL2FwcG0ifQ.rQvk7yiHF0lk0f3MJR9sAOzTPvIJrcZEMTVUAxdQfHI";
    json payload =  services:validateUser(token);
    payload =  services:validateUser(token);
    payload =  services:validateUser(token);
    payload =  services:validateUser(token);
    payload =  services:validateUser(token);
    payload =  services:validateUser(token);


}
