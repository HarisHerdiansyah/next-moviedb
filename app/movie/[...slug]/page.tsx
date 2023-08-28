import React from "react";

type IProps = {
  params: {
    slug: string[];
  };
};

export default function Page({ params: { slug } }: IProps) {
  console.log(slug)
  return <div>Page</div>;
}
