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
    const [showValidationError, setShowValidationError] = useState<boolean>(false);

    //Here we use the useMutation from tanstack to insert the data 
    const mutation = useMutation({
        mutationFn: insertAppointment,
    });

    // This function validates if the data introduced in the form is correct, if not it shows an error message
    const handleForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Main validations of the form 
        if (!name.trim() || !lastName.trim() || !specialtyField || !priority || !date || !time || !reason.trim()) {
            setShowValidationError(true);
            return;
        }

        //If the validatios are correct, we create the object to send it to the backend
        const newAppointment = {
            name: name,
            lastname: lastName,
            specialtyField: specialtyField,
            priority,
            appointmentDateHour: `${date}T${time}:00`,
            reason
        };

        //Here with mutation we send the data XD
        mutation.mutate({ newAppointment });

        //We reset the form and the form validation alert 
        setName('');
        setLastName('');
        setSpecialtyField('');
        setPriority(0);
        setDate('');
        setTime('');
        setReason('');
        setShowValidationError(false);
    }

  return (
    <>
      {/* Here we show the alerts depending on the status of the mutation and the validation alert of the form*/}
        {mutation.isSuccess && (
                <div className={styles.successAlert}>
                    ✅ Appointment created successfully!
                </div>
         )}

         {mutation.isError &&(
                <div className={styles.errorAlert}>
                    ❌ Error: {mutation.error?.message || 'Something went wrong'}
                </div>
         )}

         {showValidationError && (
                <div className={styles.validationError}>
                    ❌ Please fill in all fields correctly.
                </div>
         )}

         {mutation.isPending &&(
                <div className={styles.loadingAlert}>
                    ⏳ Saving appointment...
                </div>
         )}
    {/* Here we reeturn the form */}
    <div className={styles.Container}>
        <form action="#" className={styles.formStyle} onSubmit={handleForm}>{/* The funtion to validate the form and send the data */}
                <div className={styles.formGroup}>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" placeholder="Please enter your name" onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} value={name} />{/*In each of the inputs and selects a onChange event to get the value and set it in the useStates we've got above*/}
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
