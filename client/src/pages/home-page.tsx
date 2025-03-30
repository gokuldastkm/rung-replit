import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Navbar } from '@/components/navbar';
import { Footer } from "@/components/footer";
import { CourseCard } from "@/components/course-card";
import { courses } from "@shared/course-data";


export function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground font-poppins">
            Learn <span className="text-primary">Anything</span>
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
            Discover our wide range of courses and start learning today
          </p>
        </div>
      </section>

      {/* Offerings Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground font-poppins">
              Our <span className="text-primary">Offerings</span>
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-sm md:text-base text-muted-foreground">
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
      <Footer/>
    </div>
  );
}