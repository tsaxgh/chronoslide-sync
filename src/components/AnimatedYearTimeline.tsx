import { useState, useEffect, useRef } from "react";

interface NewsItem {
  title: string;
  location: string;
  date: string;
}

interface TimelineData {
  year: string;
  newsItems: NewsItem[];
}

const timelineData: TimelineData[] = [
  {
    year: "2025",
    newsItems: [
      {
        title: "AM/NS India first to secure CSIR-CRRI's breakthrough steel slag aggregates technology license to unlock 'Waste-to-Wealth' potential in road infrastructure development",
        location: "Delhi / Mumbai",
        date: "July 2025"
      },
      {
        title: "AM/NS India commissions state-of-the-art Continuous Galvanising Line (CGL), first in India to produce highest strength steel for automotive sector",
        location: "Mumbai/Delhi",
        date: "July 2025"
      },
      {
        title: "AM/NS India launches world-class, patented colour-coated products Optigal® Prime and Optigal® Pinnacle to drive 'Viksit Bharat'",
        location: "New Delhi",
        date: "May 2025"
      }
    ]
  },
  {
    year: "2024",
    newsItems: [
      {
        title: "AM/NS India launches Magnelis® - unique import substitute to power India' renewable energy transition",
        location: "Mumbai",
        date: "September 2024"
      },
      {
        title: "AM/NS India launches Optigal®, world-class product with longest warranty",
        location: "Mumbai",
        date: "August 2024"
      },
      {
        title: "ArcelorMittal Nippon Steel India renews partnership with Protean to advance 'Beti Padhao' scholarship initiative",
        location: "Mumbai",
        date: "March 2024"
      }
    ]
  },
  {
    year: "2023",
    newsItems: [
      {
        title: "ArcelorMittal launches XCarb™ Innovation Fund Accelerator Programme for breakthrough climate tech start-ups in India",
        location: "New Delhi",
        date: "August 2023"
      },
      {
        title: "ArcelorMittal Nippon Steel India and Festo India to collaborate on higher and vocational education",
        location: "Chennai",
        date: "July 2023"
      },
      {
        title: "ArcelorMittal Nippon Steel India collaborates with National Skill Development Corporation again to provide digital training for young people nationwide",
        location: "Ahmedabad/Bengaluru",
        date: "July 2023"
      }
    ]
  },
  {
    year: "2022",
    newsItems: [
      {
        title: "ArcelorMittal Nippon Steel India collaborates with National Skill Development Corporation again to provide digital training for young people nationwide",
        location: "New Delhi",
        date: "December 2022"
      },
      {
        title: "ArcelorMittal Nippon Steel India completes Rs 16,500 crore acquisition of port and power assets from Essar Group",
        location: "Mumbai",
        date: "November 2022"
      },
      {
        title: "ArcelorMittal Nippon Steel India unveils 'Reimagineering', its first-ever corporate brand campaign",
        location: "Mumbai",
        date: "November 2022"
      }
    ]
  },
  {
    year: "2021",
    newsItems: [
      {
        title: "ArcelorMittal Nippon Steel India and National Small Industries Corporation join hands to revive MSMEs",
        location: "New Delhi",
        date: "September 2021"
      },
      {
        title: "ArcelorMittal Nippon Steel India commences operations at Ghoraburhani- Sagasahi iron ore mine in Odisha",
        location: "Bhubaneswar, Odisha",
        date: "September 2021"
      },
      {
        title: "ArcelorMittal Nippon Steel India commissions second 6 million tonne pellet plant in Odisha",
        location: "Paradeep, Odisha",
        date: "September 2021"
      }
    ]
  },
  {
    year: "2020",
    newsItems: [
      {
        title: "AM/NS India launches new high-grade steels",
        location: "Mumbai",
        date: "October 2020"
      },
      {
        title: "AM/NS India to expand its Hypermart retail chain to 50 outlets",
        location: "Mumbai",
        date: "October 2020"
      },
      {
        title: "ArcelorMittal Nippon Steel India acquires Bhander Power plant",
        location: "Hazira, Gujarat",
        date: "March 2020"
      }
    ]
  },
  {
    year: "2019",
    newsItems: [
      {
        title: "ArcelorMittal and Nippon Steel complete acquisition of Essar Steel",
        location: "Mumbai",
        date: "December 2019"
      },
      {
        title: "Indian Supreme Court approves ArcelorMittal's acquisition of Essar Steel",
        location: "Mumbai",
        date: "November 2019"
      }
    ]
  }
];

