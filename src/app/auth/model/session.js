"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Session = (function () {
    function Session(sessionData, headerData) {
        this.user_id = sessionData.user_id;
        this.user_name = sessionData.user_name;
        this.session_id = sessionData.session_id;
        this.conf = sessionData.conf;
        this.is_technical_user = (sessionData.is_technical_user == 'true');
        this.version = sessionData.version;
        if (sessionData.tenant) {
            this.tenant = sessionData.tenant;
        }
        var headers = headerData.toJSON();
        console.log(headers);
        this.token = headers['X-Bonita-API-Token'][0];
    }
    return Session;
}());
exports.Session = Session;
