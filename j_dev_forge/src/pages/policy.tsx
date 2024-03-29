/* Example File from https://github.com/nextauthjs/next-auth-example*//* Example File from https://github.com/nextauthjs/next-auth-example*/

import Link from "next/link"
import Layout from "../components/layout"

export default function PolicyPage() {
  return (
    <Layout>
      <p>
        This is an example site to demonstrate how to use <Link href={"https://next-auth.js.org"}>NextAuth.js</Link> for authentication.
      </p>
      <h2>Terms of Service</h2>
      <p>
        THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS
        OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
        IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
        CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
        TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
        SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      </p>
      <h2>Privacy Policy</h2>
      <p>
        The authentication part of the site uses JSON Web Tokens and an in-memory database which resets
        every ~2 hours.
      </p>
      <p>
        Authentication Data provided to this site is exclusively used to support signing in and
        is not passed to any third party services, other than via SMTP or OAuth
        for the purposes of authentication.

        Form data is stored in a mongoDB database.
      </p>
    </Layout>
  )
}
