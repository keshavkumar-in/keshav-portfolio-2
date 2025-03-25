// TestimonialsSection.tsx
"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "@/styles/components/TestimonialsSection.module.scss";

interface Testimonial {
  id: number;
  name: string;
  position: string;
  testimonial: string;
  image: string;
  rating: number;
}

const TestimonialsSection: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Alex Michel",
      position: "UI/UX DESIGNER, BERT LABS",
      testimonial:
        '"Thanks to your web agency team for their professional work. The website they created for my business exceeded my expectations, and my clients have given positive feedback about its design and user-friendliness."',
      image: "/assets/Kirs.webp",
      rating: 5,
    },
    {
      id: 2,
      name: "Dr. Md. Noor Islam",
      position: "COE, BIHAR STATE MADRASA EDUCATION BOARD, PATNA",
      testimonial:
        '"Working with this team was a game-changer for our online presence. Their attention to detail and creative solutions helped us achieve a 40% increase in customer engagement within just two months."',
      image: "/assets/Kirs.webp",
      rating: 5,
    },
    {
      id: 3,
      name: "Kirs",
      position: "CO-FOUNDER, HOMIFII",
      testimonial:
        '"I was impressed by how quickly he understood our business needs and translated them into an intuitive web application. The custom features he developed have significantly streamlined our home automation system."',
      image: "/assets/Kirs.webp",
      rating: 5,
    },
  ];

  const handleDotClick = (index: number) => {
    if (index !== activeTestimonial) {
      setIsAnimating(true);
      setActiveTestimonial(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const goToNextTestimonial = useCallback(() => {
    setIsAnimating(true);
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [testimonials.length]);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      goToNextTestimonial();
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused, goToNextTestimonial]);

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        <div className={styles.badgeWrapper}>
          <div className={styles.badge}>TESTIMONIALS</div>
        </div>
        <div className={styles.header}>
          <h2 className={styles.title}>Clients Testimonials</h2>
          <div
            className={`${styles.navigation} ${styles.desktopNav}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className={styles.navigationLine}>
              {testimonials.map((_, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <div className={styles.line}></div>}
                  <button
                    className={`${styles.dot} ${index === activeTestimonial ? styles.active : ""}`}
                    onClick={() => handleDotClick(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                  >
                    <div className={styles.dotInner}></div>
                  </button>
                  {index < testimonials.length - 1 && (
                    <div className={styles.line}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div
          className={styles.testimonialCard}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={styles.testimonialSide}>
            <div className={styles.testimonialImageWrapper}>
              <div className={`${styles.testimonialImage} ${isAnimating ? styles.slideImage : ''}`}>
                <Image
                  src={testimonials[activeTestimonial].image}
                  alt={testimonials[activeTestimonial].name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>

          <div className={`${styles.contentSide} ${isAnimating ? styles.slideContent : ''}`}>
            <div className={styles.reviewInfo}>
              <div className={styles.reviewLabel}>Ratings</div>
              <div className={styles.stars}>
                {[...Array(5)].map((_, index) => (
                  <span key={index} className={styles.star}>
                    ★
                  </span>
                ))}
              </div>
            </div>

            <blockquote className={`${styles.testimonialText} ${isAnimating ? styles.slideText : ''}`}>
              {testimonials[activeTestimonial].testimonial}
            </blockquote>

            <div className={styles.divider}></div>

            <div className={`${styles.authorInfo} ${isAnimating ? styles.slideAuthor : ''}`}>
              <div className={styles.authorName}>
                {testimonials[activeTestimonial].name}
              </div>
              <div className={styles.authorPosition}>
                {testimonials[activeTestimonial].position}
              </div>
            </div>

            <div className={`${styles.testimonialNumber} ${isAnimating ? styles.slideNumber : ''}`}>
              {String(testimonials[activeTestimonial].id).padStart(2, "0")}
            </div>
          </div>
        </div>

        <div
          className={`${styles.navigation} ${styles.mobileNav}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={styles.navigationLine}>
            {testimonials.map((_, index) => (
              <React.Fragment key={index}>
                {index > 0 && <div className={styles.line}></div>}
                <button
                  className={`${styles.dot} ${index === activeTestimonial ? styles.active : ""}`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  <div className={styles.dotInner}></div>
                </button>
                {index < testimonials.length - 1 && (
                  <div className={styles.line}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
