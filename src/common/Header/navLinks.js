// Single source of truth for primary navigation, shared by the desktop nav,
// the mobile drawer and the footer. Previously the nav was duplicated as
// literal JSX in two components and included dead links ("Home Two",
// "Coming Soon", several href="#" dropdown entries).
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/allProducts", label: "Shop" },
  { href: "/search?category=men", label: "Men" },
  { href: "/search?category=women", label: "Women" },
  { href: "/aboutUs", label: "About" },
  { href: "/FAQ", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];
