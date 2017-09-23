import { Response } from '@angular/http'
import {DataMappingInterface} from "../../rest-api/data.mapping.interface";
import {Case} from "../model/case";

export class CaseMapping implements DataMappingInterface {

    mapResponse(res: Response) {
        let caseData = new Case(res.json())
        return caseData
    }

    mapResponseArray(res: Response) {
        let caseDataArray: Case[] = []
        let bodyArray: any[] = res.json()
        for (let body of bodyArray) { caseDataArray.push(new Case(body)) }
        return caseDataArray
    }

}
