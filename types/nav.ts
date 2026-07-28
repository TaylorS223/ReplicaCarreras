export type NavItem = {
  label: string;
  href: string;
  isActive?: boolean;
  subItems?: Array<{
    label: string;
    href: string;
  }>;
};
