import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface CustomcardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
}

const Customcard = ({ frontContent, backContent, className }: CustomcardProps) => {
  const [showBackContent, setShowBackContent] = useState(false);
  const lastScrollTime = useRef<number>(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = (_e: WheelEvent) => {
      // Debounce scroll events to prevent rapid toggling
      const now = Date.now();
      if (now - lastScrollTime.current < 300) {
        return;
      }
      
      lastScrollTime.current = now;
      
      // Toggle between front and back content when scrolling
      setShowBackContent(prevState => !prevState);
      
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Prevent additional scroll events for a short time
      scrollTimeoutRef.current = setTimeout(() => {
        scrollTimeoutRef.current = null;
      }, 300);
    };
    
    // Add event listener to the window
    window.addEventListener('wheel', handleScroll);
    
    return () => {
      window.removeEventListener('wheel', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={cn(
        "relative w-full h-[407px] rounded-xl overflow-hidden shadow-lg transition-all duration-500", 
        className
      )}
      onTouchStart={() => setShowBackContent(!showBackContent)}
    >
      <div
        className={cn(
          "absolute inset-0 w-full h-full transition-transform duration-500 ease-in-out p-2",
          showBackContent ? "-translate-y-full" : "translate-y-0"
        )}
      >
        {frontContent}
      </div>
      <div
        className={cn(
          "absolute inset-0 w-full h-full transition-transform duration-500 ease-in-out p-2",
          showBackContent ? "translate-y-0" : "translate-y-full"
        )}
      >
        {backContent}
      </div>
    </div>
  );
};

export default Customcard;