import {Component} from 'react';
import jwt_decode from 'jwt-decode';

class Token extends Component{

    getToken(){
        var token1 = 'eyJhbGciOiJSUzI1NiIsIng1dCI6IlF6UkJOakEyTWprMU5qQkJRa1EzTlVFM016ZzNRa1F5TXpFd01VRTBRVGRCTXpRMFJFSkROUT09IiwidHlwIjoiSldUIn0.eyJodHRwOi8vd3NvMi5vcmcvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImJ1ZGRoaWtAd3NvMi5jb20iLCJzdWIiOiJJUy1XU08yLkNPTS9idWRkaGlrQHdzbzIuY29tQHdzbzJpbnRlcm5hbHN0ZyIsImF1ZCI6WyJFQ1Atd3NvMmludGVybmFsc3RnLTEuMCIsImNhcmJvblNlcnZlciJdLCJodHRwOi8vd3NvMi5vcmcvY2xhaW1zL3JvbGUiOiJJUy1XU08yLkNPTS93c28yLmludGVybnMsSVMtV1NPMi5DT00vd3NvMi5zaG9ydHRlcm0tZW1wbG95ZWVzLElTLVdTTzIuQ09NL2FkbWluLmVuZ2luZWVyaW5nLnByb2ZpbGUuYWxsLmFwcHMsSW50ZXJuYWwvZXZlcnlvbmUiLCJpc3MiOiJ3c28yLm9yZy9wcm9kdWN0cy9hcHBtIiwiZXhwIjoxNTA4MjI0MTc4LCJTdWJqZWN0IjoiSVMtV1NPMi5DT00vYnVkZGhpa0B3c28yLmNvbUB3c28yaW50ZXJuYWxzdGcifQ.sWK-syWjz535q8TDopOeMSM-6HeoWfGhEv6LcbXMHcc';
        var token2 = 'eyJ4NXQiOiJRelJCTmpBMk1qazFOakJCUWtRM05VRTNNemczUWtReU16RXdNVUUwUVRkQk16UTBSRUpETlE9PSIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJpc3MiOiJ3c28yLm9yZy9wcm9kdWN0cy9hcHBtIiwiU3ViamVjdCI6IklTLVdTTzIuQ09NL2lzaGlrYUB3c28yLmNvbUB3c28yaW50ZXJuYWxzdGciLCJodHRwOi8vd3NvMi5vcmcvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImlzaGlrYUB3c28yLmNvbSIsImV4cCI6MTUwODIyNDIyOCwiaHR0cDovL3dzbzIub3JnL2NsYWltcy9yb2xlIjoiSVMtV1NPMi5DT00vd3NvMi5pbnRlcm5zLElTLVdTTzIuQ09NL3dzbzIuc2hvcnR0ZXJtLWVtcGxveWVlcyxJUy1XU08yLkNPTS9hZG1pbi5lbmdpbmVlcmluZy5wcm9maWxlLmFsbC5hcHBzLEludGVybmFsL2V2ZXJ5b25lIiwiYXVkIjpbIkVDUC13c28yaW50ZXJuYWxzdGctMS4wIiwiY2FyYm9uU2VydmVyIl0sInN1YiI6IklTLVdTTzIuQ09NL2lzaGlrYUB3c28yLmNvbUB3c28yaW50ZXJuYWxzdGcifQ.2O_St1GJNupE9b1KTDw423dgNhltuCc3C2z4r4drguI';
        var token3 = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IlF6UkJOakEyTWprMU5qQkJRa1EzTlVFM016ZzNRa1F5TXpFd01VRTBRVGRCTXpRMFJFSkROUT09In0.eyJodHRwOi8vd3NvMi5vcmcvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImIud2F0aHNhbGEuYndAZ21haWwuY29tIiwiYXVkIjpbIkVDUC13c28yaW50ZXJuYWxzdGctMS4wIiwiY2FyYm9uU2VydmVyIl0sImh0dHA6Ly93c28yLm9yZy9jbGFpbXMvcm9sZSI6IklTLVdTTzIuQ09NL3dzbzIuaW50ZXJucyxJUy1XU08yLkNPTS93c28yLnNob3J0dGVybS1lbXBsb3llZXMsSVMtV1NPMi5DT00vYWRtaW4uZW5naW5lZXJpbmcucHJvZmlsZS5hbGwuYXBwcyxJbnRlcm5hbC9ldmVyeW9uZSIsImlzcyI6IndzbzIub3JnL3Byb2R1Y3RzL2FwcG0iLCJTdWJqZWN0IjoiSVMtV1NPMi5DT00vYi53YXRoc2FsYS5id0BnbWFpbC5jb21Ad3NvMmludGVybmFsc3RnIiwiZXhwIjoxNTA4MjIzODg4LCJzdWIiOiJJUy1XU08yLkNPTS9iLndhdGhzYWxhLmJ3QGdtYWlsLmNvbUB3c28yaW50ZXJuYWxzdGcifQ.m8pmEa12FRg4M4WcJK7KmnO4k1i7bxn-hgbx7dbPJQc';
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