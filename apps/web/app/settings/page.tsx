import { Suspense } from "react"
import { guard } from "@anaclumos/web/auth"

import Loading from "./loading"
import { redirect } from "next/navigation"

export default async function SettingsPage() {
  const user = await guard()
  if (!user) redirect("/sign-in")
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Settings
        </h1>
        <Suspense fallback={<Loading />}>
          {JSON.stringify(user, null, 2)}
        </Suspense>
      </div>
    </section>
  )
}
