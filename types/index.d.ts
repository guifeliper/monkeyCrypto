import { User } from "@prisma/client"

import { Icons } from "@/components/icons"

//Need improvement on Typescript
//it should get it automatically from the file
type MenuTypes =
  | "tokenDrawn"
  | "pricing"
  | "features"
  | "login"
  | "openApp"
  | "menu"
  | "portfolio"
  | "billing"

export type NavItem = {
  title: MenuTypes
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}

export type DocsConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type MarketingConfig = {
  mainNav: MainNavItem[]
}

export type DashboardConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type SubscriptionPlan = {
  name: string
  description: string
  stripePriceId: string
}

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId", "stripeCancelled"> & {
    stripeCurrentPeriodEnd: number
    isPro: boolean
  }

export type AssetBalance = {
  asset: string
  quantity: number
  pair: string | null
  value: number
  totalFIAT: number
  weight: number
}

export type InvestmentBalanceData = {
  totalBalanceFIAT: number
  data: AssetBalance[]
}
