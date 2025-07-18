import { getAppointment } from "@/services/appointment.service";
import { useQuery } from "@tanstack/react-query";

export const AppointmentTable = () => {

     //Here we use the useQuery to get the data we've saved}
        const query = useQuery({queryKey:['appointments'], queryFn: () => getAppointment()});

return (
    <div>AppointmentTable</div>
  )
}
