// TestimonialsSection.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/components/TestimonialsSection.module.scss";

interface Testimonial {
  id: number;
  name: string;
  position: string;
  testimonial: string;
  image: string;
  rating: number;
  reviewPlatform: {
    name: string;
    logo: string;
  };
  reviewCount: number;
}

const TestimonialsSection: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Alex Michel",
      position: "UI/UX DESIGNER",
      testimonial:
        '"Thanks to your web agency team for their professional work. The website they created for my business exceeded my expectations, and my clients have given positive feedback about its design and user-friendliness."',
      image: "/images/testimonials/alex-michel.png",
      rating: 4.9,
      reviewCount: 60,
      reviewPlatform: {
        name: "Gate.io",
        logo: "/images/platforms/gate-io.svg",
      },
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "MARKETING DIRECTOR",
      testimonial:
        '"Working with this team was a game-changer for our online presence. Their attention to detail and creative solutions helped us achieve a 40% increase in customer engagement within just two months."',
      image: "/images/testimonials/sarah-johnson.png",
      rating: 4.8,
      reviewCount: 45,
      reviewPlatform: {
        name: "Gate.io",
        logo: "/images/platforms/gate-io.svg",
      },
    },
    {
      id: 3,
      name: "David Chen",
      position: "E-COMMERCE OWNER",
      testimonial:
        '"I was impressed by how quickly they understood our business needs and translated them into an intuitive website. The custom features they developed have significantly streamlined our order processing system."',
      image: "/images/testimonials/david-chen.png",
      rating: 5.0,
      reviewCount: 38,
      reviewPlatform: {
        name: "Gate.io",
        logo: "/images/platforms/gate-io.svg",
      },
    },
  ];

  const handleDotClick = (index: number) => {
    setActiveTestimonial(index);
  };

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        <div className={styles.badgeWrapper}>
          <div className={styles.badge}>TESTIMONIALS</div>
        </div>
        <div className={styles.header}>
          <h2 className={styles.title}>Clients Testimonials</h2>

          {/* <div className={styles.navigation}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${
                  index === activeTestimonial ? styles.active : ""
                }`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div> */}
          <div className={styles.navigation}>
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

        <div className={styles.testimonialCard}>
          <div className={styles.testimonialSide}>
            <div className={styles.testimonialImageWrapper}>
              <div className={styles.testimonialImage}>
                <Image
                  src={testimonials[activeTestimonial].image}
                  alt={testimonials[activeTestimonial].name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>

          <div className={styles.contentSide}>
            <div className={styles.reviewInfo}>
              <div className={styles.reviewLabel}>Reviews On</div>
              <div className={styles.stars}>
                {[...Array(5)].map((_, index) => (
                  <span key={index} className={styles.star}>
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.platformInfo}>
              <div className={styles.platformLogo}>
                <Image
                  src={testimonials[activeTestimonial].reviewPlatform.logo}
                  alt={testimonials[activeTestimonial].reviewPlatform.name}
                  width={120}
                  height={30}
                  objectFit="contain"
                />
              </div>
              <div className={styles.ratingInfo}>
                {testimonials[activeTestimonial].rating}/{" "}
                {testimonials[activeTestimonial].reviewCount} Reviews
              </div>
            </div>

            <blockquote className={styles.testimonialText}>
              {testimonials[activeTestimonial].testimonial}
            </blockquote>

            <div className={styles.divider}></div>

            <div className={styles.authorInfo}>
              <div className={styles.authorName}>
                {testimonials[activeTestimonial].name}
              </div>
              <div className={styles.authorPosition}>
                {testimonials[activeTestimonial].position}
              </div>
            </div>

            <div className={styles.testimonialNumber}>
              {String(testimonials[activeTestimonial].id).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
