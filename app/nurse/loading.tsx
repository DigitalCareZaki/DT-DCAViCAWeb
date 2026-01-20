export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-background">
      <div
        className="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        role="status"
      ></div>
    </div>
  );
}