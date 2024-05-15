import { useEffect, useState } from "react";
import { bookmark } from "@/utils/format";

export default function useObserver({ sections }: { sections: string[] }) {
  const [currentView, setCurrentView] = useState<string | null>(null);

  useEffect(() =>{
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setCurrentView(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -60% 0px' });

    sections.forEach((section) => {
      const target = document.getElementById(bookmark(section));
      if (target) observer.observe(target);
    });

    return () => { 
      observer.disconnect();
    };

  }, [sections]);

  return { currentView };
}
