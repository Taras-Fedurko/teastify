export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-8">
        {children}
      </div>
    </div>
  );
} 