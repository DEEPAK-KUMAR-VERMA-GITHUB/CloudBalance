import {
  SCHEDULER_CHANGE_RESOURCE_TYPE,
  SCHEDULER_FETCH_FAILURE,
  SCHEDULER_FETCH_REQUEST,
  SCHEDULER_FETCH_SUCCESS,
} from "../constants";

const getMockSchedulerData = (resourceType) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = {
        scheduled: resourceType === "EC2" ? 1 : 0,
        total: 3,
        percentage: resourceType == "EC2" ? 33 : 0,
        spending: {
          total: resourceType === "EC2" ? 7.74 : 478.76,
          forecasted: true,
        },
        savings: {
          achievedJan: resourceType === "EC2" ? 1.11 : 0.0,
          lifetime: resourceType === "EC2" ? 1.25 : 0.0,
          potentialMonthly: resourceType === "EC2" ? 7.67 : 408.36,
        },
        dailySavings:
          resourceType === "EC2"
            ? [
                { date: "Dec 11", value: 0.05 },
                { date: "Dec 12", value: 0.1 },
                { date: "Dec 13", value: 0.28 },
                { date: "Dec 14", value: 0.1 },
                { date: "Dec 15", value: 0.1 },
                { date: "Dec 16", value: 0.32 },
                { date: "Dec 17", value: 0.12 },
              ]
            : [],
        resources:
          resourceType === "EC2"
            ? [
                {
                  id: 1,
                  accountId: "767397907027",
                  resourceId: "i-0dd28079654bdaa79",
                  resourceName: "AWS Tag Compliance T...",
                  region: "N. Virginia",
                  status: "STOPPED",
                  potentialSavings: 0.0,
                  enableScheduler: true,
                },
                {
                  id: 2,
                  accountId: "767397907027",
                  resourceId: "i-06e31a56d502865e2",
                  resourceName: "kibana-uat-auditor",
                  region: "N. Virginia",
                  status: "STOPPED",
                  potentialSavings: 0.0,
                  enableScheduler: false,
                },
                {
                  id: 3,
                  accountId: "767397907027",
                  resourceId: "i-08210eb209314fe0b",
                  resourceName: "tuner-1",
                  region: "N. Virginia",
                  status: "RUNNING",
                  potentialSavings: 7.67,
                  enableScheduler: false,
                },
              ]
            : [
                {
                  id: 1,
                  accountId: "767397907027",
                  resourceId: "arn:aws:asg:us-east-1-29...",
                  resourceName: "nrs-asg",
                  region: "N. Virginia",
                  desiredCapacity: 0,
                  minSize: 0,
                  maxSize: 0,
                  status: "RUNNING",
                  potentialSavings: 155.15,
                  enableScheduler: false,
                },
                {
                  id: 2,
                  accountId: "767397907027",
                  resourceId: "arn:aws:asg:us-east-1-29...",
                  resourceName: "nrs-asg",
                  region: "N. Virginia",
                  desiredCapacity: 0,
                  minSize: 0,
                  maxSize: 0,
                  status: "RUNNING",
                  potentialSavings: 155.15,
                  enableScheduler: false,
                },
                {
                  id: 3,
                  accountId: "767397907027",
                  resourceId: "arn:aws:asg:us-east-1-29...",
                  resourceName: "nrs-asg",
                  region: "N. Virginia",
                  desiredCapacity: 0,
                  minSize: 0,
                  maxSize: 0,
                  status: "RUNNING",
                  potentialSavings: 98.05,
                  enableScheduler: false,
                },
              ],
      };

      resolve(data);
    }, 3000);
  });
};

export const fetchSchedulerData =
  (resourceType = "EC2") =>
  async (dispatch) => {
    dispatch({ type: SCHEDULER_FETCH_REQUEST });

    try {
      const data = await getMockSchedulerData(resourceType);
      dispatch({
        type: SCHEDULER_FETCH_SUCCESS,
        payload: { data, resourceType },
      });
    } catch (error) {
      dispatch({
        type: SCHEDULER_FETCH_FAILURE,
        payload: error.message,
      });
    }
  };

export const changeResourceType = (resourceType) => (dispatch) => {
  dispatch({ type: SCHEDULER_CHANGE_RESOURCE_TYPE, payload: resourceType });
  dispatch(fetchSchedulerData(resourceType));
};
