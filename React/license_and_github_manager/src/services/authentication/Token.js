import {Component} from 'react';
import jwt_decode from 'jwt-decode';

class Token extends Component{

    getToken(){
        var token1 = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsIng1dCI6IlF6UkJOakEyTWprMU5qQkJRa1EzTlVFM016ZzNRa1F5TXpFd01VRTBRVGRCTXpRMFJFSkROUT09In0.eyJTdWJqZWN0IjoiSVMtV1NPMi5DT00vYnVkZGhpa0B3c28yLmNvbUB3c28yaW50ZXJuYWxzdGciLCJpc3MiOiJ3c28yLm9yZy9wcm9kdWN0cy9hcHBtIiwiaHR0cDovL3dzbzIub3JnL2NsYWltcy9yb2xlIjoiSVMtV1NPMi5DT00vd3NvMi5pbnRlcm5zLElTLVdTTzIuQ09NL3dzbzIuc2hvcnR0ZXJtLWVtcGxveWVlcyxJUy1XU08yLkNPTS9hZG1pbi5lbmdpbmVlcmluZy5wcm9maWxlLmFsbC5hcHBzLEludGVybmFsL2V2ZXJ5b25lIiwiZXhwIjoxNTA4NzM3MjM5LCJzdWIiOiJJUy1XU08yLkNPTS9idWRkaGlrQHdzbzIuY29tQHdzbzJpbnRlcm5hbHN0ZyIsImh0dHA6Ly93c28yLm9yZy9jbGFpbXMvZW1haWxhZGRyZXNzIjoiYnVkZGhpa0B3c28yLmNvbSIsImF1ZCI6WyJFQ1Atd3NvMmludGVybmFsc3RnLTEuMCIsImNhcmJvblNlcnZlciJdfQ.uNYscmYI90oqo_4-FlnhhcZuD52zgVL1GaPLlMkgodU';
        var token2 = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsIng1dCI6IlF6UkJOakEyTWprMU5qQkJRa1EzTlVFM016ZzNRa1F5TXpFd01VRTBRVGRCTXpRMFJFSkROUT09In0.eyJTdWJqZWN0IjoiSVMtV1NPMi5DT00vaXNoaWthQHdzbzIuY29tQHdzbzJpbnRlcm5hbHN0ZyIsImlzcyI6IndzbzIub3JnL3Byb2R1Y3RzL2FwcG0iLCJodHRwOi8vd3NvMi5vcmcvY2xhaW1zL3JvbGUiOiJJUy1XU08yLkNPTS93c28yLmludGVybnMsSVMtV1NPMi5DT00vd3NvMi5zaG9ydHRlcm0tZW1wbG95ZWVzLElTLVdTTzIuQ09NL2FkbWluLmVuZ2luZWVyaW5nLnByb2ZpbGUuYWxsLmFwcHMsSW50ZXJuYWwvZXZlcnlvbmUiLCJleHAiOjE1MDg3MzcyMzksInN1YiI6IklTLVdTTzIuQ09NL2lzaGlrYUB3c28yLmNvbUB3c28yaW50ZXJuYWxzdGciLCJodHRwOi8vd3NvMi5vcmcvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImlzaGlrYUB3c28yLmNvbSIsImF1ZCI6WyJFQ1Atd3NvMmludGVybmFsc3RnLTEuMCIsImNhcmJvblNlcnZlciJdfQ.VMWhAOptJQMkxSiq24VxDdy45fDl3cNqckLAywIaD0Q';
        var token3 = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsIng1dCI6IlF6UkJOakEyTWprMU5qQkJRa1EzTlVFM016ZzNRa1F5TXpFd01VRTBRVGRCTXpRMFJFSkROUT09In0.eyJTdWJqZWN0IjoiSVMtV1NPMi5DT00vYi53YXRoc2FsYS5id0BnbWFpbC5jb21Ad3NvMmludGVybmFsc3RnIiwiaXNzIjoid3NvMi5vcmcvcHJvZHVjdHMvYXBwbSIsImh0dHA6Ly93c28yLm9yZy9jbGFpbXMvcm9sZSI6IklTLVdTTzIuQ09NL3dzbzIuaW50ZXJucyxJUy1XU08yLkNPTS93c28yLnNob3J0dGVybS1lbXBsb3llZXMsSVMtV1NPMi5DT00vYWRtaW4uZW5naW5lZXJpbmcucHJvZmlsZS5hbGwuYXBwcyxJbnRlcm5hbC9ldmVyeW9uZSIsImV4cCI6MTUwODczNzIzOSwic3ViIjoiSVMtV1NPMi5DT00vYi53YXRoc2FsYS5id0BnbWFpbC5jb21Ad3NvMmludGVybmFsc3RnIiwiaHR0cDovL3dzbzIub3JnL2NsYWltcy9lbWFpbGFkZHJlc3MiOiJiLndhdGhzYWxhLmJ3QGdtYWlsLmNvbSIsImF1ZCI6WyJFQ1Atd3NvMmludGVybmFsc3RnLTEuMCIsImNhcmJvblNlcnZlciJdfQ.k_4oa0uukCfuv9ashRbOBehuRO6gdtTKaw6pPtVY9fw';
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