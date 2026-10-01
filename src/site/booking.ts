import { contact, copy, treatments, type Language } from "./content";

export function buildWhatsAppUrl(data: FormData, language: Language): string {
  const t = copy[language];
  const value = (key: string) => String(data.get(key) ?? "").trim();
  const id = value("service");
  const service =
    treatments.find((item) => item.id === id)?.[language].name ??
    t.consultation;
  const lines = [
    t.bookingGreeting,
    `${t.name}: ${value("name")}`,
    `${t.phone}: ${value("phone")}`,
    `${t.service}: ${service}`,
    ...(["date", "time", "message"] as const)
      .filter((key) => value(key))
      .map((key) => `${t[key]}: ${value(key)}`),
  ];
  return `${contact.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function localDate(): string {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
}
