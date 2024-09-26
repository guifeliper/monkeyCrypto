import { getMessages } from "@/components/get-messages"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { buttonVariants } from "@/components/ui/button"
import { UserAccountNav } from "@/components/user-account-nav"
import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import pick from "lodash/pick"
import { NextIntlClientProvider } from "next-intl"
import Link from "next/link"

interface DashboardLayoutProps {
  children?: React.ReactNode
  params: {
    locale: string
  }
}

export default async function DashboardLayout({
  children,
  params: { locale },
}: DashboardLayoutProps) {
  const user = await getCurrentUser()
  let messages = await getMessages(locale ?? "en")

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={pick(messages, "MainNavigation")}
    >
      <div className="flex min-h-screen flex-col space-y-6">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container flex h-16 items-center justify-between py-4">
            <MainNav items={dashboardConfig.mainNav} />
            {user && (
              <UserAccountNav
                user={{
                  name: user.name,
                  image: user.image,
                  email: user.email,
                }}
              />
            )}
            {!user && (
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "px-4"
                )}
              >
                Login
              </Link>
            )}
          </div>
        </header>

        <main className="container grid flex-1 gap-6 md:grid-cols-[400px_1fr]">
          {children}
        </main>
        <SiteFooter className="border-t" />
      </div>
    </NextIntlClientProvider>
  )
}
