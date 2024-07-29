import SignInForm from "@anaclumos/web/components/sign-in-form.server"
import { verify } from "@node-rs/argon2"
import { cookies } from "next/headers"
import { lucia, type LuciaActionResult } from "@anaclumos/web/auth"
import { redirect } from "next/navigation"
import { prisma } from "@anaclumos/web/prisma"
import { signInSchema } from "@anaclumos/web/lib/zod"

async function login(formData: FormData): Promise<LuciaActionResult> {
  "use server"

  const { email, password } = await signInSchema.parseAsync({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  // Login Throttling to Prevent Brute Force Attacks
  await new Promise((resolve) => setTimeout(resolve, 2000))

  if (!existingUser || !existingUser.password_hash) {
    return {
      error: "Incorrect username or password",
    }
  }

  const validPassword = await verify(existingUser.password_hash, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  })
  if (!validPassword) {
    return {
      error: "Incorrect username or password",
    }
  }

  const session = await lucia.createSession(existingUser.id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  )
  return redirect("/")
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  let callbackUrl = searchParams?.callbackUrl
  if (typeof callbackUrl !== "string") {
    callbackUrl = ""
  }
  return <SignInForm action={login} callBackUrl={callbackUrl} />
}
