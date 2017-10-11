import {Component} from 'react';
import jwt_decode from 'jwt-decode';

class Token extends Component{

    getToken(){
        var token1 = 'eyJ4NXQiOiJRelJCTmpBMk1qazFOakJCUWtRM05VRTNNemczUWtReU16RXdNVUUwUVRkQk16UTBSRUpETlE9PSIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJodHRwOi8vd3NvMi5vcmcvY2xhaW1zL3JvbGUiOiJJUy1XU08yLkNPTS93c28yLmludGVybnMsSVMtV1NPMi5DT00vd3NvMi5zaG9ydHRlcm0tZW1wbG95ZWVzLElTLVdTTzIuQ09NL2FkbWluLmVuZ2luZWVyaW5nLnByb2ZpbGUuYWxsLmFwcHMsSW50ZXJuYWwvZXZlcnlvbmUiLCJzdWIiOiJJUy1XU08yLkNPTS9idWRkaGlrQHdzbzIuY29tQHdzbzJpbnRlcm5hbHN0ZyIsImh0dHA6Ly93c28yLm9yZy9jbGFpbXMvZW1haWxhZGRyZXNzIjoiYnVkZGhpa0B3c28yLmNvbSIsImF1ZCI6WyJFQ1Atd3NvMmludGVybmFsc3RnLTEuMCIsImNhcmJvblNlcnZlciJdLCJTdWJqZWN0IjoiSVMtV1NPMi5DT00vYnVkZGhpa0B3c28yLmNvbUB3c28yaW50ZXJuYWxzdGciLCJpc3MiOiJ3c28yLm9yZy9wcm9kdWN0cy9hcHBtIiwiZXhwIjoxNTA3MTExMjE4fQ.2KURn1P1Z1eRfcoW--ZRFGyLHhwvpPJ7I3kkdwPogg8';
        var token2 = 'eyJ4NXQiOiJRelJCTmpBMk1qazFOakJCUWtRM05VRTNNemczUWtReU16RXdNVUUwUVRkQk16UTBSRUpETlE9PSIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJleHAiOjE1MDc3MTc3NDcsImh0dHA6Ly93c28yLm9yZy9jbGFpbXMvcm9sZSI6IklTLVdTTzIuQ09NL3dzbzIuaW50ZXJucyxJUy1XU08yLkNPTS93c28yLnNob3J0dGVybS1lbXBsb3llZXMsSVMtV1NPMi5DT00vYWRtaW4uZW5naW5lZXJpbmcucHJvZmlsZS5hbGwuYXBwcyxJbnRlcm5hbC9ldmVyeW9uZSIsImh0dHA6Ly93c28yLm9yZy9jbGFpbXMvZW1haWxhZGRyZXNzIjoiaXNoaWthQHdzbzIuY29tIiwiYXVkIjpbIkVDUC13c28yaW50ZXJuYWxzdGctMS4wIiwiY2FyYm9uU2VydmVyIl0sIlN1YmplY3QiOiJJUy1XU08yLkNPTS9pc2hpa2FAd3NvMi5jb21Ad3NvMmludGVybmFsc3RnIiwiaXNzIjoid3NvMi5vcmcvcHJvZHVjdHMvYXBwbSIsInN1YiI6IklTLVdTTzIuQ09NL2lzaGlrYUB3c28yLmNvbUB3c28yaW50ZXJuYWxzdGcifQ.2PmD_RK2wV25UeZaMDCNipNWaui_mYzWB-NQpb4SsTQ';
        var token3 = 'eyJhbGciOiJSUzI1NiIsIng1dCI6IlF6UkJOakEyTWprMU5qQkJRa1EzTlVFM016ZzNRa1F5TXpFd01VRTBRVGRCTXpRMFJFSkROUT09IiwidHlwIjoiSldUIn0.eyJpc3MiOiJ3c28yLm9yZy9wcm9kdWN0cy9hcHBtIiwiaHR0cDovL3dzbzIub3JnL2NsYWltcy9lbWFpbGFkZHJlc3MiOiJiLndhdGhzYWxhLmJ3QGdtYWlsLmNvbSIsInN1YiI6IklTLVdTTzIuQ09NL2Iud2F0aHNhbGEuYndAZ21haWwuY29tQHdzbzJpbnRlcm5hbHN0ZyIsImh0dHA6Ly93c28yLm9yZy9jbGFpbXMvcm9sZSI6IklTLVdTTzIuQ09NL3dzbzIuaW50ZXJucyxJUy1XU08yLkNPTS93c28yLnNob3J0dGVybS1lbXBsb3llZXMsSVMtV1NPMi5DT00vYWRtaW4uZW5naW5lZXJpbmcucHJvZmlsZS5hbGwuYXBwcyxJbnRlcm5hbC9ldmVyeW9uZSIsImV4cCI6MTUwNzcxNzg3MywiYXVkIjpbIkVDUC13c28yaW50ZXJuYWxzdGctMS4wIiwiY2FyYm9uU2VydmVyIl0sIlN1YmplY3QiOiJJUy1XU08yLkNPTS9iLndhdGhzYWxhLmJ3QGdtYWlsLmNvbUB3c28yaW50ZXJuYWxzdGcifQ.oV3p2zMfskmqE6EWqJT77o9_jTsrqQkayOM9bBAKEwc'
        return token2;
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