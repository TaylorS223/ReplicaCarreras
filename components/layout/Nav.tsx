import Link from "next/link";
import type { NavItem } from "@/types/nav";

type NavProps = {
  items: NavItem[];
};

export const Nav = ({ items }: NavProps) => {
  return (
    <nav aria-label="Navegación">
      {items.map((item) => (
        <Link key={item.href} href={item.href}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
