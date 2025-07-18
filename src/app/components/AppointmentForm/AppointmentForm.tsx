import { ChangeEvent, FormEvent, useState } from "react"
import styles from './appointmentForm.module.css';
import { useMutation} from "@tanstack/react-query";
import { insertAppointment } from "@/services/appointment.service";

export const AppointmentForm = () => {

    //We use the useState to capture the data of each of the inputs and selects inside the form 
    const [name, setName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [specialtyField, setSpecialtyField] = useState<string>(''); 
    const [priority, setPriority] = useState<number>(0);
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [reason, setReason] = useState<string>('');

    //Here we use the useMutation from tanstack to insert the data 
    const mutation = useMutation({
        mutationFn: insertAppointment,
    });

    const handleForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newAppointment = {
            name: name,
            lastname: lastName,
            specialtyField: specialtyField,
            priority,
            appointmentDateHour: `${date}T${time}:00`,
            reason
        };

        mutation.mutate({ newAppointment });

        setName('');
        setLastName('');
        setSpecialtyField('');
        setPriority(0);
        setDate('');
        setTime('');
        setReason('');
    }

  return (
    <>
    <div className={styles.Container}>

        
         {mutation.isSuccess?(
                <div className={styles.successAlert}>
                    ✅ Appointment created successfully!
                </div>
         ): null}

         {mutation.isError?(
                <div className={styles.errorAlert}>
                    ❌ Error: {mutation.error?.message || 'Something went wrong'}
                </div>
         ):null }

         {mutation.isPending?(
                <div className={styles.loadingAlert}>
                    ⏳ Saving appointment...
                </div>
         ):null}
    

        <form action="#" className={styles.formStyle} onSubmit={handleForm}>
                <div className={styles.formGroup}>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" placeholder="Please enter your name" onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} value={name} />
                </div>
                <div className={styles.formGroup}>
                <label htmlFor="lastname">Lastname:</label>
                <input type="text" name="lastname" id="lastname" placeholder="Please enter your lastname" onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)} value={lastName}/>
                </div>
                <div className={styles.formGroup}>
                <label htmlFor="specialtyField">Specialty Field:</label>
                <select name="specialtyField" id="specialtyField" onChange={(e: ChangeEvent<HTMLSelectElement> ) => setSpecialtyField(e.target.value)} value={specialtyField}>
                    <option value="">Select a specialty</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="dermatology">Dermatology</option>
                    <option value="pediatrics">Pediatrics</option>
                    <option value="neurology">Neurology</option>
                    <option value="orthopedics">Orthopedics</option>
                    <option value="gynecology">Gynecology</option>
                    <option value="psychiatry">Psychiatry</option>
                </select>
                </div>
                <div className={styles.formGroup}>
                <label htmlFor="priority">Priority:</label>
                <select name="priority" id="priority"  onChange={(e: ChangeEvent<HTMLSelectElement>) => setPriority(Number(e.target.value))} value={priority}>
                        <option value="">Select priority</option>
                        <option value="1">Normal</option>
                        <option value="2">Mild</option>
                        <option value="3">Urgent</option>
                </select>
                </div>
                <div className={styles.dateTimeGroup}>
                <div>
                <label htmlFor="date">Date:</label>  
                <input type="date" name="date" id="date"  onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)} value={date}  />
                </div>
                <div>
                <label htmlFor="time">Hour:</label>
                <input type="time" name="time" id="time"  onChange={(e: ChangeEvent<HTMLInputElement>) => setTime(e.target.value)} value={time} />
                </div>
                </div>
                <div className={styles.formGroup}>
                <label htmlFor="reason">Reason:</label>
                <textarea name="reason" id="reason" onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setReason(e.target.value)} value={reason}></textarea>
                </div>
                <div className={styles.submitButton}>
                    <button type="submit">Create Appointment</button>
                </div>
        </form>
    </div>
    </>
  )
}
