export default function MoonFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-full w-full"
      style={{
        borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
        background:
          'radial-gradient(circle at 50% 130%, #6f6f73 0%, #444448 38%, #232326 62%, #101012 82%, #0a0a0a 94%)',
      }}
    />
  )
}
