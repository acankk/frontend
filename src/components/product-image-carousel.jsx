import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ProductImageCarousel({ images = [] }) {
  return (
    <Carousel className="w-full max-w-4xl mx-auto">
      <CarouselContent className="-ml-4">
        {images.map((img, index) => (
          <CarouselItem
            key={index}
            className="pl-4 basis-[70%] md:basis-[60%] lg:basis-[55%]"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-neutral-900 shadow-2xl">
              <img
                src={img}
                alt={`product-${index}`}
                className="w-full h-full object-cover"
              />

              {/* glow + overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="-left-10 bg-black/60 border-white/20 text-white hover:bg-black" />
      <CarouselNext className="-right-10 bg-black/60 border-white/20 text-white hover:bg-black" />
    </Carousel>
  );
}
