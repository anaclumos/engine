import { Suspense } from "react"

import Loading from "./loading"

import SignOutButton from "@anaclumos/web/components/sign-out-button.server"
import { auth } from "@anaclumos/web/auth"

export default async function ProfilePage() {
  const user = await auth()

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Profile
        </h1>
        <Suspense fallback={<Loading />}>
          {JSON.stringify(user, null, 2)}
          <SignOutButton />
        </Suspense>
      </div>
    </section>
  )
}
