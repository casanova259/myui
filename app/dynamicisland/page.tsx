import DynamicIslandWrapper from "@/components/dynamic-island/DynamicIslandWrapper";

export const metadata = {
  title: "Dynamic Island — Makmadui",
  description:
    "An animated recreation of the iPhone Dynamic Island, built with Framer Motion / Motion and Tailwind CSS.",
};

export default function DynamicIslandPage() {
  return (
    <main className="max-w-[700px] mx-auto p-4 md:my-6">
      <div className="md:mt-12">
        <div className="mb-6">
          <h2 className="text-md font-medium">Dynamic Island</h2>
          <p className="text-muted-foreground">
            A web clone of the iPhone&apos;s Dynamic Island. Toggle between the
            default, call, and calendar-event states below to see the
            spring-based layout animation in action.
          </p>
        </div>
        <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-md">
          <DynamicIslandWrapper />
        </div>
      </div>
    </main>
  );
}
