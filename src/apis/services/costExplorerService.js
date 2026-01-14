import apiClient from "../apiClient";


export const apiFetchAllReports = async (query) => {
    const response = await apiClient.get(`/cost-explorer/reports?${query}`);
    return response.data;
}

export const fetchCostExplorerData = async ({
  startDate,
  endDate,
  groupBy,
  granularity,
}) => {
  const response = await apiClient.get("/cost-explorer", {
    params: { startDate, endDate, groupBy, granularity },
  });
  return response.data;
};
