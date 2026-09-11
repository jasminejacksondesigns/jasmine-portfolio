export default function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/50 bg-white/55 p-5 shadow-[0_8px_32px_rgba(20,25,15,0.12)] backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}
