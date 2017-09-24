import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'
import {RestApiService} from "../../rest-api/rest.api.service";
import {ConfigService} from "../../config/configs";
import {SearchParams} from "../model/search.params";
import {ProcessDefinition} from "../model/process.definition";
import {ProcessDefinitionMapping} from "../mappings/process.definition.mapping";
import {CreateCaseSuccessResponse} from "../responses/create.case.success.response";
import {DeployProcessDefinitionSuccessResponse} from "../responses/deploy.process.definition.success.response";
import {Utils} from "../../util/utils";
import {ProcessUpdateInput} from "../model/process.update.input";
import {ProcessUpdateSuccessResponse} from "../responses/process.update.success.response";
import {FileUploadResponse} from "../responses/file.upload.response";

@Injectable()
export class ProcessService extends RestApiService {
    private readonly RESOURCE_PATH: string = '/bpm/process'
    private resourceUrl: string

    constructor(
        private configService: ConfigService,
        private http: Http
    )
    {
        super()

        // configure resource urls
        this.resourceUrl = configService.apiUrl + this.RESOURCE_PATH
    }

    searchProcessDefinitions(searchParms: SearchParams): Observable<ProcessDefinition[]> {
        let processDefinitionMapping: ProcessDefinitionMapping = new ProcessDefinitionMapping()
        return this.http.get(this.buildSearchRequest(searchParms), this.configService.options)
            .map(processDefinitionMapping.mapResponseArray)
            .catch(this.handleResponseError)
    }

    private buildSearchRequest(searchParms: SearchParams): string {
        return this.resourceUrl + '?' + searchParms.getUrlEncondedParms()
    }

    getProcessDefinition(processDefinitionId: string): Observable<ProcessDefinition> {
        let processDefinitionMapping: ProcessDefinitionMapping = new ProcessDefinitionMapping()
        return this.http.get(this.resourceUrl + '/' + processDefinitionId, this.configService.options)
            .map(processDefinitionMapping.mapResponse)
            .catch(this.handleResponseError)
    }

    // Start a process using an instantiation contract
    //
    // based on: http://documentation.bonitasoft.com/?page=bpm-api#toc23
    //
    // Post URL template: ../API/bpm/process/:processId/instantiation
    //
    createCase(processId: string, contractValues: any): Observable<CreateCaseSuccessResponse> {
        let postUrl: string = this.resourceUrl + '/' + processId + '/instantiation'
        return this.http.post(postUrl, contractValues, this.configService.sendOptions)
            .map(this.mapCreateCaseSuccessResponse)
            .catch(this.handleResponseError)
    }

    private mapCreateCaseSuccessResponse(res: Response) {
        let successResponse = new CreateCaseSuccessResponse()
        successResponse.status = res.status
        successResponse.statusText = res.statusText
        successResponse.caseId = res.json().caseId
        return successResponse
    }

    // Deploy a process definition
    //
    // based on: http://documentation.bonitasoft.com/?page=bpm-api#toc28
    //
    // Post URL template: ../API/bpm/process
    //
    deployProcessDefinition(processUploadResponse: FileUploadResponse): Observable<DeployProcessDefinitionSuccessResponse> {
        let requestPayload: any = { "fileupload": processUploadResponse.tempPath }
        return this.http.post(this.resourceUrl, requestPayload, this.configService.sendOptions)
            .map(this.mapDeployProcessDefinitionSuccessResponse)
            .catch(this.handleResponseError)
    }

    private mapDeployProcessDefinitionSuccessResponse(res: Response) {
        let utils: Utils = new Utils()
        let successResponse = new DeployProcessDefinitionSuccessResponse()
        successResponse.status = res.status
        successResponse.statusText = res.statusText
        let body: any = res.json()
        successResponse.id = body.id
        successResponse.deploymentDate = utils.getDateValue(body.deploymentDate)
        successResponse.description = body.description
        successResponse.activationState = body.activationState
        successResponse.name = body.name
        successResponse.displayName = body.displayName
        successResponse.actorinitiatorid = body.actorinitiatorid
        successResponse.last_update_date = utils.getDateValue(body.last_update_date)
        successResponse.configurationState = body.configurationState
        successResponse.version = body.version
        return successResponse
    }

    updateProcessDefinition(processDefinitionId: string, updateInput: ProcessUpdateInput):  Observable<ProcessUpdateSuccessResponse> {
        return this.http.put(this.resourceUrl + '/' + processDefinitionId, updateInput, this.configService.sendOptions)
            .map(this.mapUpdateProcessDefinitionUpdateSuccessResponse)
            .catch(this.handleResponseError)
    }

    private mapUpdateProcessDefinitionUpdateSuccessResponse(res: Response) {
        let updateRes: ProcessUpdateSuccessResponse = new ProcessUpdateSuccessResponse()
        updateRes.status = res.status
        updateRes.statusText = res.statusText
        return updateRes
    }

}
