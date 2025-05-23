import { Agdasima } from "next/font/google";
import { Suspense } from "react";
import Metadata from "@/components/page_formats/Metadata";
import "./globals.css";
import PushNotificationManager from "../../utils/web-push/PushNotificationManager";
import Loading from "./loading";

const agdasima = Agdasima({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Metadata />
      <Suspense fallback={<Loading />}>
        <PushNotificationManager />
        <body className={`${agdasima.className}`}>{children}</body>
      </Suspense>
    </html>
  );
}
