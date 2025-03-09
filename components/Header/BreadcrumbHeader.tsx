import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Fragment, PropsWithChildren } from "react";

interface Props {
  withSidebarToggle?: boolean;
  breadcrumbs: { name: string, link?: string }[]
}

export default function BreadcrumbHeader({ children, breadcrumbs, withSidebarToggle }: Props & PropsWithChildren) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        {withSidebarToggle && (
          <>
            <Separator orientation="vertical" className="mr-2 h-4" />
          </>
        )}
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => (
              <Fragment key={breadcrumb.name}>
                <BreadcrumbItem className="hidden md:block">
                  {breadcrumb.link ? (
                    <BreadcrumbLink href={breadcrumb.link}>
                      {breadcrumb.name}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage> {breadcrumb.name}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index !== breadcrumbs.length - 1 && <BreadcrumbSeparator className="hidden md:block" />}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
    </header>
  );
}