"use client";

// main section header

import HeaderBadge from "./HeaderBadge";
import HeaderTitle from "./HeaderTitle";

type Props = {
  badge: string;

  title: string;

  subtitle: string;
};

export default function SectionHeader({
  badge,
  title,
  subtitle,
}: Props) {

  return (
    <header className="mb-12 text-center">

      <HeaderBadge
        badge={badge}
      />

      <HeaderTitle
        title={title}
        subtitle={subtitle}
      />
    </header>
  );
}