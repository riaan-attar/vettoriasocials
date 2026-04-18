export default function NoiseOverlay({ opacity = 0.03 }: { opacity?: number }) {
  // Using a tiny inline base64 noise texture instead of an external URL
  // This is a 64x64px grain pattern — virtually zero network cost
  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none z-50"
      style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
        backgroundSize: '128px',
        opacity: opacity,
      }}
    />
  );
}
