import { Logo } from "./ui/logo";
import { NewsletterForm } from "./newsletter-form";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center text-center">
          <Logo color="white" />
          <div className="mt-4 flex items-center">
            <span className="text-gray-400">Kerala PSC</span>
          </div>

          <NewsletterForm />

          <div className="mt-8 text-gray-400">
            <p>for any quires email us on contact@rung.info</p>
          </div>

          <div className="mt-8 flex space-x-4 text-sm">
            <Link href="#">
              <a className="text-gray-400 hover:text-white transition duration-150 ease-in-out">
                Privacy Policy
              </a>
            </Link>
            <span className="text-gray-600">|</span>
            <Link href="#">
              <a className="text-gray-400 hover:text-white transition duration-150 ease-in-out">
                Terms & Conditions
              </a>
            </Link>
          </div>

          <div className="mt-8 text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Rung
          </div>
        </div>
      </div>
    </footer>
  );
}
