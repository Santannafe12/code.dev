"use client";

import Autoplay from "embla-carousel-autoplay";

import { TypographyH1 } from "../templates/typography";
import {
  Carousel as CarouselUI,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../_ui-shadcn/carousel";
import CardVertical from "../_ui/card-vertical";
import { CarouselGraphQL } from "@/src/types/components/carousel";

type TrendingPostsProps = {
  posts: CarouselGraphQL[];
  typography: string;
};

export default function Carousel({ posts, typography }: TrendingPostsProps) {
  return (
    <section>
      <TypographyH1>{typography}</TypographyH1>
      <CarouselUI
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 7000,
          }),
        ]}
        className="w-full mt-4"
      >
        <CarouselContent>
          {posts.map((post, index) => (
            <CarouselItem key={index} className="lg:basis-1/2 2xl:basis-1/4">
              <CardVertical post={post} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </CarouselUI>
    </section>
  );
}
