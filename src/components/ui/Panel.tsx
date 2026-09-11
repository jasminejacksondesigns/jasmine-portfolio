export default function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-3xl bg-panel p-6 sm:p-10 ${className}`}
    >
      {children}
    </section>
  );
}
