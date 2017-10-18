import {Component} from 'react';
import jwt_decode from 'jwt-decode';

class Token extends Component{

    getToken(){
        var token1 = 'eyJ0eXAiOiJKV1QiLCJ4NXQiOiJRelJCTmpBMk1qazFOakJCUWtRM05VRTNNemczUWtReU16RXdNVUUwUVRkQk16UTBSRUpETlE9PSIsImFsZyI6IlJTMjU2In0.eyJhdWQiOlsiRUNQLXdzbzJpbnRlcm5hbHN0Zy0xLjAiLCJjYXJib25TZXJ2ZXIiXSwiZXhwIjoxNTA4MzA4MjAzLCJodHRwOi8vd3NvMi5vcmcvY2xhaW1zL3JvbGUiOiJJUy1XU08yLkNPTS93c28yLmludGVybnMsSVMtV1NPMi5DT00vd3NvMi5zaG9ydHRlcm0tZW1wbG95ZWVzLElTLVdTTzIuQ09NL2FkbWluLmVuZ2luZWVyaW5nLnByb2ZpbGUuYWxsLmFwcHMsSW50ZXJuYWwvZXZlcnlvbmUiLCJTdWJqZWN0IjoiSVMtV1NPMi5DT00vYnVkZGhpa0B3c28yLmNvbUB3c28yaW50ZXJuYWxzdGciLCJzdWIiOiJJUy1XU08yLkNPTS9idWRkaGlrQHdzbzIuY29tQHdzbzJpbnRlcm5hbHN0ZyIsImlzcyI6IndzbzIub3JnL3Byb2R1Y3RzL2FwcG0iLCJodHRwOi8vd3NvMi5vcmcvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImJ1ZGRoaWtAd3NvMi5jb20ifQ.UUhxg0Yw1JwuVyqfuF1FUkk_c9s3MQ72FhiMJgCiB6M';
        var token2 = 'eyJhbGciOiJSUzI1NiIsIng1dCI6IlF6UkJOakEyTWprMU5qQkJRa1EzTlVFM016ZzNRa1F5TXpFd01VRTBRVGRCTXpRMFJFSkROUT09IiwidHlwIjoiSldUIn0.eyJzdWIiOiJJUy1XU08yLkNPTS9pc2hpa2FAd3NvMi5jb21Ad3NvMmludGVybmFsc3RnIiwiaHR0cDovL3dzbzIub3JnL2NsYWltcy9yb2xlIjoiSVMtV1NPMi5DT00vd3NvMi5pbnRlcm5zLElTLVdTTzIuQ09NL3dzbzIuc2hvcnR0ZXJtLWVtcGxveWVlcyxJUy1XU08yLkNPTS9hZG1pbi5lbmdpbmVlcmluZy5wcm9maWxlLmFsbC5hcHBzLEludGVybmFsL2V2ZXJ5b25lIiwiYXVkIjpbIkVDUC13c28yaW50ZXJuYWxzdGctMS4wIiwiY2FyYm9uU2VydmVyIl0sIlN1YmplY3QiOiJJUy1XU08yLkNPTS9pc2hpa2FAd3NvMi5jb21Ad3NvMmludGVybmFsc3RnIiwiaHR0cDovL3dzbzIub3JnL2NsYWltcy9lbWFpbGFkZHJlc3MiOiJpc2hpa2FAd3NvMi5jb20iLCJpc3MiOiJ3c28yLm9yZy9wcm9kdWN0cy9hcHBtIiwiZXhwIjoxNTA4MzA4MjA5fQ.JRfT8wViQ37q7n6UjwgYQ4wwx0uIlJ7RUf-E9HLU9Gk';
        var token3 = 'eyJ4NXQiOiJRelJCTmpBMk1qazFOakJCUWtRM05VRTNNemczUWtReU16RXdNVUUwUVRkQk16UTBSRUpETlE9PSIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJJUy1XU08yLkNPTS9iLndhdGhzYWxhLmJ3QGdtYWlsLmNvbUB3c28yaW50ZXJuYWxzdGciLCJTdWJqZWN0IjoiSVMtV1NPMi5DT00vYi53YXRoc2FsYS5id0BnbWFpbC5jb21Ad3NvMmludGVybmFsc3RnIiwiZXhwIjoxNTA4MzA4MjE0LCJhdWQiOlsiRUNQLXdzbzJpbnRlcm5hbHN0Zy0xLjAiLCJjYXJib25TZXJ2ZXIiXSwiaXNzIjoid3NvMi5vcmcvcHJvZHVjdHMvYXBwbSIsImh0dHA6Ly93c28yLm9yZy9jbGFpbXMvZW1haWxhZGRyZXNzIjoiYi53YXRoc2FsYS5id0BnbWFpbC5jb20iLCJodHRwOi8vd3NvMi5vcmcvY2xhaW1zL3JvbGUiOiJJUy1XU08yLkNPTS93c28yLmludGVybnMsSVMtV1NPMi5DT00vd3NvMi5zaG9ydHRlcm0tZW1wbG95ZWVzLElTLVdTTzIuQ09NL2FkbWluLmVuZ2luZWVyaW5nLnByb2ZpbGUuYWxsLmFwcHMsSW50ZXJuYWwvZXZlcnlvbmUifQ.hcun4utpDRMAYFZtTuMqYN3BRbsIESSD0RXAlK_-Vuo';
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