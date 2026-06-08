"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPolaris() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data?.error ?? "Send failed");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Send failed");
    }
  }

  return (
    <>
      <div className="moons-cta">
        <div className="moons-cta-eyebrow">
          <span className="moons-cta-rule" />
          <span>Let&apos;s Talk</span>
        </div>
        <h3 className="moons-cta-title">
          Want to build something <em>together?</em>
        </h3>
        <p className="moons-cta-desc">
          Drop a line — projects, collaborations, or just a hello.
        </p>
        <div className="moons-cta-actions">
          <button
            type="button"
            className="moons-cta-primary"
            onClick={() => setOpen(true)}
          >
            <span>Send a message</span>
            <span className="moons-cta-arrow" aria-hidden="true">→</span>
          </button>
          <a
            className="moons-cta-link"
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="moons-cta-link"
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>

      {open && (
        <div
          className="contact-overlay"
          role="dialog"
          aria-modal="true"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="contact-dialog" ref={dialogRef}>
            <div className="contact-dialog-head">
              <h3 className="contact-dialog-title">Send a message</h3>
              <button
                type="button"
                className="contact-close"
                aria-label="Close"
                onClick={() => setOpen(false)}
              >×</button>
            </div>
            {status === "sent" ? (
              <div className="contact-success">
                <p className="contact-success-line">Signal received.</p>
                <p className="contact-success-sub">I&apos;ll be in touch within a day or two.</p>
                <button
                  type="button"
                  className="contact-link-btn"
                  onClick={() => { setOpen(false); setStatus("idle"); }}
                >Close</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <label className="contact-field">
                  <span>Name</span>
                  <input name="name" required maxLength={200} autoComplete="name" />
                </label>
                <label className="contact-field">
                  <span>Email</span>
                  <input name="email" type="email" required autoComplete="email" />
                </label>
                <label className="contact-field">
                  <span>Message</span>
                  <textarea name="message" required maxLength={5000} rows={5} />
                </label>
                {status === "error" && (
                  <p className="contact-error">{errorMsg || "Something went wrong."}</p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="contact-submit"
                >
                  {status === "sending" ? "Sending…" : "Send →"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
