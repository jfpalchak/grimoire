import { useEffect, useRef, useState } from "react";

export function useObserver() {
  const [inView, setInView] = useState<string | null>(null);
  const refs = useRef<HTMLElement[]>([]);

  useEffect(() =>{
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setInView(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -60% 0px' });

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => { 
      observer.disconnect();
    };

  }, []);

  return { inView, refs };
}
