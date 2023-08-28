"use client";

import React from "react";
import Image from "next/image";
import moment from "moment";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";

type IProps = {
  title: string;
  lang?: string;
  imgSrc: string;
  releaseDate?: string;
  id?: number | string;
  className?: string;
  rating?: number;
  isList: boolean;
  menu?: string;
};

export default function Card({
  title,
  imgSrc,
  releaseDate,
  id,
  className,
  rating,
  isList,
  menu
}: IProps) {
  const imageSource = imgSrc
    ? `https://image.tmdb.org/t/p/original${imgSrc}`
    : "/image/default.png";
  const router = useRouter();

  return (
    <div
      className={`flex flex-col cursor-pointer flex-shrink-0 w-[171px] justify-between overflow-hidden ${className}`}
      onClick={() => router.push(`/${menu}/detail/${id}`)}
    >
      <Image
        src={imageSource}
        alt={title}
        width={171}
        height={304}
        className="rounded-md"
      />
      <div className="mt-3">
        {isList && (
          <div className="mb-1 flex items-center gap-1">
            <FaStar className="text-yellow-400" />
            <p className="font-semibold m-0">{rating?.toFixed(1)}</p>
          </div>
        )}
        <p className="text-slate-500 text-left">
          {releaseDate && moment(releaseDate).format("MMMM YYYY")}
        </p>
        {isList && (
          <p className="text-base font-semibold line-clamp-2">{title}</p>
        )}
      </div>
    </div>
  );
}
