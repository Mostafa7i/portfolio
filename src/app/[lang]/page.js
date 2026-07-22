import { notFound } from 'next/navigation'
import { hasLocale } from '@/lib/dictionaries'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import StatsSection from '@/components/sections/StatsSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import BlogSection from '@/components/sections/BlogSection'
import ContactSection from '@/components/sections/ContactSection'

export default async function HomePage({ params }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  return (
    <>
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <TestimonialsSection />
      <BlogSection />
      <ContactSection />
    </>
  )
}
