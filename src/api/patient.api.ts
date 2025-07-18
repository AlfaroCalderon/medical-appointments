import axios from "axios";

export const medicalAppointment = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        apikey: process.env.NEXT_PUBLIC_API_TOKEN
    }
});


