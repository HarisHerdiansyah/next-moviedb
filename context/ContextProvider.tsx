"use client";

import React, { createContext, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { getUserFavourite } from "@/http/favourite";

const Context = createContext(null);

type IProps = {
  children: React.ReactNode;
};

export default function ContextProvider({ children }: IProps) {
  const { data: session } = useSession();

  const initUserFavouriteList = useCallback(async () => {
    if (session?.user?.email) {
      const list = await getUserFavourite(session?.user?.email);
      if (list) {
        const favList = Object.values(list);
        window.sessionStorage.setItem("favourite", JSON.stringify(favList));
      }
      return;
    }
  }, [session?.user?.email]);

  useEffect(() => {
    initUserFavouriteList();
  }, [initUserFavouriteList]);

  return <Context.Provider value={null}>{children}</Context.Provider>;
}
