export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "@anaclumos/engine",
  description: "This is the ENGINE.",
  address:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_SITE_ADDRESS
      : "http://localhost:3000",
  mainNav: [
    {
      title: "Home",
      href: "/",
      icon: "logo",
      mobile: true,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: "analytics",
      mobile: true,
    },
    {
      title: "Briefcase",
      href: "/briefcase",
      icon: "briefcase",
      mobile: true,
    },
    {
      title: "Storage",
      href: "/storage",
      icon: "storage",
      mobile: true,
    },
  ],
}
