import Link from "next/link"
import styles from "./navbar.module.css";

export const Navbar = () => {
  // A simple navbar component with links
  return (
    <nav className={styles.navbarStyles}>
        <Link href={'/'} className={styles.navLink}>New Appointment</Link>
        <Link href={'/appointments'} className={styles.navLink}>Appointments list</Link>
    </nav>
  )
}
