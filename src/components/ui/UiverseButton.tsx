"use client";

import React from "react";
import styled from "styled-components";

interface UiverseButtonProps {
  text: string;
  icon?: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
}

const UiverseButton = ({
  text,
  icon,
  href,
  variant = "primary",
}: UiverseButtonProps) => {
  const content = (
    <div className="wrapper">
      <span className="content">
        {icon}
        {text}
      </span>
      {circles}
    </div>
  );

  return (
    <StyledWrapper>
      {href ? (
        <a
          href={href}
          className={`uiverse ${variant}`}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {content}
        </a>
      ) : (
        <button className={`uiverse ${variant}`}>{content}</button>
      )}
    </StyledWrapper>
  );
};

/* Reusable circles */
const circles = (
  <>
    {Array.from({ length: 12 }).map((_, i) => (
      <div key={i} className={`circle circle-${i + 1}`} />
    ))}
  </>
);

const StyledWrapper = styled.div`
  display: inline-flex;

  .uiverse {
    --duration: 7s;
    --easing: linear;

    border-radius: 9999px;
    border: none;
    cursor: pointer;
    padding: 0;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #fff;
    background: radial-gradient(circle, #111, #050505 80%);
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease;
    text-decoration: none;
  }

  .uiverse:hover {
    transform: scale(1.05);
    --duration: 1500ms;
  }

  .wrapper {
    position: relative;
    padding: 18px 40px;
    border-radius: 9999px;
    overflow: hidden;
  }

  .content {
    position: relative;
    z-index: 10;
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    font-size: 14px;
  }

  .circle {
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    filter: blur(16px);
    background: rgba(255, 255, 255, 0.2);
    animation: float var(--duration) var(--easing) infinite;
  }

  ${Array.from({ length: 12 })
    .map(
      (_, i) => `
      .circle-${i + 1} {
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation-delay: ${i * 0.3}s;
      }
    `
    )
    .join("")}

  @keyframes float {
    0% { transform: translate(0, 0); }
    50% { transform: translate(20px, -20px); }
    100% { transform: translate(0, 0); }
  }
`;

export default UiverseButton;