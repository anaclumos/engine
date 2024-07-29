import { Button } from "@anaclumos/design/components/ui/button"
import { Input } from "@anaclumos/design/components/ui/input"
import { Label } from "@anaclumos/design/components/ui/label"
import { ErrorToast } from "@anaclumos/design/components/error"
import type { LuciaActionResult } from "../auth"

export default function SignInForm({
  action,
  callBackUrl,
}: {
  action: (formData: FormData) => Promise<LuciaActionResult>
  callBackUrl?: string
}) {
  return (
    <>
      <div className="flex items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
              Sign Up
            </h2>
          </div>
          <form className="space-y-6" action={action}>
            <div>
              <Label
                htmlFor="username"
                className="block text-sm font-medium text-muted-foreground"
              >
                Username
              </Label>
              <div className="mt-1">
                <Input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 shadow-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                  placeholder="elon.musk"
                />
              </div>
            </div>
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
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 shadow-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                  placeholder="elon@tesla.com"
                />
              </div>
            </div>
            <div>
              <Label
                htmlFor="fullName"
                className="block text-sm font-medium text-muted-foreground"
              >
                Full Name
              </Label>
              <div className="mt-1">
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="fullName"
                  required
                  className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 shadow-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                  placeholder="Elon Musk"
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
                {callBackUrl && callBackUrl.length > 0
                  ? `Continue to ${callBackUrl}`
                  : "Sign Up"}
              </Button>
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
