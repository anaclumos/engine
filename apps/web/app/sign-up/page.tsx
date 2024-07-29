import SignUpForm from "@anaclumos/web/components/sign-up-form.server"
import { Suspense } from "react"
import { prisma } from "@anaclumos/web/prisma"
import { hash } from "@node-rs/argon2"
import { cookies } from "next/headers"
import { lucia, type LuciaActionResult } from "@anaclumos/web/auth"
import { redirect } from "next/navigation"
import { generateIdFromEntropySize } from "lucia"
import { signUpSchema } from "@anaclumos/web/lib/zod"
import { createHash } from "node:crypto"
async function signup(formData: FormData): Promise<LuciaActionResult> {
  "use server"

  const { email, password, username, fullName } = await signUpSchema.parseAsync(
    {
      email: formData.get("email"),
      password: formData.get("password"),
      username: formData.get("username"),
      fullName: formData.get("fullName"),
    },
  )

  const passwordHash = await hash(password, {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  })
  const userId = generateIdFromEntropySize(10) // 16 characters long

  // TODO: check if username is already used
  await prisma.user.create({
    data: {
      email: email,
      id: userId,
      username: username,
      name: fullName,
      password_hash: passwordHash,
      picture: `http://www.gravatar.com/avatar/${createHash("md5")
        .update(email)
        .digest("hex")}`,
    },
  })

  const session = await lucia.createSession(userId, {})
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
  return <SignUpForm action={signup} callBackUrl={callbackUrl} />
}
