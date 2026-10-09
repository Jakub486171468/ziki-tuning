import Image from 'next/image'
import type { Project } from '@/lib/data'

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article className="group flex flex-col overflow-hidden border border-border bg-card transition-colors hover:border-primary">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.image || '/placeholder.svg'}
          alt={`${project.car} – ${project.title}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
        <span className="absolute left-4 top-4 bg-background/80 px-2 py-1 font-display text-xs uppercase tracking-widest text-primary backdrop-blur">
          {project.car}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="font-display text-2xl uppercase leading-tight">
          <span className="text-muted-foreground">{project.car} – </span>
          {project.title}
        </h3>
        <p className="flex-1 text-pretty leading-relaxed text-muted-foreground">{project.story}</p>
        <dl className="grid grid-cols-2 gap-px border border-border bg-border">
          {project.specs.map((spec) => (
            <div key={spec.label} className="bg-background p-3">
              <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">{spec.label}</dt>
              <dd className="mt-1 font-display text-sm text-foreground">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  )
}
