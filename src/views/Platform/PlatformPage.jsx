"use client";

import { useUserInfoContext } from "@/contexts/UserInfoContext";


export default function PlatformPage() {
  const { user } = useUserInfoContext();

  return (
    <>
     Landing Page
    </>
  );
}
