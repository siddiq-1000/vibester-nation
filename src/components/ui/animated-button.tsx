"use client";

import React from 'react';
import styled from 'styled-components';

interface AnimatedButtonProps {
    text: string;
    icon?: React.ReactNode;
}

const AnimatedButton = ({ text, icon }: AnimatedButtonProps) => {
    return (
        <StyledWrapper>
            <div className="button-scale-wrapper">
                <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                    <filter width="300%" x="-100%" height="300%" y="-100%" id="unopaq">
                        <feColorMatrix values="1 0 0 0 0 
            0 1 0 0 0 
            0 0 1 0 0 
            0 0 0 9 0" />
                    </filter>
                    <filter width="300%" x="-100%" height="300%" y="-100%" id="unopaq2">
                        <feColorMatrix values="1 0 0 0 0 
            0 1 0 0 0 
            0 0 1 0 0 
            0 0 0 3 0" />
                    </filter>
                    <filter width="300%" x="-100%" height="300%" y="-100%" id="unopaq3">
                        <feColorMatrix values="1 0 0 0.2 0 
            0 1 0 0.2 0 
            0 0 1 0.2 0 
            0 0 0 2 0" />
                    </filter>
                </svg>
                <button className="real-button" />
                <div className="backdrop" />
                <div className="button-container">
                    <div className="spin spin-blur" />
                    <div className="spin spin-intense" />
                    <div className="backdrop" />
                    <div className="button-border">
                        <div className="spin spin-inside" />
                        <div className="button">
                            {icon && <div className="icon-container">{icon}</div>}
                            {text}
                        </div>
                    </div>
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .button-scale-wrapper {
    position: relative;
    width: 240px; 
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .button-border {
    padding: 3px;
    inset: 0;
    background: #0005;
    border-radius: 999px;
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button {
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 999px;
    width: 100%;
    height: 100%;
    background: #111215;
    display: flex;
    flex-direction: column;
    color: #fff;
    overflow: hidden;
    font-family: var(--font-heading);
    font-size: 13px;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.1em;
    padding: 8px;
    text-align: center;
    line-height: 1.2;
    z-index: 5;
  }

  .icon-container {
    color: #00f2ff;
    margin-bottom: 2px;
  }

  .real-button {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    outline: none;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    opacity: 0;
  }

  .backdrop {
    position: absolute;
    inset: -9900%;
    background: radial-gradient(
      circle at 50% 50%,
      #0000 0,
      #0000 20%,
      #111111aa 50%
    );
    background-size: 3px 3px;
    z-index: -1;
  }

  .spin {
    position: absolute;
    inset: 0;
    z-index: -2;
    opacity: 1;
    overflow: hidden;
    transition: 0.3s;
  }

  .real-button:active ~ div .spin {
    opacity: 1;
  }

  .spin-blur {
    filter: blur(2em) url(#unopaq);
  }

  .spin-intense {
    inset: -0.125em;
    filter: blur(0.25em) url(#unopaq2);
    border-radius: 999px;
  }

  .spin-inside {
    inset: -2px;
    border-radius: inherit;
    filter: blur(2px) url(#unopaq3);
    z-index: 0;
  }

  .spin::before {
    content: "";
    position: absolute;
    inset: -150%;
    animation:
      speen 4s cubic-bezier(0.56, 0.15, 0.28, 0.86) infinite,
      woah 4s infinite;
    animation-play-state: paused;
  }

  .real-button:hover ~ div .spin::before {
    animation-play-state: running;
  }

  .spin-blur::before {
    background: linear-gradient(90deg, #f50 30%, #0000 50%, #05f 70%);
  }

  .spin-intense::before {
    background: linear-gradient(90deg, #f95 20%, #0000 45% 55%, #59f 80%);
  }

  .spin-inside::before {
    background: linear-gradient(90deg, #fc9 30%, #0000 45% 55%, #9cf 70%);
  }

  @keyframes speen {
    0% {
      rotate: 10deg;
    }
    50% {
      rotate: 190deg;
    }
    to {
      rotate: 370deg;
    }
  }

  @keyframes woah {
    0%, to {
      scale: 1;
    }
    50% {
      scale: 0.75;
    }
  }
`;

export default AnimatedButton;
