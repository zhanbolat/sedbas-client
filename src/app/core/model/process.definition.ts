
import {Utils} from "../../util/utils";
import {ProcessActivationStateType} from "./process.activation.state.type";
import {ProcessConfigurationStateType} from "./process.configuration.state.type";

export class ProcessDefinition {

    constructor(processDefinitionData?: any)
    {
        const utils = new Utils()

        if (processDefinitionData) {
            this.id = processDefinitionData.id
            this.icon = processDefinitionData.icon
            this.displayDescription = processDefinitionData.displayDescription
            this.deploymentDate = utils.getDateValue(processDefinitionData.deploymentDate)
            this.description = processDefinitionData.description
            this.activationState = processDefinitionData.activationState
            this.name = processDefinitionData.name
            this.deployedBy = processDefinitionData.deployedBy
            this.displayName = processDefinitionData.displayName
            this.actorinitiatorid = processDefinitionData.actorinitiatorid
            this.last_update_date = utils.getDateValue(processDefinitionData.last_update_date)
            this.configurationState = processDefinitionData.configurationState
            this.version = processDefinitionData.version
        }
    }

    id: string // "the identifier of the process definition (long)",
    icon: string // "icon path (string)",
    displayDescription: string // "the human readable activity description (string)",
    deploymentDate: Date // "the date when the process definition was deployed (date)",
    description: string // "the process description (string)",
    activationState: ProcessActivationStateType // "the state of the process definition (ENABLED or DISABLED)",
    name: string // "the process name (string)",
    deployedBy: string // "the id of the user who deployed the process (integer)",
    displayName: string // "the human readable process description (string)",
    actorinitiatorid: string // "the id of the actor that can initiate cases of the process",
    last_update_date: Date // "the date when the process definition was last updated (date)",
    configurationState: ProcessConfigurationStateType // "the configuration state of the process (UNRESOLVED or RESOLVED)",
    version: string // "the version of the process (string)"
}
