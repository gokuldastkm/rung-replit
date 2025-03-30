import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Course } from "@shared/course-data";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="bg-white border border-gray-200 hover:shadow-md transition duration-300 ease-in-out">
      <CardContent className="p-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold">{course.shortName}</span>
          </div>
        </div>
        <h3 className="mt-4 text-center text-lg font-semibold text-dark font-poppins">
          {course.name}
        </h3>
        {course.subtitle && (
          <p className="mt-1 text-center text-sm text-dark-muted">
            {course.subtitle}
          </p>
        )}
        <div className="mt-4 space-y-2 text-sm text-dark">
          {course.features.map((feature, index) => (
            <div key={index} className="flex justify-center">
              <span className="block">{feature}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Button asChild variant="outline" className="rounded-full">
            <Link href={`/courses/${course.id}`}>
              <a className="flex items-center space-x-2">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
