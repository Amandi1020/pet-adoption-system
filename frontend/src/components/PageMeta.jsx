import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const pages = [
  {
    pattern: /^\/$/,
    title: 'PawFind | Pet Adoption & Care',
    description: 'Browse adoptable pets, learn about pet care, and apply to give a rescued animal a loving home.',
  },
  {
    pattern: /^\/pets$/,
    title: 'Browse Adoptable Pets | PawFind',
    description: 'Search and filter dogs, cats, birds, and rabbits available for adoption through PawFind.',
  },
  {
    pattern: /^\/pets\/[^/]+$/,
    title: 'Pet Details | PawFind',
    description: 'Meet an adoptable pet, review their profile, and start an adoption application.',
  },
  {
    pattern: /^\/adopt(?:\/[^/]+)?$/,
    title: 'Adoption Application | PawFind',
    description: 'Submit an adoption application and track your progress through the PawFind review process.',
  },
  {
    pattern: /^\/my-applications$/,
    title: 'My Applications | PawFind',
    description: 'Track the status of your adoption applications and review your submitted details.',
  },
  {
    pattern: /^\/login$/,
    title: 'Login | PawFind',
    description: 'Log in to manage your PawFind adoption applications and account.',
  },
  {
    pattern: /^\/register$/,
    title: 'Create an Account | PawFind',
    description: 'Create a PawFind account to apply for pet adoptions and follow your applications.',
  },
  {
    pattern: /^\/stories$/,
    title: 'Success Stories | PawFind',
    description: 'Read real adoption stories from families who found their companion through PawFind.',
  },
  {
    pattern: /^\/quiz$/,
    title: 'Pet Match Quiz | PawFind',
    description: 'Answer a few lifestyle questions to discover which type of pet best fits your home.',
  },
  {
    pattern: /^\/care-guide$/,
    title: 'Pet Care Guide | PawFind',
    description: 'Practical care guidance for dogs, cats, birds, and rabbits.',
  },
  {
    pattern: /^\/about$/,
    title: 'About PawFind',
    description: 'Learn how PawFind connects shelters, adopters, and animal welfare partners.',
  },
  {
    pattern: /^\/contact$/,
    title: 'Contact PawFind',
    description: 'Contact the PawFind team with adoption questions, pet care enquiries, or feedback.',
  },
  {
    pattern: /^\/faq$/,
    title: 'Frequently Asked Questions | PawFind',
    description: 'Answers to common questions about adopting and caring for pets through PawFind.',
  },
  {
    pattern: /^\/admin$/,
    title: 'Admin Dashboard | PawFind',
    description: 'Review shelter activity, adoptions, and recent applications.',
  },
  {
    pattern: /^\/admin\/pets$/,
    title: 'Manage Pets | PawFind',
    description: 'Add, edit, and remove pet listings in the PawFind shelter system.',
  },
  {
    pattern: /^\/admin\/applications$/,
    title: 'Manage Applications | PawFind',
    description: 'Review and update adoption applications in the PawFind shelter system.',
  },
  {
    pattern: /^\/admin\/stories$/,
    title: 'Manage Success Stories | PawFind',
    description: 'Review and publish adoption success stories submitted by adopters.',
  },
  {
    pattern: /^\/admin\/messages$/,
    title: 'Contact Messages | PawFind',
    description: 'Read and manage enquiries submitted through the PawFind contact form.',
  },
]

const fallback = {
  title: 'Page Not Found | PawFind',
  description: 'The requested page could not be found. Browse PawFind to find adoptable pets and care resources.',
}

function PageMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const page = pages.find(item => item.pattern.test(pathname)) || fallback
    document.title = page.title

    let description = document.querySelector('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.setAttribute('name', 'description')
      document.head.appendChild(description)
    }
    description.setAttribute('content', page.description)
  }, [pathname])

  return null
}

export default PageMeta
