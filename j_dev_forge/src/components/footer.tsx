/* Example File from https://github.com/nextauthjs/next-auth-example*/

import Link from "next/link"
import styles from "./footer.module.css"
import packageJSON from "../../package.json"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <hr />
      <ul className={styles.navItems}>
        <li className={styles.navItem}>
            <Link href="/dev_resources">Dev Resources</Link>
        </li>
        <li className={styles.navItem}>
          <a href="https://next-auth.js.org">NEXT-Auth Docs</a>
        </li>
        <li className={styles.navItem}>
          <a href="https://github.com/nextauthjs/next-auth-example">Next-Auth GitHub</a>
        </li>
        <li className={styles.navItem}>
          <Link href="/policy">Policy</Link>
        </li>
        <li className={styles.navItem}>
          <em>next-auth@{packageJSON.dependencies["next-auth"]}</em>
        </li>
      </ul>
    </footer>
  )
}
