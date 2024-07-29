import { Button } from "@anaclumos/design/components/ui/button"
import { lucia, guard, type LuciaActionResult } from "@anaclumos/web/auth"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

async function logout(): Promise<LuciaActionResult> {
  "use server"
  const { session } = await guard()
  if (!session) {
    return {
      error: "Unauthorized",
    }
  }

  await lucia.invalidateSession(session.id)

  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  )
  return redirect("/sign-in")
}

const SignOutButton = () => {
  return (
    <form action={logout}>
      <Button type="submit" className="flex items-center justify-center">
        Sign Out
      </Button>
    </form>
  )
}

export default SignOutButton
