import { Inter } from "next/font/google";
import "./globals.css";
import Metadata from "@/components/page_formats/Metadata";
import { UserInfoProvider } from "@/contexts/UserInfoContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { Suspense } from "react";
import Loading from "./loading";
import PushNotificationManager from "@/utils/web-push/PushNotificationManager";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Metadata />
      <Suspense fallback={<Loading />}>
        <body className="">
          <NotificationProvider>
            <UserInfoProvider>
                <PushNotificationManager />
                {children}
            </UserInfoProvider>
          </NotificationProvider>
        </body>
      </Suspense>
    </html>
  );
}
