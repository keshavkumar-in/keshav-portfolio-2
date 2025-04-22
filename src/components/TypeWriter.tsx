"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import styles from "@/styles/components/TypeWriter.module.scss";

interface TypeWriterProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetween?: number;
}

const TypeWriter: React.FC<TypeWriterProps> = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetween = 1500,
}) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const currentTextLength = useMemo(() => currentText.length, [currentText]);

  const handleTyping = useCallback(() => {
    const text = texts[currentIndex];

    if (isTyping) {
      if (currentTextLength < text.length) {
        return {
          newText: text.slice(0, currentTextLength + 1),
          delay: typingSpeed,
        };
      }
      return {
        newText: currentText,
        delay: delayBetween,
        shouldChangeTypingState: true,
      };
    } else {
      if (currentTextLength > 0) {
        return {
          newText: text.slice(0, currentTextLength - 1),
          delay: deletingSpeed,
        };
      }
      return {
        newText: "",
        delay: 0,
        shouldMoveToNextWord: true,
      };
    }
  }, [
    currentText,
    currentTextLength,
    currentIndex,
    isTyping,
    texts,
    typingSpeed,
    deletingSpeed,
    delayBetween,
  ]);

  useEffect(() => {
    const { newText, delay, shouldChangeTypingState, shouldMoveToNextWord } =
      handleTyping();

    const timeout = setTimeout(() => {
      setCurrentText(newText);

      if (shouldChangeTypingState) {
        setIsTyping(false);
      }

      if (shouldMoveToNextWord) {
        setIsTyping(true);
        setCurrentIndex((current) => (current + 1) % texts.length);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [handleTyping, texts.length]); // Added texts.length as dependency

  return (
    <span className={styles.typewriterContainer}>
      <span className={styles.typewriterText}>{currentText}</span>
      <span className={styles.cursor} aria-hidden="true">
        |
      </span>
    </span>
  );
};

export default TypeWriter;
