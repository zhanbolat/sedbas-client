import { Response } from '@angular/http'
import {DataMappingInterface} from "../../rest-api/data.mapping.interface";
import {ProcessDefinition} from "../model/process.definition";

export class ProcessDefinitionMapping implements DataMappingInterface {

    mapResponse(res: Response) {
        console.log(res)
        let processDefinitionData = new ProcessDefinition(res.json())
        return processDefinitionData
    }

    mapResponseArray(res: Response) {
        let processDefinitionDataArray: ProcessDefinition[] = []
        let bodyArray: any[] = res.json()
        for (let body of bodyArray) { processDefinitionDataArray.push(new ProcessDefinition(body)) }
        return processDefinitionDataArray
    }

}
