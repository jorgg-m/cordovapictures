export function ContactDetails() {
  return (
    <address className="flex flex-col items-center gap-6 text-center not-italic">
      <Item label="Phone" href="tel:+526643999921" value="664-399-9921" />
      <Item
        label="Email"
        href="mailto:soy@eduardocordova.com"
        value="soy@eduardocordova.com"
      />
      <Item
        label="Syndication"
        href="mailto:info@magazine.com"
        value="info@magazine.com"
      />
    </address>
  );
}

function Item({
  label,
  href,
  value,
}: {
  label: string;
  href: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-semibold text-ink">{label}</p>
      <a href={href} className="text-ink underline-offset-2 hover:underline">
        {value}
      </a>
    </div>
  );
}
