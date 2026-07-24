import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <Link href="/" className="mb-6 flex items-center">
        <span className="font-heading font-bold text-2xl text-dark">Sane</span>
        <span className="font-heading font-bold text-2xl text-primary">Space</span>
      </Link>

      {/* Clerk sign-up */}
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        fallbackRedirectUrl="/onboarding"
      />

      {/* Tagline */}
      <p className="mt-6 text-sm text-gray-text text-center max-w-xs">
        Join thousands of Nigerians taking care of their mental health.
      </p>
    </div>
  )
}
