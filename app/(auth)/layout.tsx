import AuthNav from "@/components/auth-nav";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthNav />
      <main className="min-h-screen flex-1 p-4 sm:p-6">{children}</main>
    </>
  );
}
