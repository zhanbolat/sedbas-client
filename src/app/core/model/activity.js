"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../util/utils");
var activity_deploy_actor_1 = require("./activity.deploy.actor");
var Activity = (function () {
    function Activity(activityData) {
        var utils = new utils_1.Utils();
        this.id = activityData.id;
        this.type = activityData.type;
        this.name = activityData.name;
        this.displayName = activityData.displayName;
        this.description = activityData.description;
        this.displayDescription = activityData.displayDescription;
        this.state = activityData.state;
        this.reached_state_date = utils.getDateValue(activityData.reached_state_date);
        this.last_update_date = utils.getDateValue(activityData.last_update_date);
        this.dueDate = utils.getDateValue(activityData.dueDate);
        this.priority = activityData.priority;
        this.processId = activityData.processId;
        this.parentCaseId = activityData.parentCaseId;
        this.rootCaseId = activityData.rootCaseId;
        this.rootContainerId = activityData.rootContainerId;
        this.executedBy = activityData.executedBy;
        this.executedBySubstitute = activityData.executedBySubstitute;
        if (this.actorId instanceof activity_deploy_actor_1.ActivityDeployActor) {
            this.actorId.id = activityData.actorId.id;
            this.actorId.process_id = activityData.actorId.process_id;
            this.actorId.description = activityData.actorId.description;
            this.actorId.name = activityData.actorId.name;
            this.actorId.displayName = activityData.actorId.displayName;
        }
        else {
            this.actorId = activityData.actorId;
        }
        this.assigned_id = activityData.assigned_id;
        if (activityData.assigned_date != '') {
            this.assigned_date = utils.getDateValue(activityData.assigned_date);
        }
    }
    return Activity;
}());
exports.Activity = Activity;
