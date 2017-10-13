import {Component} from 'react';
import jwt_decode from 'jwt-decode';

class Token extends Component{

    getToken(){
        var token1 = 'eyJ4NXQiOiJRelJCTmpBMk1qazFOakJCUWtRM05VRTNNemczUWtReU16RXdNVUUwUVRkQk16UTBSRUpETlE9PSIsImFsZyI6IlJTMjU2IiwidHlwIjoiSldUIn0.eyJpc3MiOiJ3c28yLm9yZy9wcm9kdWN0cy9hcHBtIiwic3ViIjoiSVMtV1NPMi5DT00vYnVkZGhpa0B3c28yLmNvbUB3c28yaW50ZXJuYWxzdGciLCJodHRwOi8vd3NvMi5vcmcvY2xhaW1zL3JvbGUiOiJJUy1XU08yLkNPTS93c28yLmludGVybnMsSVMtV1NPMi5DT00vd3NvMi5zaG9ydHRlcm0tZW1wbG95ZWVzLElTLVdTTzIuQ09NL2FkbWluLmVuZ2luZWVyaW5nLnByb2ZpbGUuYWxsLmFwcHMsSW50ZXJuYWwvZXZlcnlvbmUiLCJhdWQiOlsiRUNQLXdzbzJpbnRlcm5hbHN0Zy0xLjAiLCJjYXJib25TZXJ2ZXIiXSwiaHR0cDovL3dzbzIub3JnL2NsYWltcy9lbWFpbGFkZHJlc3MiOiJidWRkaGlrQHdzbzIuY29tIiwiZXhwIjoxNTA3ODcwMDU5LCJTdWJqZWN0IjoiSVMtV1NPMi5DT00vYnVkZGhpa0B3c28yLmNvbUB3c28yaW50ZXJuYWxzdGcifQ.hxcEfKuRWiGgvMWXA_nCI2dGPS1E46MZV99jLl16iRE';
        var token2 = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsIng1dCI6IlF6UkJOakEyTWprMU5qQkJRa1EzTlVFM016ZzNRa1F5TXpFd01VRTBRVGRCTXpRMFJFSkROUT09In0.eyJpc3MiOiJ3c28yLm9yZy9wcm9kdWN0cy9hcHBtIiwiaHR0cDovL3dzbzIub3JnL2NsYWltcy9yb2xlIjoiSVMtV1NPMi5DT00vd3NvMi5pbnRlcm5zLElTLVdTTzIuQ09NL3dzbzIuc2hvcnR0ZXJtLWVtcGxveWVlcyxJUy1XU08yLkNPTS9hZG1pbi5lbmdpbmVlcmluZy5wcm9maWxlLmFsbC5hcHBzLEludGVybmFsL2V2ZXJ5b25lIiwiYXVkIjpbIkVDUC13c28yaW50ZXJuYWxzdGctMS4wIiwiY2FyYm9uU2VydmVyIl0sImV4cCI6MTUwNzg3MDE2MiwiU3ViamVjdCI6IklTLVdTTzIuQ09NL2lzaGlrYUB3c28yLmNvbUB3c28yaW50ZXJuYWxzdGciLCJodHRwOi8vd3NvMi5vcmcvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImlzaGlrYUB3c28yLmNvbSIsInN1YiI6IklTLVdTTzIuQ09NL2lzaGlrYUB3c28yLmNvbUB3c28yaW50ZXJuYWxzdGcifQ.ajsDWUKrB4D9PzwKTs7-3ba8LCaUX-YH20MRqQSsQy4';
        var token3 = 'eyJ0eXAiOiJKV1QiLCJ4NXQiOiJRelJCTmpBMk1qazFOakJCUWtRM05VRTNNemczUWtReU16RXdNVUUwUVRkQk16UTBSRUpETlE9PSIsImFsZyI6IlJTMjU2In0.eyJodHRwOi8vd3NvMi5vcmcvY2xhaW1zL3JvbGUiOiJJUy1XU08yLkNPTS93c28yLmludGVybnMsSVMtV1NPMi5DT00vd3NvMi5zaG9ydHRlcm0tZW1wbG95ZWVzLElTLVdTTzIuQ09NL2FkbWluLmVuZ2luZWVyaW5nLnByb2ZpbGUuYWxsLmFwcHMsSW50ZXJuYWwvZXZlcnlvbmUiLCJodHRwOi8vd3NvMi5vcmcvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImIud2F0aHNhbGEuYndAZ21haWwuY29tIiwiZXhwIjoxNTA3ODcwMjQ5LCJpc3MiOiJ3c28yLm9yZy9wcm9kdWN0cy9hcHBtIiwic3ViIjoiSVMtV1NPMi5DT00vYi53YXRoc2FsYS5id0BnbWFpbC5jb21Ad3NvMmludGVybmFsc3RnIiwiU3ViamVjdCI6IklTLVdTTzIuQ09NL2Iud2F0aHNhbGEuYndAZ21haWwuY29tQHdzbzJpbnRlcm5hbHN0ZyIsImF1ZCI6WyJFQ1Atd3NvMmludGVybmFsc3RnLTEuMCIsImNhcmJvblNlcnZlciJdfQ.vA5W2QocydiAIh3czQWCXEjOjRvk7RocY7X_g6sGvcc'
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