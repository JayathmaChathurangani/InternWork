import {Component} from 'react';
import jwt_decode from 'jwt-decode';

class Token extends Component{

    getToken(){
        var token1 = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IlF6UkJOakEyTWprMU5qQkJRa1EzTlVFM016ZzNRa1F5TXpFd01VRTBRVGRCTXpRMFJFSkROUT09In0.eyJleHAiOjE1MDgxMzE5NzAsIlN1YmplY3QiOiJJUy1XU08yLkNPTS9idWRkaGlrQHdzbzIuY29tQHdzbzJpbnRlcm5hbHN0ZyIsImh0dHA6Ly93c28yLm9yZy9jbGFpbXMvcm9sZSI6IklTLVdTTzIuQ09NL3dzbzIuaW50ZXJucyxJUy1XU08yLkNPTS93c28yLnNob3J0dGVybS1lbXBsb3llZXMsSVMtV1NPMi5DT00vYWRtaW4uZW5naW5lZXJpbmcucHJvZmlsZS5hbGwuYXBwcyxJbnRlcm5hbC9ldmVyeW9uZSIsInN1YiI6IklTLVdTTzIuQ09NL2J1ZGRoaWtAd3NvMi5jb21Ad3NvMmludGVybmFsc3RnIiwiaHR0cDovL3dzbzIub3JnL2NsYWltcy9lbWFpbGFkZHJlc3MiOiJidWRkaGlrQHdzbzIuY29tIiwiaXNzIjoid3NvMi5vcmcvcHJvZHVjdHMvYXBwbSIsImF1ZCI6WyJFQ1Atd3NvMmludGVybmFsc3RnLTEuMCIsImNhcmJvblNlcnZlciJdfQ.U1cVIx9mNCcbfnH7UEmFKgYHyRUkutNaneHqHB0ZU48';
        var token2 = 'eyJ4NXQiOiJRelJCTmpBMk1qazFOakJCUWtRM05VRTNNemczUWtReU16RXdNVUUwUVRkQk16UTBSRUpETlE9PSIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJodHRwOi8vd3NvMi5vcmcvY2xhaW1zL3JvbGUiOiJJUy1XU08yLkNPTS93c28yLmludGVybnMsSVMtV1NPMi5DT00vd3NvMi5zaG9ydHRlcm0tZW1wbG95ZWVzLElTLVdTTzIuQ09NL2FkbWluLmVuZ2luZWVyaW5nLnByb2ZpbGUuYWxsLmFwcHMsSW50ZXJuYWwvZXZlcnlvbmUiLCJTdWJqZWN0IjoiSVMtV1NPMi5DT00vc2FqaXRoYWxAd3NvMi5jb21Ad3NvMmludGVybmFsc3RnIiwiZXhwIjoxNTA4MTMyMDM4LCJpc3MiOiJ3c28yLm9yZy9wcm9kdWN0cy9hcHBtIiwic3ViIjoiSVMtV1NPMi5DT00vc2FqaXRoYWxAd3NvMi5jb21Ad3NvMmludGVybmFsc3RnIiwiaHR0cDovL3dzbzIub3JnL2NsYWltcy9lbWFpbGFkZHJlc3MiOiJzYWppdGhhbEB3c28yLmNvbSIsImF1ZCI6WyJFQ1Atd3NvMmludGVybmFsc3RnLTEuMCIsImNhcmJvblNlcnZlciJdfQ.POc08s1XKiUtvGaz_Lt6_4Tnyo9G_SjaZUgoXWJ0jHQ';
        var token3 = 'eyJ4NXQiOiJRelJCTmpBMk1qazFOakJCUWtRM05VRTNNemczUWtReU16RXdNVUUwUVRkQk16UTBSRUpETlE9PSIsImFsZyI6IlJTMjU2IiwidHlwIjoiSldUIn0.eyJodHRwOi8vd3NvMi5vcmcvY2xhaW1zL3JvbGUiOiJJUy1XU08yLkNPTS93c28yLmludGVybnMsSVMtV1NPMi5DT00vd3NvMi5zaG9ydHRlcm0tZW1wbG95ZWVzLElTLVdTTzIuQ09NL2FkbWluLmVuZ2luZWVyaW5nLnByb2ZpbGUuYWxsLmFwcHMsSW50ZXJuYWwvZXZlcnlvbmUiLCJleHAiOjE1MDgxMzIxMDIsInN1YiI6IklTLVdTTzIuQ09NL2Iud2F0aHNhbGEuYndAZ21haWwuY29tQHdzbzJpbnRlcm5hbHN0ZyIsImlzcyI6IndzbzIub3JnL3Byb2R1Y3RzL2FwcG0iLCJTdWJqZWN0IjoiSVMtV1NPMi5DT00vYi53YXRoc2FsYS5id0BnbWFpbC5jb21Ad3NvMmludGVybmFsc3RnIiwiaHR0cDovL3dzbzIub3JnL2NsYWltcy9lbWFpbGFkZHJlc3MiOiJiLndhdGhzYWxhLmJ3QGdtYWlsLmNvbSIsImF1ZCI6WyJFQ1Atd3NvMmludGVybmFsc3RnLTEuMCIsImNhcmJvblNlcnZlciJdfQ.f_jYoYe35_BiRlX0l6TNNG37cnjtvIWx0Hb7ajGnaDc'
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