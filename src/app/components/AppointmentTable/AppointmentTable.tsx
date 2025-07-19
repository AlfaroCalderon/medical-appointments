import styles from "./appointmentTable.module.css";
import { getAppointment } from "@/services/appointment.service";
import { useQuery } from "@tanstack/react-query";

export const AppointmentTable = () => {

     //Here we use the useQuery to get the data we've saved}
        const {data, isError, isPending, isSuccess, error} = useQuery({queryKey:['appointments'], queryFn: () => getAppointment()});
    
     // Function to convert priority number to string, pd in the db I created the priority as a number so is 1 = 'High', 2 = 'Medium', 3 = 'Low'
        const priority = (priority:number):string => {
            if (priority === 1) {
                return 'High';
            } else if (priority === 2) {
                return 'Medium';
            } else {
                return 'Low';
            }
        }

return (
    <>
    {/* The alerts they are similar to the ones I used in the form */}
    {isPending && (
        <div className={styles.loadingAlert}>
            ⏳ Loading appointments...
        </div>
    )}

    {isError && (
        <div className={styles.errorAlert}>
            ❌ Error: {error?.message || 'Something went wrong'}
        </div>
    )}

    {isSuccess && (
        <div className={styles.successAlert}>
            ✅ Appointments loaded successfully!
        </div>
    )}
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
                        { // Here we use map the data to show it in the table
                            data?.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td>{appointment.name}</td>
                                    <td>{appointment.lastname}</td>
                                    <td>{appointment.specialtyField}</td>
                                    <td>{priority(appointment.priority)}</td>
                                    <td>{appointment.appointmentDateHour.replace('T', ' ')}</td> 
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
