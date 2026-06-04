"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function AnalyticsPing() {
  const pathname = usePathname();

  useEffect(() => {
    void fetch("/api/analytics/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: pathname,
        referrer: document.referrer || null,
        deviceType: window.innerWidth < 768 ? "mobile" : "desktop"
      })
    }).catch(() => null);
  }, [pathname]);

  return null;
}

