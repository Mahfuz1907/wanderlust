"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote: `"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."`,
    name: "Michael Chen",
    location: "Singapore",
    photo: "/assets/person1.png",
  },
  {
    quote: `"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"`,
    name: "Sarah Johnson",
    location: "New York, USA",
    photo: "/assets/person2.png",
  },
];

// Screenshot-matched circular controls; `static` overrides the component's
// default absolute positioning so they can live in the section header.
const arrowClassName =
  "static h-14 w-14 border-zinc-200 bg-white text-zinc-400 hover:bg-zinc-50 hover:text-zinc-600";

export default function Testimonials() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Carousel opts={{ align: "start", loop: true }}>
          <div className="flex items-center justify-between gap-6">
            <div>
              <h2 className="text-4xl font-medium text-zinc-900 sm:text-5xl">
                What Travelers Say
              </h2>
              <p className="mt-3 text-sm text-zinc-500 sm:text-base">
                Real experiences from our happy travelers
              </p>
            </div>

            <div className="hidden items-center gap-3 sm:flex">
              <CarouselPrevious
                size="default"
                className={arrowClassName}
              />
              <CarouselNext size="default" className={arrowClassName} />
            </div>
          </div>

          <CarouselContent className="-ml-6 mt-14">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.name}
                className="pl-6 lg:basis-1/2"
              >
                <div className="flex flex-col gap-5 sm:flex-row">
                  <div className="flex flex-1 flex-col">
                    <blockquote className="text-base leading-relaxed text-zinc-800">
                      {testimonial.quote}
                    </blockquote>
                    <footer className="mt-auto pt-10">
                      <p className="text-sm font-semibold text-brand">
                        — {testimonial.name}
                      </p>
                      <p className="mt-1 text-xs text-zinc-400">
                        {testimonial.location}
                      </p>
                    </footer>
                  </div>
                  <Image
                    src={testimonial.photo}
                    alt={testimonial.name}
                    width={218}
                    height={264}
                    className="h-auto w-48 shrink-0 self-start rounded-lg object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
