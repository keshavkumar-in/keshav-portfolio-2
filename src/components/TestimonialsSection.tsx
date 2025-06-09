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
      name: "Dr. Ramesh Potnuri",
      position: "LEAD RESEARCH SCIENTIST, BERT LABS",
      testimonial:
        '"Keshav is a smart, dependable, and technically strong professional with sharp troubleshooting skills and up-to-date development knowledge. He’s a fast learner who consistently delivers precise, solution-oriented results."',
      image: "/assets/Ramesh.webp",
      rating: 5,
    },
    {
      id: 2,
      name: "Nipun Krishnan",
      position: "UI/UX DESIGNER, BERT LABS",
      testimonial:
        '"Working with Keshav has been an inspiring experience—his deep technical knowledge and design sensitivity consistently elevate our UI/UX outcomes. He brings clarity, speed, and innovation to every collaboration."',
      image: "/assets/Nipun.webp",
      rating: 5,
    },
    {
      id: 3,
      name: "Dr. Md. Noor Islam",
      position: "COE, BIHAR STATE MADRASA EDUCATION BOARD, PATNA",
      testimonial:
        '"Keshav was instrumental in building our IT infrastructure and developing our web systems from scratch. His technical expertise and dedication greatly enhanced our digital capabilities."',
      image: "/assets/avatar.webp",
      rating: 5,
    },
    {
      id: 4,
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
          <div className={styles.badge}>RECOMMENDATIONS</div>
        </div>
        <div className={styles.header}>
          <h2 className={styles.title}>Professional Endorsements</h2>
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
                    className={`${styles.dot} ${
                      index === activeTestimonial ? styles.active : ""
                    }`}
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
              <div
                className={`${styles.testimonialImage} ${
                  isAnimating ? styles.slideImage : ""
                }`}
              >
                <Image
                  src={testimonials[activeTestimonial].image}
                  alt={testimonials[activeTestimonial].name}
                  fill
                  className={styles.image}
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          <div
            className={`${styles.contentSide} ${
              isAnimating ? styles.slideContent : ""
            }`}
          >
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

            <blockquote
              className={`${styles.testimonialText} ${
                isAnimating ? styles.slideText : ""
              }`}
            >
              {testimonials[activeTestimonial].testimonial}
            </blockquote>

            <div className={styles.divider}></div>

            <div
              className={`${styles.authorInfo} ${
                isAnimating ? styles.slideAuthor : ""
              }`}
            >
              <div className={styles.authorName}>
                {testimonials[activeTestimonial].name}
              </div>
              <div className={styles.authorPosition}>
                {testimonials[activeTestimonial].position}
              </div>
            </div>

            <div
              className={`${styles.testimonialNumber} ${
                isAnimating ? styles.slideNumber : ""
              }`}
            >
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
                  className={`${styles.dot} ${
                    index === activeTestimonial ? styles.active : ""
                  }`}
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
