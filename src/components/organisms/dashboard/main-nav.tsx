'use client';
import Link from "next/link"

import {capitalize, cn} from "@/lib/utils"
import {clsx} from "clsx";
import React from "react";
import {useParams, useSearchParams} from "next/navigation";
import {useSelectedLayoutSegments} from "next/dist/client/components/navigation";


type NavProps = {
  sections: {
    name: string;
    path: string;
  }[];
  activeSection?: string;
} & React.HTMLAttributes<HTMLElement>;

export function MainNav({
                          sections,
                          className,
                          ...props
                        }: NavProps) {
  const segments = useSelectedLayoutSegments();
  const activeSection = segments[0] ?? 'Overview';

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {sections && sections.map((section) => (
        <Link
          key={section.path}
          href={section.path}
          className={clsx("text-sm font-medium transition-colors hover:text-primary", { "text-muted-foreground": section.name !== capitalize(activeSection) })}
        >
          {section.name}
        </Link>
      ))}
    </nav>
  )
}
