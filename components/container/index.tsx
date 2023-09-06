import React from "react";

type IProps = {
  children: React.ReactNode;
};

export default function Container({ children }: IProps) {
  return <div className="px-32 py-8">{children}</div>;
}
