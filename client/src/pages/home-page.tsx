import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CourseCard } from "@/components/course-card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { courses } from "@shared/course-data";
import { useAuth } from "@/hooks/use-auth";
import { useContext } from "react";
import { AuthContext } from "@/hooks/use-auth";

export default function HomePage() {
  // Try to access the AuthContext directly first to avoid an error if the context is not available
  const authContext = useContext(AuthContext);
  const user = authContext?.user || null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-poppins leading-tight">
                Crush your <span className="text-yellow-300">Government exams</span> with Rung!
              </h1>
              <p className="mt-4 text-white text-base md:text-lg max-w-lg">
                We deliver Test series, Study materials, and Video classes to help you rise, prepare, and soar. Dive in today and unlock your path to success step by step, goal by goal!
              </p>
              <div className="mt-8">
                <Button size="lg" variant="secondary" asChild>
                  <Link href={user ? "/dashboard" : "/auth"}>
                    <a>Login to know more</a>
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative z-10">
              <svg className="w-full h-auto" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" stroke="#fff" strokeWidth="1" opacity="0.3">
                  <path d="M50,250 L150,150 L250,250 L350,150 L450,250" />
                  <path d="M100,100 L200,200 L300,100 L400,200" />
                  <path d="M150,300 L250,200 L350,300" />
                </g>
                <g fill="#fff" opacity="0.2">
                  <circle cx="150" cy="150" r="5" />
                  <circle cx="250" cy="250" r="5" />
                  <circle cx="350" cy="150" r="5" />
                  <circle cx="200" cy="200" r="5" />
                  <circle cx="300" cy="100" r="5" />
                  <circle cx="250" cy="200" r="5" />
                </g>
              </svg>
              
              {/* Feature bubbles */}
              <div className="absolute top-4 -left-4 bg-white rounded-xl p-3 shadow-lg flex items-center space-x-2">
                <div className="bg-blue-100 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-dark">Upcoming Examinations</span>
              </div>
              
              <div className="absolute top-1/3 -right-4 bg-white rounded-xl p-3 shadow-lg flex items-center space-x-2">
                <div className="bg-red-100 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="20" x2="12" y2="10" />
                    <line x1="18" y1="20" x2="18" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="16" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-dark">Track your progress</span>
              </div>
              
              <div className="absolute bottom-10 left-10 bg-white rounded-xl p-3 shadow-lg flex items-center space-x-2">
                <div className="bg-yellow-100 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-dark">Virtual Classroom Experience</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="text-white">
            <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,48C640,43,800,21,960,21.3C1120,21,1280,43,1360,53.3L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
          </svg>
        </div>
      </section>
      
      {/* Offerings Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-dark font-poppins">
              Our <span className="text-primary">Offerings</span>.
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-sm md:text-base text-dark-muted">
              Through our detailed data Research & analysis we provide you various courses:
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Virtual Classroom Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block">
                <div className="bg-primary text-white rounded-full px-4 py-1 text-sm font-medium">
                  Join our vibrant virtual classroom
                </div>
              </div>
              <h2 className="mt-3 text-2xl md:text-3xl font-bold text-dark font-poppins">
                at <span className="text-primary">Rung</span>
              </h2>
              <p className="mt-4 text-dark-muted max-w-xl">
                Study together for government exams from 9 AM to 5 PM daily! Collaborate, learn, and grow with peers in a live, interactive environment. Boost your prep with real-time support and expert guidance, every step of the way!
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <svg className="w-full h-64 bg-gray-200" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                <rect width="800" height="400" fill="#f0f0f0" />
                <g transform="translate(50, 50)">
                  <rect x="0" y="0" width="300" height="200" fill="#fff" rx="10" />
                  <rect x="20" y="20" width="260" height="120" fill="#e0e0e0" rx="5" />
                  <circle cx="150" cy="170" r="15" fill="#888" />
                </g>
                <g transform="translate(400, 100)">
                  <rect x="0" y="0" width="350" height="200" fill="#fff" rx="10" />
                  <rect x="20" y="20" width="310" height="120" fill="#e0e0e0" rx="5" />
                  <circle cx="175" cy="170" r="15" fill="#888" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Rung Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-dark font-poppins">
            About <span className="text-primary">Rung</span>
          </h2>
          <p className="mt-6 text-dark-muted">
            We're dedicated to transforming your government exam journey with a powerful blend of test series, comprehensive study materials, engaging video classes, and a collaborative online classroom (available 9 AM–5 PM daily). We provide expert resources and real-time support, ensuring you're fully prepared for PSC-structured exams with precision and confidence.
          </p>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-primary font-poppins">Our values drive us:</h3>
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="font-medium text-dark">Optimism:</h4>
                <p className="text-dark-muted">We believe in your potential, fostering a positive mindset to help you succeed.</p>
              </div>
              <div>
                <h4 className="font-medium text-dark">Return on Investment:</h4>
                <p className="text-dark-muted">We deliver high-value, results-driven tools and guidance, maximizing your exam preparation for tangible career outcomes.</p>
              </div>
              <div>
                <h4 className="font-medium text-dark">Alignment with PSC:</h4>
                <p className="text-dark-muted">Our content and strategies are tailored to match Public Service Commission exam formats, ensuring relevance and effectiveness.</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-dark-muted">
              Our vision is to be the trusted partner for every aspiring candidate, empowering you to achieve your goals with clarity, efficiency, and enduring success. Join us to unlock your future—step confidently toward your dream career!
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
