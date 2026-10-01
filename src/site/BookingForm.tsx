import { Icon } from "./Icon";
import { useState, type FormEvent } from "react";
import { copy, type Language } from "./content";
import { buildWhatsAppUrl, localDate } from "./booking";
import { ServiceSelect } from "./ServiceSelect";

export function BookingForm({
  language,
  service,
  onServiceChange,
}: {
  language: Language;
  service: string;
  onServiceChange: (value: string) => void;
}) {
  const t = copy[language];
  const [minimumDate] = useState(localDate);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    for (const key of ["name", "phone"]) {
      const input = form.elements.namedItem(key) as HTMLInputElement;
      input.value = input.value.trim();
    }
    if (!form.reportValidity()) return;
    // Same-tab navigation avoids popup blockers on phones and desktop.
    window.location.assign(buildWhatsAppUrl(new FormData(form), language));
  }

  return (
    <form className="booking-form" onSubmit={submit}>
      <p className="form-required">{t.required}</p>
      <div className="form-row">
        <label>
          {t.name} <span aria-hidden="true">*</span>
          <input
            name="name"
            autoComplete="name"
            placeholder={t.namePlaceholder}
            required
            maxLength={100}
            pattern=".*\S.*"
          />
        </label>
        <label>
          {t.phone} <span aria-hidden="true">*</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+357 …"
            required
            maxLength={30}
            pattern={String.raw`\+?[0-9][0-9\s\(\)\.\-]{5,29}`}
          />
        </label>
      </div>
      <ServiceSelect
        language={language}
        value={service}
        onChange={onServiceChange}
      />
      <div className="form-row">
        <label>
          {t.date} <small>({t.optional})</small>
          <input name="date" type="date" min={minimumDate} />
        </label>
        <label>
          {t.time} <small>({t.optional})</small>
          <input name="time" placeholder={t.timePlaceholder} maxLength={100} />
        </label>
      </div>
      <label>
        {t.message} <small>({t.optional})</small>
        <textarea
          name="message"
          rows={3}
          placeholder={t.messagePlaceholder}
          maxLength={1200}
        />
      </label>
      <button className="button button-primary" type="submit">
        {t.submit}
        <span aria-hidden="true">
          <Icon name="arrow-up-right" />
        </span>
      </button>
      <p className="form-note">{t.formNote}</p>
      <p className="privacy-note">{t.privacy}</p>
    </form>
  );
}
