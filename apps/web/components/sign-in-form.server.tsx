"use server"

import { Button } from "@anaclumos/design/components/ui/button"
import { Input } from "@anaclumos/design/components/ui/input"
import { Label } from "@anaclumos/design/components/ui/label"
import { ErrorToast } from "@anaclumos/design/components/error"
import type { LuciaActionResult } from "@anaclumos/web/auth"
import Link from "next/link"

export default async function SignInForm({
  action,
  callBackUrl,
}: {
  action: (formData: FormData) => Promise<LuciaActionResult>
  callBackUrl?: string
}): Promise<JSX.Element> {
  return (
    <>
      <div className="flex items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
              Sign In
            </h2>
          </div>
          <form className="space-y-6" action={action}>
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-muted-foreground"
              >
                Email
              </Label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 shadow-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                  placeholder="elon@tesla.com"
                />
              </div>
            </div>
            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-muted-foreground"
              >
                Password
              </Label>
              <div className="mt-1">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 shadow-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
            {callBackUrl && (
              <input type="hidden" name="callBackUrl" value={callBackUrl} />
            )}
            <div>
              <Button
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {callBackUrl && callBackUrl.length > 0 ? "Continue" : "Sign in"}
              </Button>
              <div className="mt-4 flex justify-between">
                <Link
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  href="/sign-up"
                >
                  Sign up
                </Link>
                <Link
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  href="/forgot-password"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      {callBackUrl && (
        <ErrorToast trigger={callBackUrl} text="Sign in to continue!" />
      )}
    </>
  )
}
