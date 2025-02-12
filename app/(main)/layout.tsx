import MainNav from "@/components/main-nav";
import Footer from "@/components/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainNav />
      <main className="min-h-screen flex-1 p-4 sm:p-6">{children}</main>
      <Footer />
    </>
  );
}
