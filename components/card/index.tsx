"use client";

import React, { useState } from "react";
import Image from "next/image";
import moment from "moment";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type IProps = {
  title: string;
  imgSrc: string;
  releaseDate?: string;
  id: number | string;
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
  const [imageSource, setImageSource] = useState<string>(
    `https://image.tmdb.org/t/p/original${imgSrc}`
  );
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div
      className={`flex flex-col cursor-pointer flex-shrink-0 w-[171px] justify-between overflow-hidden ${className}`}
      onClick={() => {
        if (!session) {
          return router.push("/api/auth/signin");
        }
        return router.push(`/${menu}/detail/${id}`);
      }}
    >
      <div className="w-[171px] h-[260px] overflow-hidden rounded-sm">
        <Image
          src={imageSource}
          alt={title}
          width={171}
          height={260}
          onError={() => {
            setImageSource("/image/default.png");
          }}
        />
      </div>
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
