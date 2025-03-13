import { useState, useEffect } from 'react';

export const useScrollSpy = (sectionIds: string[], offset: number = 100) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      const current = sectionIds
        .map(sectionId => {
          const element = document.getElementById(sectionId);
          if (!element) return { id: sectionId, position: -1 };
          
          const rect = element.getBoundingClientRect();
          return {
            id: sectionId,
            position: rect.top + window.pageYOffset
          };
        })
        .find(section => {
          const nextSection = sectionIds
            .map(id => document.getElementById(id))
            .find((el) => {
              if (!el) return false;
              const rect = el.getBoundingClientRect();
              return rect.top + window.pageYOffset > section.position;
            });

          return nextSection
            ? scrollPosition >= section.position && scrollPosition < (nextSection.getBoundingClientRect().top + window.pageYOffset)
            : scrollPosition >= section.position;
        });

      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial active section

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, offset]);

  return activeSection;
}; 