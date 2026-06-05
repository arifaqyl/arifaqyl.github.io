import { LegacyPageFrame } from "@/components/legacy-page-frame";

export const metadata = {
  title: "Now",
  description: "What Arif Aqyl is focused on right now."
};

export default function NowPage() {
  return <LegacyPageFrame src="/legacy/now.html" title="Arif Aqyl now page" />;
}
