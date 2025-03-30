import { BookOpenText } from "lucide-react";

interface LogoProps {
  color?: "white" | "primary";
  size?: "small" | "medium" | "large";
}

export function Logo({ color = "primary", size = "medium" }: LogoProps) {
  const textColor = color === "primary" ? "text-primary" : "text-white";
  const iconSize = 
    size === "small" ? "h-6 w-6" : 
    size === "large" ? "h-10 w-10" : 
    "h-8 w-8";
  
  const textSize = 
    size === "small" ? "text-lg" : 
    size === "large" ? "text-2xl" : 
    "text-xl";

  return (
    <div className="flex items-center">
      <BookOpenText className={`${iconSize} ${textColor}`} />
      <span className={`ml-2 ${textSize} font-semibold ${textColor} font-poppins`}>RUNG</span>
    </div>
  );
}
