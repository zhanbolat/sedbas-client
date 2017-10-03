"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var ConfigService = (function () {
    function ConfigService(location) {
        // default zgwnu Business Data Model Package configuration
        // businessDataModelPackage: string = 'com.zaakgerichtwerkennu.model'
        // default bonita path configuration
        this.basePath = '/bonita';
        this.apiPath = '/API';
        this.fileUploadPath = '/portal/fileUpload';
        this.processUploadPath = '/portal/processUpload';
        this.organizationUploadPath = '/portal/organizationUpload';
        this.actorsUploadPath = '/portal/actorsUpload';
        this.imageUploadPath = '/portal/imageUpload';
        this.formsDocumentImagePath = '/portal/formsDocumentImage';
        // rest api options
        this.bonitaSessionTokenKey = 'X-Bonita-API-Token';
        this.defaultHeaders = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.options = new http_1.RequestOptions({ headers: this.defaultHeaders });
        this.initialize();
    }
    ConfigService.prototype.initialize = function () {
        if (location.hostname == 'localhost') {
            // local development server configuration (Bonita Studio with Angular JIT)
            this.hostUrl = 'http://localhost:8081';
        }
        else {
            // external test or production server configuration (Bonita Platform with AOT WAR deployment)
            this.hostUrl = location.origin;
        }
        this.configUrls();
    };
    ConfigService.prototype.configUrls = function () {
        this.baseUrl = this.hostUrl + this.basePath;
        this.apiUrl = this.baseUrl + this.apiPath;
        this.fileUploadUrl = this.baseUrl + this.fileUploadPath;
        this.processUploadUrl = this.baseUrl + this.processUploadPath;
        this.organizationUploadUrl = this.baseUrl + this.organizationUploadPath;
        this.actorsUploadUrl = this.baseUrl + this.actorsUploadPath;
        this.imageUploadUrl = this.baseUrl + this.imageUploadPath;
        this.formsDocumentImageUrl = this.baseUrl + this.formsDocumentImagePath;
    };
    Object.defineProperty(ConfigService.prototype, "session", {
        get: function () {
            return this._session;
        },
        set: function (session) {
            this._session = session;
            this.configSendOptions();
        },
        enumerable: true,
        configurable: true
    });
    ConfigService.prototype.configSendOptions = function () {
        var defaultSendHeaders = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.sendOptions = new http_1.RequestOptions({ headers: defaultSendHeaders });
        this.appendSessionOptions(this.sendOptions);
    };
    ConfigService.prototype.appendSessionOptions = function (optionsRef) {
        if (this._session.token) {
            optionsRef.headers.append(this.bonitaSessionTokenKey, this._session.token);
        }
    };
    return ConfigService;
}());
ConfigService = __decorate([
    core_1.Injectable()
], ConfigService);
exports.ConfigService = ConfigService;
