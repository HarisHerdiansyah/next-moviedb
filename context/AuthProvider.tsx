"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

type IProps = {
  children: React.ReactNode
}

export default function AuthProvider({children}: IProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
