import { medicalAppointment } from "@/api/patient.api"
import { Appointment } from "@/types/appointment.type";



export const insertAppointment = async (props: { newAppointment: Appointment }) => {
    try {
        const response = await medicalAppointment.post(
            '/medical_appointments',
            props.newAppointment,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        return response;
    } catch (error) {
        throw new Error('An error has arisen: ' + error)
    }
}



export const getAppointment = async (): Promise<Appointment[] | never> => {
    try {
        const response = await medicalAppointment.get('/medical_appointments');
        return response.data;
        
    } catch (error) {
        throw new Error('An error has arisen: ' + error);
    }
}