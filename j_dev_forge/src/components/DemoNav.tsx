import Link from "next/link"
import styles from "./header.module.css"
/* Example File from https://github.com/nextauthjs/next-auth-example*/
// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function DemoNav() {

  return (
      <nav>
        <ul className={styles.navItems}>
      {/* Pets Example */}
          <li className={styles.navItem}>
            <Link href="/pets">Pets</Link>
          </li>
      {/* Pets Example */}
      {/* NextAuth Example */}
          <li className={styles.navItem}>
            <Link href="/client">Client</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/server">Server</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/protected">Protected</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/api-example">API</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/admin">Admin</Link>
          </li>
      {/* NextAuth Example */}
        </ul>
      </nav>
  )
}
