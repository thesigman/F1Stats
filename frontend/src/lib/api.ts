import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000",
});

export async function getDriver(driverId: string) {
    const response = await api.get(`/drivers/${driverId}`);

    return response.data;
}