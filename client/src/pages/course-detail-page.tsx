import { useState } from "react";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import { LayoutDashboard, ClipboardList, BookOpen, User, Settings, LogOut, CheckCircle } from "lucide-react";
import { courses } from "@shared/course-data";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const Sidebar = () => {
  const { logoutMutation } = useAuth();
  const [activeItem, setActiveItem] = useState("test-series");

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const navItems = [
    { id: "dashboard", name: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" />, href: "/dashboard" },
    { id: "test-series", name: "Test Series", icon: <ClipboardList className="h-5 w-5" />, href: "#" },
    { id: "resources", name: "Resources", icon: <BookOpen className="h-5 w-5" />, href: "#" },
    { id: "profile", name: "Profile", icon: <User className="h-5 w-5" />, href: "#" },
    { id: "settings", name: "Settings", icon: <Settings className="h-5 w-5" />, href: "#" },
  ];

  return (
    <div className="w-64 bg-white shadow-md flex flex-col h-screen">
      <div className="p-4 border-b border-gray-200">
        <Link href="/">
          <a className="flex items-center">
            <Logo />
          </a>
        </Link>
      </div>
      <nav className="p-4 flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link href={item.href}>
                <a className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition duration-150 ease-in-out ${
                  activeItem === item.id
                    ? "text-primary bg-blue-50"
                    : "text-dark-muted hover:text-primary hover:bg-blue-50"
                }`}
                onClick={() => setActiveItem(item.id)}>
                  {item.icon}
                  <span>{item.name}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button 
          className="flex items-center space-x-2 text-dark-muted hover:text-primary transition duration-150 ease-in-out w-full px-4 py-2"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default function CourseDetailPage() {
  const [match, params] = useRoute('/courses/:id');
  const { toast } = useToast();
  const [enrolling, setEnrolling] = useState(false);
  
  if (!match) return <div>Course not found</div>;
  
  const courseId = params?.id;
  const course = courses.find(c => c.id === courseId);
  
  if (!course) return <div>Course not found</div>;

  const courseFeatures = [
    "Structured 80-day Program",
    "7500+ Curated Questions",
    "Subject-wise Tests",
    "Full-Length Mock Exams",
    "Detailed Performance Analytics"
  ];

  const handleEnroll = async () => {
    try {
      setEnrolling(true);
      await apiRequest("POST", "/api/enrollments", { courseId });
      toast({
        title: "Enrollment request sent!",
        description: "We'll contact you soon with payment details.",
      });
    } catch (error) {
      toast({
        title: "Enrollment failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setEnrolling(false);
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <div className="bg-primary text-white p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="font-medium">{course.name}</span>
            </div>
            <div>
              <Link href="/dashboard">
                <a className="text-white hover:text-blue-100 text-sm underline">
                  Back to Dashboard
                </a>
              </Link>
            </div>
          </div>
        </div>

        {/* Course details content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-dark">{course.name}</h2>
                </div>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2 text-dark-muted">
                    <span>English</span>
                  </div>
                  <div className="flex items-center space-x-2 text-dark-muted">
                    <span>KAS</span>
                  </div>
                  <div className="flex items-center space-x-2 text-dark-muted">
                    <span>Kerala PSC</span>
                  </div>
                  <div className="flex items-center space-x-2 text-dark-muted">
                    <span>Full time access</span>
                  </div>
                  <div className="flex items-center space-x-2 text-dark-muted">
                    <span>Materials included</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
                <div className="lg:w-1/2">
                  <div className="w-full h-64 rounded-lg bg-gray-200 flex items-center justify-center">
                    <svg className="h-32 w-32 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-dark">About this test series</h3>
                    <p className="mt-2 text-dark-muted">
                      Unlock your KAS success with KAS Win—an intensive 80-day program designed to conquer the Kerala Administrative Service Prelims. Dive into over 7,500 expertly crafted questions, covering every corner of the KAS syllabus—Kerala specific current affairs, general studies, and the official exam pattern. With comprehensive study material to sharpen your skills, from sectional tests to full-length mocks, this is your all-in-one prep powerhouse. Ready to win? Join now and turn 80 days into your victory!
                    </p>
                    <p className="mt-4 text-dark-muted">
                      With KAS Win, you're not just studying—you're excelling. Our carefully crafted 80-day plan ensures you master every corner of the KAS syllabus—Kerala-specific current affairs, General Studies, and more. Designed by KAS experts, these mock exams mirror the exam's exact format, giving you a competitive edge. Paired with our comprehensive study material—crisp, updated, and packed with insights—our program makes every challenge surmountable. Daily practice and expert guidance make KAS Win your gateway to success. Don't just dream of clearing the Kerala KAS—dominate it. Join now and kickstart your victory march!
                    </p>
                  </div>
                </div>
                
                <div className="lg:w-1/2">
                  <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                    <div className="text-2xl font-bold text-primary">₹{course.price.toFixed(2)}</div>
                    <div className="mt-2 text-sm text-dark-muted">To enroll, send us a message on WhatsApp by clicking the button below</div>
                    <Button
                      className="mt-4 w-full bg-blue-600 hover:bg-blue-700"
                      onClick={handleEnroll}
                      disabled={enrolling}
                    >
                      {enrolling ? "Processing..." : "Enroll Today"}
                    </Button>
                    
                    <div className="mt-8 space-y-4">
                      {courseFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 text-primary">
                            <CheckCircle className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-medium text-dark">{feature}</h4>
                            <p className="text-sm text-dark-muted">
                              {index === 0 && "Systematic approach to complete the entire syllabus"}
                              {index === 1 && "Practice with quality questions designed by experts"}
                              {index === 2 && "Focus on individual subjects to strengthen weak areas"}
                              {index === 3 && "Experience the actual exam environment"}
                              {index === 4 && "Track your progress and identify improvement areas"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
