import { Fragment } from 'react'
import type { CSSProperties } from 'react'

type SplitWordsProps = {
  text: string
  /** Index of the first word, so a heading split across lines keeps one sequence. */
  offset?: number
  /** Seconds added per word. */
  stagger?: number
  className?: string
}

/*
  Wraps each word in a clipped box so it can slide up from below on load. The
  full sentence stays available to assistive tech through the parent's
  aria-label, so these spans are decorative.
*/
export default function SplitWords({
  text,
  offset = 0,
  stagger = 0.06,
  className,
}: SplitWordsProps) {
  const words = text.split(' ')

  return (
    <>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span
            className={['word', className].filter(Boolean).join(' ')}
            style={{ '--word-delay': `${(offset + i) * stagger}s` } as CSSProperties}
          >
            <span>{word}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  )
}
