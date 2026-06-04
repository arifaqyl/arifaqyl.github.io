"use client";

import { useState } from "react";

const initialState = { name: "", email: "", subject: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await response.json();

    if (!response.ok) {
      setStatus("error");
      setMessage(data.error || "Something went wrong.");
      return;
    }

    setStatus("success");
    setMessage("Message stored successfully. I’ll be able to review it from admin.");
    setForm(initialState);
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="form-grid">
        <label>
          <span>Name</span>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </label>
        <label>
          <span>Email</span>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </label>
      </div>
      <label>
        <span>Subject</span>
        <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
      </label>
      <label>
        <span>Message</span>
        <textarea rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
      </label>
      <div className="form-actions">
        <button type="submit" className="button-primary" disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : "Send message"}
        </button>
        {message ? <p className={status === "error" ? "form-error" : "form-success"}>{message}</p> : null}
      </div>
    </form>
  );
}

