import React from "react";

type IProps = {
  children?: React.ReactNode;
  title: string;
  inlineContent?: string;
};

export default function DetailSection({
  title,
  inlineContent,
  children
}: IProps) {
  return (
    <section className="mb-8">
      <p className="text-2xl font-semibold mb-3">
        {title} : {inlineContent && <span className="font-normal">{inlineContent}</span>}
      </p>
      {children}
    </section>
  );
}
