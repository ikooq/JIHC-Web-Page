import { cn } from "@/lib/utils";

interface ShimmerProps {
  className?: string;
}

export const Shimmer = ({ className }: ShimmerProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-muted",
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:animate-[shimmer_2s_infinite]",
        "before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        className
      )}
    />
  );
};

export const SkeletonCard = ({ className }: ShimmerProps) => (
  <div className={cn("card-3d p-8 space-y-4", className)}>
    <Shimmer className="h-14 w-14 rounded-2xl" />
    <Shimmer className="h-6 w-3/4" />
    <Shimmer className="h-4 w-full" />
    <Shimmer className="h-4 w-5/6" />
    <div className="flex gap-2 pt-2">
      <Shimmer className="h-8 w-20 rounded-full" />
      <Shimmer className="h-8 w-24 rounded-full" />
    </div>
  </div>
);

export const SkeletonHero = () => (
  <div className="min-h-screen flex items-center justify-center bg-hero px-4">
    <div className="max-w-4xl mx-auto text-center space-y-8">
      <Shimmer className="h-8 w-64 mx-auto rounded-full" />
      <Shimmer className="h-16 md:h-24 w-full max-w-3xl mx-auto" />
      <Shimmer className="h-16 md:h-24 w-3/4 mx-auto" />
      <Shimmer className="h-6 w-2/3 mx-auto" />
      <div className="flex gap-4 justify-center pt-4">
        <Shimmer className="h-14 w-40 rounded-xl" />
        <Shimmer className="h-14 w-40 rounded-xl" />
      </div>
    </div>
  </div>
);

export const SkeletonSection = ({ cards = 4 }: { cards?: number }) => (
  <div className="py-20 md:py-32">
    <div className="container mx-auto px-4 md:px-6">
      <div className="text-center mb-16 space-y-4">
        <Shimmer className="h-6 w-32 mx-auto rounded-full" />
        <Shimmer className="h-12 w-96 max-w-full mx-auto" />
        <Shimmer className="h-5 w-80 max-w-full mx-auto" />
      </div>
      <div className={`grid md:grid-cols-2 ${cards > 2 ? 'lg:grid-cols-' + Math.min(cards, 4) : ''} gap-6`}>
        {Array.from({ length: cards }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  </div>
);
