import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { copy, treatments, type Language } from "./content";

export function ServiceSelect({
  language,
  value,
  onChange,
}: {
  language: Language;
  value: string;
  onChange: (value: string) => void;
}) {
  const t = copy[language];
  const id = useId();
  const options = [
    ...treatments.map((item) => ({
      value: item.id,
      label: `${item[language].name} · ${item.durationMinutes} ${t.minuteUnit}`,
    })),
    { value: "consultation", label: t.consultation },
  ];
  const selected = options.findIndex((option) => option.value === value);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [invalid, setInvalid] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const search = useRef({ text: "", time: 0 });

  useEffect(() => {
    if (!open) return;
    function closeOutside(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  useEffect(() => {
    if (open) {
      document.getElementById(`${id}-option-${active}`)?.scrollIntoView({
        block: "nearest",
        behavior: "instant",
      });
    }
  }, [active, open, id]);

  function choose(index: number) {
    onChange(options[index].value);
    setInvalid(false);
    setOpen(false);
    trigger.current?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const { key } = event;
    if (key === "Tab" || key === "Escape") {
      if (key === "Escape" && open) event.preventDefault();
      setOpen(false);
      return;
    }
    if (["ArrowDown", "ArrowUp", "Home", "End", "Enter", " "].includes(key)) {
      event.preventDefault();
      if (key === "Enter" || key === " ") {
        if (open) choose(active);
        else {
          setActive(Math.max(selected, 0));
          setOpen(true);
        }
        return;
      }
      setOpen(true);
      if (key === "Home") setActive(0);
      else if (key === "End") setActive(options.length - 1);
      else if (!open)
        setActive(
          selected >= 0 ? selected : key === "ArrowUp" ? options.length - 1 : 0,
        );
      else
        setActive((index) =>
          Math.max(
            0,
            Math.min(
              options.length - 1,
              index + (key === "ArrowDown" ? 1 : -1),
            ),
          ),
        );
      return;
    }
    if (key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      const now = Date.now();
      const text =
        (now - search.current.time < 700 ? search.current.text : "") +
        key.toLocaleLowerCase(language);
      search.current = { text, time: now };
      const match = options.findIndex((option) =>
        option.label.toLocaleLowerCase(language).startsWith(text),
      );
      if (match >= 0) {
        setActive(match);
        setOpen(true);
      }
    }
  }

  return (
    <div
      className="service-select"
      ref={root}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <label id={`${id}-label`} htmlFor={`${id}-trigger`}>
        {t.service} <span aria-hidden="true">*</span>
      </label>
      <select
        className="service-select-native"
        name="service"
        value={value}
        required
        tabIndex={-1}
        aria-hidden="true"
        onChange={(event) => onChange(event.target.value)}
        onInvalid={(event) => {
          event.preventDefault();
          setInvalid(true);
          trigger.current?.focus();
        }}
      >
        <option value="" disabled>
          {t.select}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button
        ref={trigger}
        id={`${id}-trigger`}
        type="button"
        role="combobox"
        className="service-select-trigger"
        data-placeholder={selected < 0 || undefined}
        aria-labelledby={`${id}-label`}
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        aria-haspopup="listbox"
        aria-required="true"
        aria-invalid={(invalid && !value) || undefined}
        aria-describedby={invalid && !value ? `${id}-error` : undefined}
        aria-activedescendant={open ? `${id}-option-${active}` : undefined}
        onKeyDown={onKeyDown}
        onClick={() => {
          setActive(Math.max(selected, 0));
          setOpen(!open);
        }}
      >
        <span>{options[selected]?.label ?? t.select}</span>
        <svg
          className="service-select-chevron"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="m6 9 6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <ul
          className="service-select-menu"
          id={`${id}-listbox`}
          role="listbox"
          aria-labelledby={`${id}-label`}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={value === option.value}
              data-active={active === index || undefined}
              onPointerMove={() => setActive(index)}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => choose(index)}
            >
              <span>{option.label}</span>
              <span className="service-select-check" aria-hidden="true">
                ✓
              </span>
            </li>
          ))}
        </ul>
      )}
      {invalid && !value && (
        <p className="service-select-error" id={`${id}-error`} role="alert">
          {t.select}
        </p>
      )}
    </div>
  );
}
