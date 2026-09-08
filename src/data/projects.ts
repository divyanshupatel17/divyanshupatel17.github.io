import raw from './project.json'

export type ProjectLinks = {
  website?: string | null
  github?: string | null
  playStore?: string | null
  paper?: string | null
  presentation?: string | null
}

export type Project = {
  id: string
  name: string
  title: string
  category: string
  status: string
  shortDesc: string
  longDesc: string
  techStack: string[]
  links: ProjectLinks
  featured: boolean
  tags: string[]
}

export type ProjectCategory = {
  key: string
  label: string
  projects: Project[]
}

const CATEGORY_LABELS: Record<string, string> = {
  products: 'Products',
  research_engineering: 'Research & Engineering',
  research_concepts: 'Research & Concepts',
  previously_shipped: 'Previously Shipped',
}

const projectsByCategory = raw.portfolio.projects as Record<string, Project[]>

export const projectCategories: ProjectCategory[] = Object.entries(CATEGORY_LABELS)
  .filter(([key]) => (projectsByCategory[key]?.length ?? 0) > 0)
  .map(([key, label]) => ({ key, label, projects: projectsByCategory[key] }))
