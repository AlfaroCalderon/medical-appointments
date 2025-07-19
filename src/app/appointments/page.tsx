'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppointmentTable } from "../components/AppointmentTable/AppointmentTable";
const page = () => {

    //I use Query client of tanstack gain, per page 
  const queryClient = new QueryClient();

  return(
    <QueryClientProvider client={queryClient} >
          <AppointmentTable />
    </QueryClientProvider>
  )
}


export default page;