export const AnimatedYearTimeline = () => {
  const [currentYearIndex, setCurrentYearIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  // Handle scroll navigation
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
      
      if (!isInView || isScrolling) return;

      e.preventDefault();
      setIsScrolling(true);

      const direction = e.deltaY > 0 ? 1 : -1;
      const newIndex = Math.max(0, Math.min(timelineData.length - 1, currentYearIndex + direction));
      
      if (newIndex !== currentYearIndex) {
        setCurrentYearIndex(newIndex);
      }

      setTimeout(() => setIsScrolling(false), 800);
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('wheel', handleScroll, { passive: false });
      return () => section.removeEventListener('wheel', handleScroll);
    }
  }, [currentYearIndex, isScrolling]);

  // Auto-advance timeline every 5 seconds (when not scrolling)
  useEffect(() => {
    if (isScrolling) return;
    
    const interval = setInterval(() => {
      setCurrentYearIndex((prev) => (prev + 1) % timelineData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isScrolling]);

  const handleYearChange = (index: number) => {
    if (index !== currentYearIndex && !isAnimating) {
      setIsAnimating(true);
      setCurrentYearIndex(index);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  const currentData = timelineData[currentYearIndex];

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-timeline-dark text-timeline-light overflow-hidden flex flex-col justify-center py-20"
    >
      {/* Header */}
      <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
        <h2 className="text-timeline-muted uppercase tracking-[4px] text-sm font-light">
          Newsroom
        </h2>
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[500px]">
          
          {/* Left Side - Year Display */}
          <div className="relative flex justify-center items-center h-[400px]">
            {/* Background Year (Faded) */}
            <div 
              className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none"
              key={`bg-${currentYearIndex}`}
            >
              <span 
                className="text-[300px] lg:text-[400px] font-bold text-timeline-light leading-none animate-timeline-fade-scale"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                {currentData.year}
              </span>
            </div>

            {/* Main Year Display */}
            <div className="relative z-10 flex items-center justify-start">
              {/* Fixed "20" Prefix - Outside the shape */}
              <span 
                className="text-[120px] lg:text-[180px] font-bold text-timeline-red leading-none mr-4"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                20
              </span>
              
              {/* Tilted Rectangle Container for Year Suffix */}
              <div className="relative">
                {/* Red Tilted Rectangle Background */}
                <div 
                  className="w-[180px] lg:w-[280px] h-[120px] lg:h-[180px] bg-timeline-red transform rotate-12 shadow-lg"
                  style={{ 
                    background: 'var(--timeline-gradient)',
                    boxShadow: 'var(--timeline-shadow)'
                  }}
                />
                
                {/* Year Suffix Container - Positioned inside the tilted rectangle */}
                <div className="absolute inset-0 overflow-hidden">
                  <div 
                    className="flex flex-col items-center justify-center h-full transition-transform"
                    style={{
                      transform: `translateY(-${currentYearIndex * 100}%)`,
                      transition: 'var(--timeline-transition)'
                    }}
                  >
                    {timelineData.map((item, index) => (
                      <div 
                        key={item.year}
                        className="w-full h-[120px] lg:h-[180px] flex items-center justify-center"
                      >
                        <span 
                          className="text-[70px] lg:text-[120px] font-bold text-timeline-light leading-none transform -rotate-12"
                          style={{ fontFamily: 'Arial, sans-serif' }}
                        >
                          {item.year.slice(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content Display */}
          <div className="relative h-[400px] overflow-hidden">
            <div 
              className="absolute inset-0 transition-transform"
              style={{
                transform: `translateY(-${currentYearIndex * 400}px)`,
                transition: 'var(--timeline-transition)'
              }}
            >
              {timelineData.map((yearData, yearIndex) => (
                <div 
                  key={yearData.year}
                  className="h-[400px] flex flex-col justify-center space-y-8"
                >
                  {yearData.newsItems.map((item, itemIndex) => (
                    <div 
                      key={itemIndex}
                      className="border-b border-gray-800 pb-6 last:border-b-0"
                    >
                      <h3 className="text-lg lg:text-xl font-normal text-timeline-light mb-3 leading-tight">
                        {item.title}
                      </h3>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-timeline-red font-medium">
                          {item.location}
                        </span>
                        <span className="text-timeline-red font-medium">
                          {item.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Year Navigation Dots */}
        <div className="flex justify-center space-x-3 mt-12">
          {timelineData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleYearChange(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentYearIndex 
                  ? 'bg-timeline-red scale-125' 
                  : 'bg-timeline-muted hover:bg-timeline-red/50'
              }`}
              aria-label={`Go to year ${timelineData[index].year}`}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-12 right-8">
        <button className="text-timeline-light uppercase tracking-[3px] text-sm font-light hover:text-timeline-red transition-colors duration-300">
          View All
        </button>
      </div>
    </section>
  );
};