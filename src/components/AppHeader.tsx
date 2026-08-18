import Link from "next/link";

const link =
  "text-[12px] uppercase tracking-[0.2em] text-ink/80 hover:text-ink";

export function AppHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 bg-transparent">
      <div className="mx-auto grid h-full max-w-[1400px] grid-cols-3 items-center px-4 md:px-8">
        <Link href="/contact" className={link}>
          Contact
        </Link>
        <Link
          href="/"
          className="text-center font-sans text-[13px] font-medium uppercase tracking-[0.22em] text-ink"
        >
          Eduardo Cordova
        </Link>
        <a
          href="https://www.instagram.com/cordovapictures/"
          target="_blank"
          rel="noopener noreferrer"
          className={`${link} justify-self-end`}
        >
          Social
        </a>
      </div>
    </header>
  );
}
