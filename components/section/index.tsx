import React from "react";

type IProps = {
  children: React.ReactNode;
  title: string;
};

export default function Section({ children, title }: IProps) {
  return (
    <div className="my-10">
      <p className="text-2xl font-medium">{title}</p>
      {children}
    </div>
  );
}
