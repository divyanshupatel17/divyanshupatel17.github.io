/*
  Every user facing string lives here so the copy pass can happen in one file.
  All values are placeholders until the real portfolio content is written.
*/

export const brand = {
  name: 'Portfolio',
  tagline: 'Placeholder tagline goes here',
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
]

export const home = {
  headingLead: 'Placeholder headline line one.',
  headingSecond: 'Placeholder headline line two.',
  headingAccentLead: 'Placeholder',
  headingAccent: 'accent phrase here.',
  paragraph:
    'Placeholder introduction paragraph. Two or three lines describing the role, the focus areas, and the kind of work shown below.',
  primaryCta: { label: 'View Work', href: '#work' },
  secondaryCta: { label: 'Get in Touch', href: '#contact' },
  featured: {
    tag: 'Placeholder tag',
    title: 'Placeholder Project Title',
    stack: 'Placeholder, stack, items',
    stats: [
      { label: 'Placeholder', value: '000' },
      { label: 'Placeholder', value: '00%' },
      { label: 'Placeholder', value: '0.0x' },
      { label: 'Placeholder', value: '00 ms' },
    ],
  },
  signal: {
    title: 'Placeholder Signal',
    badge: '+00%',
    link: 'See details',
  },
  budget: {
    title: 'Placeholder Breakdown',
    items: ['Placeholder 40%', 'Placeholder 35%', 'Placeholder 25%'],
  },
  ranking: {
    columns: ['Rank', 'Placeholder', 'Placeholder score'],
    rows: [
      { rank: 1, label: 'Placeholder list item goes here', score: '00%' },
      { rank: 2, label: 'Placeholder list item goes here', score: '00%' },
      { rank: 3, label: 'Placeholder list item goes here', score: '00%' },
    ],
  },
}

export const about = {
  headingLead: 'Placeholder heading can be long.',
  headingSecondLead: 'And it',
  headingSecondAccent: 'wraps.',
  paragraph:
    'Placeholder about paragraph. Three lines of supporting copy that explain the approach, the tools involved, and what someone reading this page should take away from it.',
  stepsLabel: "Here's how it works:",
  steps: [
    { label: 'Explore', icon: 'bulb', body: 'Placeholder line one.\nPlaceholder line two.' },
    { label: 'Design', icon: 'palette', body: 'Placeholder line one.\nPlaceholder line two.' },
    { label: 'Build', icon: 'dropper', body: 'Placeholder line one.\nPlaceholder line two.' },
    { label: 'Ship', icon: 'rocket', body: 'Placeholder line one.\nPlaceholder line two.' },
  ],
}

export type FeatureMedia =
  | 'list'
  | 'platforms'
  | 'score'
  | 'timeline'

export const work = {
  items: [
    {
      number: '01',
      label: 'Explore',
      icon: 'bulb' as const,
      body: 'Placeholder project description. Two or three sentences covering the problem, the constraints, and the part of the work worth highlighting.',
      media: 'list' as FeatureMedia,
      accent: false,
      mediaFirst: false,
    },
    {
      number: '02',
      label: 'Design',
      icon: 'palette' as const,
      body: 'Placeholder project description. Two or three sentences covering the problem, the constraints, and the part of the work worth highlighting.',
      media: 'platforms' as FeatureMedia,
      accent: true,
      mediaFirst: true,
    },
    {
      number: '03',
      label: 'Build',
      icon: 'dropper' as const,
      body: 'Placeholder project description. Two or three sentences covering the problem, the constraints, and the part of the work worth highlighting.',
      media: 'score' as FeatureMedia,
      accent: false,
      mediaFirst: false,
    },
    {
      number: '04',
      label: 'Ship',
      icon: 'rocket' as const,
      body: 'Placeholder project description. Two or three sentences covering the problem, the constraints, and the part of the work worth highlighting.',
      media: 'timeline' as FeatureMedia,
      accent: true,
      mediaFirst: true,
    },
  ],
}

export const achievements = {
  heading: 'Placeholder achievements line.',
  rows: [
    {
      align: 'left' as const,
      before: 'Placeholder claim',
      chip: null,
      after: 'in one line',
      icon: 'clock' as const,
      trailingIcon: true,
    },
    {
      align: 'right' as const,
      before: 'Up to',
      chip: '00x',
      after: 'placeholder measurable result.',
      icon: null,
      trailingIcon: false,
    },
  ],
}

export const contact = {
  heading: 'Get in touch',
  paragraph: 'Placeholder line inviting the reader to start a conversation.',
  cta: { label: 'Say hello', hoverLabel: 'Drop a line', href: 'mailto:hello@example.com' },
  footerHeading: 'Placeholder footer\nheadline here',
  buttons: [
    { label: 'Email Me', href: 'mailto:hello@example.com', variant: 'is-light' as const },
    { label: 'Download Résumé', href: '#', variant: 'is-ghost' as const },
  ],
  socials: [
    { label: 'GitHub', href: '#' },
    { label: 'LinkedIn', href: '#' },
  ],
  legal: ['Copyright © 2026 Placeholder', 'Terms and Privacy'],
}
