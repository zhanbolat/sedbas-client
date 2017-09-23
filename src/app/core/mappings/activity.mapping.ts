import { Response } from '@angular/http'
import {DataMappingInterface} from "../../rest-api/data.mapping.interface";
import {Activity} from "../model/activity";

export class ActivityMapping implements DataMappingInterface {

    mapResponse(res: Response) {
        let activityData = new Activity(res.json())
        return activityData
    }

    mapResponseArray(res: Response) {
        let activityDataArray: Activity[] = []
        let bodyArray: any[] = res.json()
        for (let body of bodyArray) { activityDataArray.push(new Activity(body)) }
        return activityDataArray
    }

}
