"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/components/ContactSection.module.scss";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // You could add API call to your backend here
  };

  return (
    <section className={styles.contactSection} id="contact">
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.title}>CONTACT ME</h1>

          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputRow}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.fullWidth}
                  required
                />
              </div>

              <div className={styles.inputRow}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputRow}>
                <textarea
                  name="message"
                  placeholder="Tell Us About Project *"
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.fullWidth}
                  required
                ></textarea>
              </div>

              <div className={styles.submitRow}>
                <button type="submit" className={styles.submitButton}>
                  Get In Touch
                  <span className={styles.arrow}>↗</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className={styles.imageContainer}>
          <Image
            src="/assets/5-2.png"
            alt="Contact support"
            width={600}
            height={700}
            priority
          />
          <Image
            src="/assets/13.png"
            alt="Contact support"
            width={600}
            height={700}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
