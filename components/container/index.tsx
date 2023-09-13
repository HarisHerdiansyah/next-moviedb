import React from "react";

type IProps = {
  children: React.ReactNode;
};

export default function Container({ children }: IProps) {
  return <div className="p-2 sm:px-8 sm:py-4 lg:px-16 lg:py-8 xl:px-32 xl:py-8">{children}</div>;
}
