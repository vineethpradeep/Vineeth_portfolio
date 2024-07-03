import React, { useRef, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import "intersection-observer";

const Wrapper = styled.div`
  width: 100%;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;

  ${(props) =>
    props.isVisible &&
    css`
      opacity: 1;
      transform: translateY(0);
    `}
`;

const withScrollAnimation = (WrappedComponent) => {
  return (props) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef();

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, []);

    return (
      <Wrapper ref={ref} isVisible={isVisible}>
        <WrappedComponent {...props} />
      </Wrapper>
    );
  };
};

export default withScrollAnimation;
