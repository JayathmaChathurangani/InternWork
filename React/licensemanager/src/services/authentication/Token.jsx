import { Component } from 'react';

/**
* @class Token
* @extends {Component}
* @description Get JWT
*/
class Token extends Component {
    /**
    * get main users
    * @returns {Sting} token
    */
    getToken() {
        const token1 = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsIng1dCI6IlF6UkJOakEyTWprMU5qQkJRa1EzTlVFM016ZzNRa1F5TXpFd01VRTBRVGRCTXpRMFJFSkROUT09In0.eyJodHRwOi8vd3NvMi5vcmcvY2xhaW1zL3JvbGUiOiJJUy1XU08yLkNPTS93c28yLmludGVybnMsSVMtV1NPMi5DT00vd3NvMi5zaG9ydHRlcm0tZW1wbG95ZWVzLElTLVdTTzIuQ09NL2FkbWluLmVuZ2luZWVyaW5nLnByb2ZpbGUuYWxsLmFwcHMsSW50ZXJuYWwvZXZlcnlvbmUiLCJleHAiOjE1MDk3Nzg3NjUsImh0dHA6Ly93c28yLm9yZy9jbGFpbXMvZW1haWxhZGRyZXNzIjoiYnVkZGhpa0B3c28yLmNvbSIsInN1YiI6IklTLVdTTzIuQ09NL2J1ZGRoaWtAd3NvMi5jb21Ad3NvMmludGVybmFsc3RnIiwiYXVkIjpbIkVDUC13c28yaW50ZXJuYWxzdGctMS4wIiwiY2FyYm9uU2VydmVyIl0sImlzcyI6IndzbzIub3JnL3Byb2R1Y3RzL2FwcG0iLCJTdWJqZWN0IjoiSVMtV1NPMi5DT00vYnVkZGhpa0B3c28yLmNvbUB3c28yaW50ZXJuYWxzdGcifQ.JcYxaXMKTDi-ejrO80DM3o5fHkdnTzL_USwA8teEcFE';// eslint-disable-line
        const token2 = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsIng1dCI6IlF6UkJOakEyTWprMU5qQkJRa1EzTlVFM016ZzNRa1F5TXpFd01VRTBRVGRCTXpRMFJFSkROUT09In0.eyJodHRwOi8vd3NvMi5vcmcvY2xhaW1zL3JvbGUiOiJJUy1XU08yLkNPTS93c28yLmludGVybnMsSVMtV1NPMi5DT00vd3NvMi5zaG9ydHRlcm0tZW1wbG95ZWVzLElTLVdTTzIuQ09NL2FkbWluLmVuZ2luZWVyaW5nLnByb2ZpbGUuYWxsLmFwcHMsSW50ZXJuYWwvZXZlcnlvbmUiLCJleHAiOjE1MDk3Nzg3NjUsImh0dHA6Ly93c28yLm9yZy9jbGFpbXMvZW1haWxhZGRyZXNzIjoiaXNoaWthQHdzbzIuY29tIiwic3ViIjoiSVMtV1NPMi5DT00vaXNoaWthQHdzbzIuY29tQHdzbzJpbnRlcm5hbHN0ZyIsImF1ZCI6WyJFQ1Atd3NvMmludGVybmFsc3RnLTEuMCIsImNhcmJvblNlcnZlciJdLCJpc3MiOiJ3c28yLm9yZy9wcm9kdWN0cy9hcHBtIiwiU3ViamVjdCI6IklTLVdTTzIuQ09NL2lzaGlrYUB3c28yLmNvbUB3c28yaW50ZXJuYWxzdGcifQ.8PA8r7GXstz4daPmZolz1i8-O4Tn-PuvNk6-9EPsfT0';// eslint-disable-line
        const token3 = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsIng1dCI6IlF6UkJOakEyTWprMU5qQkJRa1EzTlVFM016ZzNRa1F5TXpFd01VRTBRVGRCTXpRMFJFSkROUT09In0.eyJodHRwOi8vd3NvMi5vcmcvY2xhaW1zL3JvbGUiOiJJUy1XU08yLkNPTS93c28yLmludGVybnMsSVMtV1NPMi5DT00vd3NvMi5zaG9ydHRlcm0tZW1wbG95ZWVzLElTLVdTTzIuQ09NL2FkbWluLmVuZ2luZWVyaW5nLnByb2ZpbGUuYWxsLmFwcHMsSW50ZXJuYWwvZXZlcnlvbmUiLCJleHAiOjE1MDk3Nzg3NjUsImh0dHA6Ly93c28yLm9yZy9jbGFpbXMvZW1haWxhZGRyZXNzIjoiYi53YXRoc2FsYS5id0BnbWFpbC5jb20iLCJzdWIiOiJJUy1XU08yLkNPTS9iLndhdGhzYWxhLmJ3QGdtYWlsLmNvbUB3c28yaW50ZXJuYWxzdGciLCJhdWQiOlsiRUNQLXdzbzJpbnRlcm5hbHN0Zy0xLjAiLCJjYXJib25TZXJ2ZXIiXSwiaXNzIjoid3NvMi5vcmcvcHJvZHVjdHMvYXBwbSIsIlN1YmplY3QiOiJJUy1XU08yLkNPTS9iLndhdGhzYWxhLmJ3QGdtYWlsLmNvbUB3c28yaW50ZXJuYWxzdGcifQ.GDEOujfe3ybyaZvH-OBOyKXQmFkmovCNjTSeZMBzfeg';// eslint-disable-line
        return token1;
    }
}

export default (new Token());