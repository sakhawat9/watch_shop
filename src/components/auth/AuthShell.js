import Image from "next/image";
import Link from "next/link";
import Layout from "../../common/Layout";

/**
 * Split layout shared by sign in and register.
 *
 * Both pages previously rendered outside <Layout> entirely — no header, no
 * footer, no way back into the site except the browser's back button — and
 * forced a `min-h-screen` image column that pushed the form off-screen on
 * short viewports. The image is decorative here, so it's hidden below `lg`
 * rather than shrunk.
 */
export default function AuthShell({ title, subtitle, footer, children }) {
  return (
    <Layout title={title}>
      <div className="grid lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-14 sm:px-6 lg:px-12 lg:py-20">
          <div className="w-full max-w-md">
            <p className="mb-3 eyebrow">Watch_Shop</p>
            <h1 className="mb-2">{title}</h1>
            {subtitle && <p className="mb-8 text-primary-500">{subtitle}</p>}

            {children}

            {footer && (
              <div className="pt-6 mt-8 text-sm border-t border-secondary-300 text-primary-500">
                {footer}
              </div>
            )}

            <p className="mt-6 text-sm">
              <Link href="/" className="link-quiet">
                &larr; Back to the store
              </Link>
            </p>
          </div>
        </div>

        <div className="relative hidden lg:block bg-primary-900">
          <Image
            src="https://res.cloudinary.com/medsy/image/upload/v1650317997/login_bbixkt.jpg"
            alt=""
            fill
            sizes="50vw"
            className="object-cover opacity-90"
            priority
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-primary-950/20 to-transparent"
          />
          <blockquote className="absolute bottom-0 left-0 right-0 p-12">
            <p className="max-w-sm text-xl leading-relaxed text-white font-heading">
              &ldquo;A watch should be worn for years, not seasons.&rdquo;
            </p>
            <footer className="mt-3 text-sm text-secondary-400">
              Watch_Shop
            </footer>
          </blockquote>
        </div>
      </div>
    </Layout>
  );
}
