import Image from "next/image";
import { ReactNode } from "react";

interface ICard {
  imageUrl?: string;
  title?: string;
  text?: string;
  alt?: string;
  callToAction: ReactNode;
}

export const Card = ({ imageUrl, title, text, alt, callToAction }: ICard) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        {imageUrl && alt && (
          <Image
            className="rounded-t-lg"
            src={imageUrl}
            width={500}
            height={500}
            alt={alt}
          />
        )}
      </a>
      <div className="p-2">
        {title && (
          <h5 className="  mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        )}
        {text && (
          <p className="  mb-3 font-normal text-gray-700 dark:text-gray-400">
            {text}
          </p>
        )}
        <div className="w-full flex justify-end">{callToAction}</div>
      </div>
    </div>
  );
};
