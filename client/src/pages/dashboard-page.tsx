import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import { LayoutDashboard, ClipboardList, BookOpen, User, Settings, LogOut, Search } from "lucide-react";
import { CourseCard } from "@/components/course-card";
import { courses } from "@shared/course-data";

const Sidebar = () => {
  const { logoutMutation } = useAuth();
  const [activeItem, setActiveItem] = useState("dashboard");

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const navItems = [
    { id: "dashboard", name: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { id: "test-series", name: "Test Series", icon: <ClipboardList className="h-5 w-5" /> },
    { id: "resources", name: "Resources", icon: <BookOpen className="h-5 w-5" /> },
    { id: "profile", name: "Profile", icon: <User className="h-5 w-5" /> },
    { id: "settings", name: "Settings", icon: <Settings className="h-5 w-5" /> },
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
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activeItem === item.id
                    ? "text-primary bg-blue-50"
                    : "text-dark-muted hover:text-primary hover:bg-blue-50"
                }`}
                onClick={() => setActiveItem(item.id)}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <Button variant="ghost" className="w-full justify-start text-dark-muted hover:text-primary" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
          <span className="ml-3">Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
  
  const dayOfWeek = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <div className="bg-primary text-white p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="font-medium">
                Welcome, <span className="font-semibold">{user?.username || "User"}</span>
              </span>
              <div className="w-64 bg-white bg-opacity-20 rounded-md p-0.5">
                <div className="bg-white px-4 py-1 rounded-md text-primary text-sm flex items-center">
                  <Search className="h-4 w-4 mr-2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search courses..."
                    className="border-none shadow-none focus:ring-0 p-0 h-6 bg-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm">{formattedDate}</span>
              <span className="mx-2">|</span>
              <span className="text-sm">{dayOfWeek}</span>
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Your Courses</h1>
            <p className="text-gray-600 mt-1">
              Browse through your enrolled and available courses
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          
          <div className="mt-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Exams</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <h3 className="font-medium">Kerala PSC Degree Level Prelims</h3>
                    <p className="text-sm text-gray-500">Exam Code: DGR-2023</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">July 15, 2023</p>
                    <p className="text-xs text-gray-500">45 days remaining</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <h3 className="font-medium">Kerala Administrative Service</h3>
                    <p className="text-sm text-gray-500">Exam Code: KAS-2023</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">August 10, 2023</p>
                    <p className="text-xs text-gray-500">71 days remaining</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">10th Level Mains</h3>
                    <p className="text-sm text-gray-500">Exam Code: 10LVL-2023</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">September 5, 2023</p>
                    <p className="text-xs text-gray-500">97 days remaining</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Virtual Classroom Schedule</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 bg-primary text-white">
                <p className="font-medium">Daily Sessions: 9 AM - 5 PM</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-24 text-sm font-medium">9:00 - 10:30</div>
                    <div>
                      <h4 className="font-medium">General Studies</h4>
                      <p className="text-sm text-gray-500">Indian History & Culture</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-24 text-sm font-medium">11:00 - 12:30</div>
                    <div>
                      <h4 className="font-medium">Current Affairs</h4>
                      <p className="text-sm text-gray-500">National & International Events</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-24 text-sm font-medium">1:30 - 3:00</div>
                    <div>
                      <h4 className="font-medium">Kerala State Affairs</h4>
                      <p className="text-sm text-gray-500">Economy & Development</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-24 text-sm font-medium">3:30 - 5:00</div>
                    <div>
                      <h4 className="font-medium">Test & Discussion</h4>
                      <p className="text-sm text-gray-500">Practice MCQs with Expert Guidance</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button className="w-full">Join Virtual Classroom</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
