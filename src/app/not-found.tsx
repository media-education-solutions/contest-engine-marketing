import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlayMark } from "@/components/ui/play-mark";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-32 text-center">
      <p className="flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-brand">
        <PlayMark /> 404
      </p>
      <h1 className="text-4xl text-balance sm:text-5xl">
        This reel doesn&apos;t exist
      </h1>
      <p className="max-w-md text-lg text-muted-foreground">
        The page you&apos;re looking for was cut in editing. Let&apos;s get you
        back to the contest.
      </p>
      <Button asChild size="lg">
        <Link href="/">Back to home</Link>
      </Button>
    </main>
  );
}
