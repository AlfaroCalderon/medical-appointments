'use client';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppointmentForm } from "./components/AppointmentForm/AppointmentForm";
import { AppointmentTable } from "./components/AppointmentTable/AppointmentTable";

export default function Home() {

  const queryClient = new QueryClient();
  return (
   <QueryClientProvider client={queryClient}>
      <AppointmentForm />
      <AppointmentTable />
     <ReactQueryDevtools initialIsOpen={false} />
   </QueryClientProvider>
  );
}
