"use client";

import { signIn, signOut } from "next-auth/react";

export function AuthCallout({
  signedIn,
  configured
}: {
  signedIn: boolean;
  configured: boolean;
}) {
  if (!configured) {
    return (
      <section className="admin-card">
        <h2>GitHub auth not configured yet</h2>
        <p className="muted">
          Add `GITHUB_ID`, `GITHUB_SECRET`, `NEXTAUTH_SECRET`, and `ADMIN_GITHUB_LOGINS` in the environment to turn on owner-only admin.
        </p>
      </section>
    );
  }

  return (
    <section className="admin-card">
      <h2>{signedIn ? "Admin session active" : "Sign in required"}</h2>
      <p className="muted">
        {signedIn
          ? "You are signed in with an allowlisted GitHub account."
          : "Use GitHub sign-in to unlock project CRUD and contact submission review."}
      </p>
      <button type="button" className="button-primary" onClick={() => (signedIn ? signOut() : signIn("github"))}>
        {signedIn ? "Sign out" : "Sign in with GitHub"}
      </button>
    </section>
  );
}

