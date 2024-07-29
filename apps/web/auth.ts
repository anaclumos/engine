import { Lucia } from "lucia"
import { cookies, headers } from "next/headers"
import { cache } from "react"
import type { Session, User } from "lucia"

import { PrismaAdapter } from "@lucia-auth/adapter-prisma"
import { prisma } from "./prisma"
import { redirect } from "next/navigation"
import { siteConfig } from "./config/site"

const adapter = new PrismaAdapter(prisma.session, prisma.user)

export type LuciaActionResult = {
  error: string
}

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
    }
  },
})

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}

interface DatabaseUserAttributes {
  username: string
}

export const guard = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null
    if (!sessionId) {
      return {
        user: null,
        session: null,
      }
    }

    const result = await lucia.validateSession(sessionId)
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session?.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id)
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        )
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie()
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        )
      }
    } catch {}
    return result
  },
)

export const auth = async () => {
  const { user } = await guard()
  const headersList = headers()
  const url = new URL("/sign-in", siteConfig.address)
  const callbackUrl = headersList.get("x-url")
  if (callbackUrl) {
    url.searchParams.set("callbackUrl", callbackUrl)
  }
  if (!user) return redirect(url.toString())
  return user
}
