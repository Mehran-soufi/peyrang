import React from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type BreadcrumbItemData = {
  label: string;
  href?: string;
};

type PageBreadcrumbProps = {
  items: BreadcrumbItemData[];
};

export function PageBreadcrumb({ items }: PageBreadcrumbProps) {
  return (
    <Breadcrumb className="mb-8">
      <BreadcrumbList className="flex-wrap gap-2 md:text-sm text-xs">
        <BreadcrumbItem>
          <Link href="/" className="transition-colors hover:text-orange-500">
            خانه
          </Link>
        </BreadcrumbItem>

        {items.map((item, index) => (
          <React.Fragment key={`${item.label}-${index}`}>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              {index === items.length - 1 || !item.href ? (
                <BreadcrumbPage className="font-semibold text-foreground">
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-orange-500"
                >
                  {item.label}
                </Link>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
