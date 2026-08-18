import { FormEvent } from "react";

const field =
  "border-0 border-b border-ink/30 bg-transparent px-0 py-2 text-ink outline-none focus:border-ink";

type Props = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  error: string;
};

export function ContactForm({ onSubmit, error }: Props) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6" noValidate>
      <Field id="name" label="Name" type="text" />
      <Field id="email" label="Email" type="email" />
      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-sm text-ink">
          Message
        </label>
        <textarea id="message" name="message" rows={4} required className={field} />
      </div>
      {error ? (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        className="w-fit border border-ink px-5 py-2 text-[13px] text-ink active:scale-[0.98]"
      >
        Send Message
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  type,
}: {
  id: string;
  label: string;
  type: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm text-ink">
        {label}
      </label>
      <input id={id} name={id} type={type} required className={field} />
    </div>
  );
}
