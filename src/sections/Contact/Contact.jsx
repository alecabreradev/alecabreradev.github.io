import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../i18n/context.js";
import { PROFILE } from "../../data/profile.js";
import Section from "../../components/Section/Section.jsx";
import "./Contact.css";
import StableText from "../../components/StableText/StableText.jsx";

const COPIED_MS = 1800;

export default function Contact() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const emailRef = useRef(null);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = setTimeout(() => setCopied(false), COPIED_MS);
    return () => clearTimeout(timer);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
    } catch {
      // Clipboard not available: select the address so it can be copied by hand
      const range = document.createRange();
      range.selectNodeContents(emailRef.current);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
    }
  };

  return (
    <Section id="contact" title={t("contact.title")}>
      <p className="contact__text">{t("contact.text")}</p>
      <p className="contact__email" ref={emailRef}>
        {PROFILE.email}
      </p>
      <div className="contact__actions">
        <button type="button" className="button" onClick={copyEmail}>
          <StableText
            k={copied ? "contact.copied" : "contact.copy"}
            also={["contact.copy", "contact.copied"]}
          />
        </button>
        <a
          className="button button--outline"
          href={PROFILE.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          className="button button--outline"
          href={PROFILE.links.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </Section>
  );
}
