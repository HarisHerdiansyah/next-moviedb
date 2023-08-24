"use client";

import React from "react";
import Image from "next/image";
import moment from "moment";

type IProps = {
  title: string;
  lang: string;
  imgSrc: string;
  releaseDate: string;
  id: number | string;
};

export default function Card({ title, lang, imgSrc, releaseDate, id }: IProps) {
  return (
    <div
      className="flex flex-col cursor-pointer flex-shrink-0 w-[171px] overflow-hidden"
      onClick={() => console.log(title, lang, id)}
    >
      <Image
        src={`https://image.tmdb.org/t/p/original${imgSrc}`}
        alt={title}
        width={171}
        height={304}
        className="rounded-md"
      />
      <div className="mt-3">
        <p className="text-slate-500 text-left">
          {moment(releaseDate).format("MMMM YYYY")}
        </p>
        <p className="text-base font-semibold line-clamp-2">{title}</p>
      </div>
    </div>
  );
}