
import {ProcessConfigurationStateType} from "../model/process.configuration.state.type";
import {ProcessActivationStateType} from "../model/process.activation.state.type";
import {ResponseModel} from "../../rest-api/response";

export class DeployProcessDefinitionSuccessResponse extends ResponseModel {
    id: string
    deploymentDate: Date
    description: string
    activationState: ProcessActivationStateType
    name: string
    displayName: string
    actorinitiatorid: string
    last_update_date: Date
    configurationState: ProcessConfigurationStateType
    version: string
}
