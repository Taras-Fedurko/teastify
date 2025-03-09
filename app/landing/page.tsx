import BreadcrumbHeader from '@/components/Header/BreadcrumbHeader';

export default async function DashboardPage() {
  return (
    <>
      <BreadcrumbHeader
        withSidebarToggle
        breadcrumbs={[{ name: "Testify" }]}
      />
    </>
  );
}
