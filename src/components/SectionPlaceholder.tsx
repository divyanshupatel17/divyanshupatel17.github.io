type SectionPlaceholderProps = {
  id: string
  label: string
  title: string
  todo: string[]
  tone?: 'dark' | 'light'
}

export default function SectionPlaceholder({ id, label, title, todo, tone = 'dark' }: SectionPlaceholderProps) {
  const isLight = tone === 'light'

  return (
    <section
      id={id}
      className={`flex min-h-screen w-full flex-col items-center justify-center border-t px-6 py-24 text-center ${
        isLight ? 'border-black/10 bg-neutral-100 text-ink' : 'border-white/10 bg-ink text-white'
      }`}
    >
      <span className={`mb-3 text-xs font-medium uppercase tracking-[0.3em] ${isLight ? 'text-black/50' : 'text-white/50'}`}>
        {label}
      </span>
      <h2 className="text-4xl font-black uppercase sm:text-6xl">
        {title}
      </h2>
      <div className={`mt-8 rounded-full border px-5 py-2 text-sm font-medium uppercase tracking-widest ${
        isLight ? 'border-accent/40 text-accent' : 'border-accent/60 text-accent'
      }`}>
        In progress
      </div>
      <ul className={`mt-8 max-w-md space-y-2 text-sm ${isLight ? 'text-black/60' : 'text-white/60'}`}>
        {todo.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}
