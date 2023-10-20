/* Example File from https://github.com/nextauthjs/next-auth-example*/

import { SessionProvider } from "next-auth/react"
import "./styles.css"
import "../css/form.css" // mongodb example css
import "../css/style.css" // mongodb example css

import type { AppProps } from "next/app"
import type { Session } from "next-auth"
import Link from "next/link"

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
