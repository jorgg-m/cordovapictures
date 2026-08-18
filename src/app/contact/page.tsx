"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { ContactDetails } from "@/components/ContactDetails";
import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (!String(data.get("email") || "").includes("@")) {
      setError("Enter a valid email.");
      return;
    }
    setError("");
    setSent(true);
  }
  return (
    <section className="min-h-[100dvh] bg-paper px-4 pb-20 pt-24 md:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-center text-2xl font-normal text-ink">About me</h1>
        <div className="relative mt-6 aspect-[16/9] overflow-hidden">
          <Image
            src="/images/about.jpg"
            alt="Eduardo Cordova in the studio"
            fill
            priority
            className="object-cover"
            sizes="896px"
          />
        </div>
        <p className="mx-auto mt-10 max-w-[65ch] text-center text-base leading-relaxed text-ink/80">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
        <div className="mt-12 grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-16">
          <div className="text-center">
            <h2 className="text-2xl font-normal text-ink">Contact</h2>
            <div className="mt-8">
              <ContactDetails />
            </div>
          </div>
          {sent ? (
            <p className="text-sm text-ink" role="status">
              Message ready. Email soy@eduardocordova.com to send it.
            </p>
          ) : (
            <ContactForm onSubmit={onSubmit} error={error} />
          )}
        </div>
      </div>
    </section>
  );
}
