'use client';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppointmentForm } from "./components/AppointmentForm/AppointmentForm";

export default function Home() {

  //I use Query client of tanstack to manage the state of the appointments
  const queryClient = new QueryClient();
  return (
   <QueryClientProvider client={queryClient}>
      <AppointmentForm />
     <ReactQueryDevtools initialIsOpen={false} />
   </QueryClientProvider>
  );
}
