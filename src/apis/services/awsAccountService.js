import apiClient from "../apiClient";

export const apiSubmitAwsAccount = async (accountData) => {
    const response = await apiClient.post("/accounts", accountData);
    return response.data;
}

export const apiFetchAllAwsAccounts = async () => {
    const response = await apiClient.get("/accounts");
    return response.data.data;
}
