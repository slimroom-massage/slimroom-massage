import { Icon, type IconName } from "./Icon";
import { Fragment, useEffect, useState } from "react";
import { copy, contact, treatments, type Language } from "./content";
import { BookingForm } from "./BookingForm";
import studio from "../assets/optimized/IMG_0059.jpg";
import portrait from "../assets/optimized/IMG_8270.jpg";
import card from "../assets/optimized/IMG_9944_1.jpg";
import massageTools from "../assets/img-5058.png";
import journal from "../assets/optimized/IMG_0060.jpg";
import logo from "../assets/logo.png";

import { languageHref, languages, languageLabels } from "./seo";
import { useLanguage } from "./useLanguage";
import { useScrollReveal } from "./useScrollReveal";

const sections = ["about", "treatments", "booking"];
const treatmentIcons: Record<(typeof treatments)[number]["symbol"], IconName> =
  {
    "≈": "waves",
    "≋": "waves-three",
    "⌁": "wave",
    "✳": "asterisk",
    "◡": "smile",
    "○": "circle",
    "◇": "diamond",
    "✧": "sparkle",
    "↗": "arrow-up-right",
  };

export function App({ initialLanguage }: { initialLanguage?: Language } = {}) {
  const { language, changeLanguage } = useLanguage(initialLanguage);
  useScrollReveal();

  const [menuOpen, setMenuOpen] = useState(false);
  const [service, setService] = useState("");
  const t = copy[language];

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);

  function selectService(id: string) {
    setService(id);
    setMenuOpen(false);
  }

  return (
    <>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <header className="header" id="top">
        <div className="container header-inner">
          <a className="brand" href="#top" aria-label="Slimroom">
            <img
              className="brand-logo"
              src={logo}
              alt="Slimroom"
              width="1298"
              height="1012"
            />
          </a>
          <nav
            id="navigation"
            className={`navigation${menuOpen ? " is-open" : ""}`}
            aria-label={t.menu}
          >
            {sections.map((id, index) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                {t.nav[index]}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <div
              className="language-switch"
              role="group"
              aria-label={t.languageLabel}
            >
              {languages.map((next, index) => (
                <Fragment key={next}>
                  {index > 0 && <span aria-hidden="true">/</span>}
                  <a
                    role="button"
                    href={languageHref(next)}
                    hrefLang={next}
                    lang={next}
                    aria-label={languageLabels[next]}
                    aria-pressed={language === next}
                    onClick={(event) => changeLanguage(event, next)}
                  >
                    {next.toUpperCase()}
                  </a>
                </Fragment>
              ))}
            </div>
            <a className="header-book" href="#booking">
              {t.book}
              <span aria-hidden="true">
                <Icon name="arrow-up-right" />
              </span>
            </a>
            <button
              className="menu-button"
              aria-label={menuOpen ? t.close : t.menu}
              aria-expanded={menuOpen}
              aria-controls="navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="line" />
              {t.eyebrow}
            </p>
            <h1 id="hero-title">
              {t.hero[0]}
              <br />
              <em>{t.hero[1]}</em>
              <br />
              {t.hero[2]}
            </h1>
            <p className="hero-intro">{t.intro}</p>
            <p className="women-only-badge">
              <span aria-hidden="true">♀</span>
              {t.womenOnly}
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#booking">
                {t.bookSession}
                <span aria-hidden="true">
                  <Icon name="arrow-up-right" />
                </span>
              </a>
              <a className="text-link" href="#treatments">
                {t.explore}
                <span aria-hidden="true">
                  <Icon name="arrow-right" />
                </span>
              </a>
            </div>
            <div className="hero-stats">
              <div>
                <strong>
                  8<span>+</span>
                </strong>
                <small>{t.experience}</small>
              </div>
              <div>
                <strong>
                  500<span>+</span>
                </strong>
                <small>{t.clients}</small>
              </div>
            </div>
          </div>
          <figure className="hero-media">
            <div className="hero-visual">
              <div className="hero-image-frame">
                <img
                  src={studio}
                  alt={t.studioAlt}
                  width="3456"
                  height="5184"
                  fetchPriority="high"
                />
              </div>
              <div className="hero-inset">
                <img
                  src={massageTools}
                  alt={t.massageToolsAlt}
                  width="1024"
                  height="1024"
                />
              </div>
              <span className="vertical-note" aria-hidden="true">
                Slimroom — BODY & SOUL
              </span>
            </div>
            <figcaption className="image-caption">
              <span aria-hidden="true">
                <Icon name="asterisk" />
              </span>
              {t.photoNote}
            </figcaption>
          </figure>
          <a className="scroll-link" href="#about">
            <span aria-hidden="true">
              <Icon name="arrow-down" />
            </span>
            {t.scroll}
          </a>
        </section>

        <section
          className="about section container"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="portrait-frame">
            <img
              src={portrait}
              alt={t.portraitAlt}
              loading="lazy"
              width="3456"
              height="5184"
            />
            <span className="portrait-signature" aria-hidden="true">
              Alina Kärsten
            </span>
          </div>
          <div className="about-copy">
            <p className="eyebrow">{t.aboutLabel}</p>
            <h2 id="about-title">
              {t.aboutTitle}
              <br />
              <em>{t.aboutAccent}</em>
            </h2>
            <p className="role">{t.aboutRole}</p>
            <p>{t.aboutText}</p>
            <p>{t.aboutText2}</p>
            <div className="credentials">
              <h3>{t.credentialsTitle}</h3>
              <ul>
                {t.credentialsList.map((credential) => (
                  <li key={credential}>
                    <span aria-hidden="true">✓</span>
                    {credential}
                  </li>
                ))}
              </ul>
            </div>
            <blockquote>
              <span aria-hidden="true">“</span>
              {t.quote}
              <cite>— Alina Kärsten</cite>
            </blockquote>
          </div>
        </section>

        <section
          className="treatments section"
          id="treatments"
          aria-labelledby="treatments-title"
        >
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{t.servicesLabel}</p>
                <h2 id="treatments-title">
                  {t.servicesTitle}
                  <br />
                  <em>{t.servicesAccent}</em>
                </h2>
              </div>
              <p>{t.servicesIntro}</p>
            </div>
            <div className="treatment-grid">
              {treatments.map((item, index) => (
                <article className="treatment-card" key={item.id}>
                  <div className="card-top">
                    <span className="treatment-symbol" aria-hidden="true">
                      <Icon name={treatmentIcons[item.symbol]} />
                    </span>
                    <div className="card-details">
                      <span className="treatment-duration">
                        {item.durationMinutes} {t.minuteUnit}
                      </span>
                      <span className="card-number">0{index + 1}</span>
                    </div>
                  </div>
                  <h3>{item[language].name}</h3>
                  <p>{item[language].description}</p>
                  <a
                    className="text-link"
                    href="#booking"
                    onClick={() => selectService(item.id)}
                  >
                    {t.choose}
                    <span aria-hidden="true">
                      <Icon name="arrow-up-right" />
                    </span>
                  </a>
                </article>
              ))}
            </div>
            <p className="services-note">{t.servicesNote}</p>
          </div>
        </section>

        <section
          className="space section container"
          aria-labelledby="space-title"
        >
          <div className="space-copy">
            <p className="eyebrow">{t.spaceLabel}</p>
            <h2 id="space-title">
              {t.spaceTitle}
              <br />
              <em>{t.spaceAccent}</em>
            </h2>
            <p>{t.spaceText}</p>
            <span className="decorative-flower" aria-hidden="true">
              <Icon name="asterisk" />
            </span>
          </div>
          <img
            src={journal}
            alt={t.journalAlt}
            loading="lazy"
            width="3456"
            height="5184"
          />
          <img
            src={card}
            alt={t.cardAlt}
            loading="lazy"
            width="3456"
            height="5184"
          />
        </section>

        <section
          className="booking section container"
          id="booking"
          aria-labelledby="booking-title"
        >
          <div className="booking-copy">
            <p className="eyebrow">{t.bookingLabel}</p>
            <h2 id="booking-title">
              {t.bookingTitle}
              <br />
              <em>{t.bookingAccent}</em>
            </h2>
            <p>{t.bookingIntro}</p>
            <p className="women-only-badge">
              <span aria-hidden="true">♀</span>
              {t.womenOnly}
            </p>
            <div className="contact-links">
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-icon" aria-hidden="true">
                  <Icon name="arrow-up-right" />
                </span>
                <span>
                  <small>WhatsApp</small>
                  {contact.phone}
                </span>
              </a>
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-icon" aria-hidden="true">
                  ◎
                </span>
                <span>
                  <small>Instagram</small>
                  {contact.handle}
                </span>
              </a>
              <div>
                <span className="contact-icon" aria-hidden="true">
                  ⌖
                </span>
                <span>{t.location}</span>
              </div>
            </div>
          </div>
          <BookingForm
            language={language}
            service={service}
            onServiceChange={setService}
          />
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-brand">
              <a className="brand" href="#top" aria-label="Slimroom">
                <img
                  className="brand-logo"
                  src={logo}
                  alt="Slimroom"
                  width="1298"
                  height="1012"
                />
              </a>
              <p className="footer-tagline">{t.footerTagline}</p>
              <p className="footer-description">{t.footerDescription}</p>
            </div>
            <nav className="footer-column" aria-label={t.footerNavigation}>
              <h2 className="footer-heading">{t.footerNavigation}</h2>
              {sections.map((id, index) => (
                <a key={id} href={`#${id}`}>
                  {t.nav[index]}
                </a>
              ))}
              <a className="footer-book" href="#booking">
                {t.bookSession}
                <span aria-hidden="true">
                  <Icon name="arrow-up-right" />
                </span>
              </a>
            </nav>
            <div className="footer-column footer-contact">
              <h2 className="footer-heading">{t.footerContact}</h2>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="footer-contact-label">WhatsApp</span>
                {contact.phone}
                <span aria-hidden="true">
                  <Icon name="arrow-up-right" />
                </span>
              </a>
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="footer-contact-label">Instagram</span>
                {contact.handle}
                <span aria-hidden="true">
                  <Icon name="arrow-up-right" />
                </span>
              </a>
              <p className="footer-location">{t.location}</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              © {new Date().getFullYear()} Slimroom. {t.rights}
            </p>
            <a className="text-link" href="#top">
              {t.back}
              <span aria-hidden="true">
                <Icon name="arrow-up" />
              </span>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
