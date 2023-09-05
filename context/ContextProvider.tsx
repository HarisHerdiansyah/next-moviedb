"use client";

import React, { createContext, useEffect, useCallback, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useSession } from "next-auth/react";
import { ref, onValue } from "firebase/database";
import { database } from "@/utils/firebase";
import "react-toastify/dist/ReactToastify.min.css";

type IProps = {
  children: React.ReactNode;
};

type IState = {
  favList: any[];
};

export const Context = createContext<IState>({ favList: [] });

export default function ContextProvider({ children }: IProps) {
  const { data: session } = useSession();
  const [state, setState] = useState<IState>({
    favList: []
  });

  const value: IState = {
    favList: state.favList
  };

  const initUserFavouriteList = useCallback(async () => {
    if (session?.user?.email) {
      const userRef = session?.user?.email.replace(/@gmail.com/g, "");
      onValue(ref(database, `/favourite/${userRef}`), (snapshot) => {
        const data = snapshot.val();
        const favList = Object.values(data);
        setState((prevState) => ({
          ...prevState,
          favList: favList
        }));
      });
      return;
    }
  }, [session?.user?.email]);

  useEffect(() => {
    initUserFavouriteList();
  }, [initUserFavouriteList]);

  return (
    <Context.Provider value={value}>
      {children}
      <ToastContainer />
    </Context.Provider>
  );
}
