import NavBar from "@/components/navbar";

export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <NavBar className="max-w-3xl" />
      <div className="min-h-screen w-full px-4 py-16">
        <div className="mx-auto w-full max-w-3xl">{children}</div>
      </div>
      {/* Footer */}
      <footer className="flex justify-center bg-black p-5">
        <p className="text-white">
          Made with ❤ by Anjar Dwi Hariadi using NextJS.
        </p>
      </footer>
    </main>
  );
}
