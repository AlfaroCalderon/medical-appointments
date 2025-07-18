import styles from "./appointmentTable.module.css";
import { getAppointment } from "@/services/appointment.service";
import { useQuery } from "@tanstack/react-query";

export const AppointmentTable = () => {

     //Here we use the useQuery to get the data we've saved}
        const {data, isError, isPending, error} = useQuery({queryKey:['appointments'], queryFn: () => getAppointment()});

        console.log(data);
return (
    <>
    <div className={styles.tableContainer}>
            <table className={styles.tableStyle}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Lastname</th>
                        <th>Specialty Field</th>
                        <th>Priority</th>
                        <th>Appointment Date and Hour</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            data?.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td>{appointment.name}</td>
                                    <td>{appointment.lastname}</td>
                                    <td>{appointment.specialtyField}</td>
                                    <td>{appointment.priority}</td>
                                    <td>{appointment.appointmentDateHour}</td>
                                    <td>{appointment.reason}</td>
                                </tr>
                            ))
                        }
                </tbody>
            </table>
    </div>
    </>
  )
}
