import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
};

export const Badge = ({ children }: BadgeProps) => {
  return <span>{children}</span>;
};
