import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Projects } from '@/data/projects'
import { Metadata } from 'next'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'

interface ProjectPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateStaticParams() {
  return Projects.map((project) => ({
    id: project.id,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params
  const project = Projects.find((p) => p.id === id)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: project.title,
    description: project.subtitle,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params

  const project = Projects.find((project) => project.id === id)
  if (!project) notFound()

  return (
    <section className="mx-4 md:mx-auto flex max-w-[900px] flex-col items-center justify-center">
      <Link href="/projects" className="flex gap-2 self-start mb-4">
        <MoveLeft className="h-5 w-5" />
        <span>Back to projects</span>
      </Link>
      <div className="gap-1 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold lg:text-6xl">{project.title}</h1>
        <p className="max-w-xl text-neutral-500">{project.subtitle}</p>
      </div>
      <Image src={project.src} alt={project.alt} className="my-4 rounded-xl max-w-96 h-auto" height={1000} width={1000} />
      <div className="mb-16">
        {project.sections.map((section, index) => (
          <div key={index} className="flex flex-col items-start justify-center gap-2 my-4">
            <h1 className="text-2xl font-semibold">{section.header}</h1>
            <p className="text-sm md:text-lg text-neutral-700">{section.paragraph}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
