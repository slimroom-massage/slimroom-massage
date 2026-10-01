import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (!("IntersectionObserver" in window)) return;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".portrait-frame, .about-copy, .section-heading, .treatment-card, .space-copy, .space > img, .booking-copy, .booking-form",
      ),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          target.classList.remove("reveal-pending");
          observer.unobserve(target);
        });
      },
      { threshold: 0.08 },
    );

    const revealAll = () => {
      if (!motionPreference.matches) return;
      observer.disconnect();
      elements.forEach((element) => element.classList.remove("reveal-pending"));
    };

    if (!motionPreference.matches) {
      elements.forEach((element) => {
        element.classList.add("scroll-reveal", "reveal-pending");
        observer.observe(element);
      });
    }
    motionPreference.addEventListener("change", revealAll);
    return () => {
      observer.disconnect();
      motionPreference.removeEventListener("change", revealAll);
      elements.forEach((element) =>
        element.classList.remove("scroll-reveal", "reveal-pending"),
      );
    };
  }, []);
}
