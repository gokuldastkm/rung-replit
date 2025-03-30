import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarImageProps {
  src: string;
  alt: string;
  fallback: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function AvatarImage({ 
  src, 
  alt, 
  fallback, 
  size = "md" 
}: AvatarImageProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  return (
    <Avatar className={sizeClasses[size]}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
