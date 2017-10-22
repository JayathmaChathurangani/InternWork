import {Component} from 'react';
import jwt_decode from 'jwt-decode';

class Token extends Component{

    getToken(){
        var token1 = 'eyJ4NXQiOiJRelJCTmpBMk1qazFOakJCUWtRM05VRTNNemczUWtReU16RXdNVUUwUVRkQk16UTBSRUpETlE9PSIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJodHRwOi8vd3NvMi5vcmcvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImJ1ZGRoaWtAd3NvMi5jb20iLCJzdWIiOiJJUy1XU08yLkNPTS9idWRkaGlrQHdzbzIuY29tQHdzbzJpbnRlcm5hbHN0ZyIsImV4cCI6MTUwODY5MzM3MSwiU3ViamVjdCI6IklTLVdTTzIuQ09NL2J1ZGRoaWtAd3NvMi5jb21Ad3NvMmludGVybmFsc3RnIiwiaXNzIjoid3NvMi5vcmcvcHJvZHVjdHMvYXBwbSIsImh0dHA6Ly93c28yLm9yZy9jbGFpbXMvcm9sZSI6IklTLVdTTzIuQ09NL3dzbzIuaW50ZXJucyxJUy1XU08yLkNPTS93c28yLnNob3J0dGVybS1lbXBsb3llZXMsSVMtV1NPMi5DT00vYWRtaW4uZW5naW5lZXJpbmcucHJvZmlsZS5hbGwuYXBwcyxJbnRlcm5hbC9ldmVyeW9uZSIsImF1ZCI6WyJFQ1Atd3NvMmludGVybmFsc3RnLTEuMCIsImNhcmJvblNlcnZlciJdfQ.ryxVBfWfLw-bnWCOiLeic4ZJ8OfzJNyP4hfuyDa6Dr4';
        var token2 = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IlF6UkJOakEyTWprMU5qQkJRa1EzTlVFM016ZzNRa1F5TXpFd01VRTBRVGRCTXpRMFJFSkROUT09In0.eyJzdWIiOiJJUy1XU08yLkNPTS9pc2hpa2FAd3NvMi5jb21Ad3NvMmludGVybmFsc3RnIiwiaHR0cDovL3dzbzIub3JnL2NsYWltcy9yb2xlIjoiSVMtV1NPMi5DT00vd3NvMi5pbnRlcm5zLElTLVdTTzIuQ09NL3dzbzIuc2hvcnR0ZXJtLWVtcGxveWVlcyxJUy1XU08yLkNPTS9hZG1pbi5lbmdpbmVlcmluZy5wcm9maWxlLmFsbC5hcHBzLEludGVybmFsL2V2ZXJ5b25lIiwiaXNzIjoid3NvMi5vcmcvcHJvZHVjdHMvYXBwbSIsImh0dHA6Ly93c28yLm9yZy9jbGFpbXMvZW1haWxhZGRyZXNzIjoiaXNoaWthQHdzbzIuY29tIiwiYXVkIjpbIkVDUC13c28yaW50ZXJuYWxzdGctMS4wIiwiY2FyYm9uU2VydmVyIl0sIlN1YmplY3QiOiJJUy1XU08yLkNPTS9pc2hpa2FAd3NvMi5jb21Ad3NvMmludGVybmFsc3RnIiwiZXhwIjoxNTA4NjAzMjY1fQ.9nXXNGlYaw5_-PUkAz3-41u0gZyykpKwO_b2AQwKcf4';
        var token3 = 'eyJhbGciOiJSUzI1NiIsIng1dCI6IlF6UkJOakEyTWprMU5qQkJRa1EzTlVFM016ZzNRa1F5TXpFd01VRTBRVGRCTXpRMFJFSkROUT09IiwidHlwIjoiSldUIn0.eyJodHRwOi8vd3NvMi5vcmcvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImIud2F0aHNhbGEuYndAZ21haWwuY29tIiwiYXVkIjpbIkVDUC13c28yaW50ZXJuYWxzdGctMS4wIiwiY2FyYm9uU2VydmVyIl0sImlzcyI6IndzbzIub3JnL3Byb2R1Y3RzL2FwcG0iLCJleHAiOjE1MDg2MDMyNzMsImh0dHA6Ly93c28yLm9yZy9jbGFpbXMvcm9sZSI6IklTLVdTTzIuQ09NL3dzbzIuaW50ZXJucyxJUy1XU08yLkNPTS93c28yLnNob3J0dGVybS1lbXBsb3llZXMsSVMtV1NPMi5DT00vYWRtaW4uZW5naW5lZXJpbmcucHJvZmlsZS5hbGwuYXBwcyxJbnRlcm5hbC9ldmVyeW9uZSIsIlN1YmplY3QiOiJJUy1XU08yLkNPTS9iLndhdGhzYWxhLmJ3QGdtYWlsLmNvbUB3c28yaW50ZXJuYWxzdGciLCJzdWIiOiJJUy1XU08yLkNPTS9iLndhdGhzYWxhLmJ3QGdtYWlsLmNvbUB3c28yaW50ZXJuYWxzdGcifQ.kWr3ezh-0eTWZDDH-8nzt0Mk-etJ7TePw5ln3Ms8_SQ';
        return token1;
    }

    getEmail(){
        var token = this.getToken();

        if(token === null){
            return null;
        }
        var decoded = jwt_decode(token);
        var keys = Object.keys(decoded);
        var values = Object.values(decoded);
        var emailJsonKey = "http://wso2.org/claims/emailaddress";
        var emailArrayIndex = keys.indexOf(emailJsonKey);
        var emailValue = values[emailArrayIndex];
        return emailValue;
    }


}

export default (new Token());