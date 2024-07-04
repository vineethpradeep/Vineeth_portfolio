import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
:root {
    &, &.light-mode{

    }
    &.dark-mode {

    }
    /* Common styles */
    --line-color: rgb(88, 85, 79, 0.3);;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Open Sans", sans-serif;
  color: rgb(44,44,44);
  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

::selection {
    background-color:rgba(255,217,62,0.3);
}

::-moz-selection {
    background-color:rgba(255,217,62,0.3);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

@media only screen and (min-width: 1170px) {
  
    .vertical-timeline.vertical-timeline--two-columns:before {
        background-color: #ccccca;
    }
     .vertical-timeline--two-columns .vertical-timeline-element-content .vertical-timeline-element-date {
        font-size: 21px;
        font-size: 1.4rem
    }

     .vertical-timeline-element-content p {
        font-size: 21px;
        font-size: 1.4rem
    }
}
@media only screen and (min-width: 768px) {
   .vertical-timeline-element-content p {
        font-size: 21px;
        font-size: 1.4rem
    }
     .vertical-timeline--two-columns .vertical-timeline-element-content .vertical-timeline-element-date {
        font-size: 21px;
        font-size: 1.4rem
    }
     .vertical-timeline.vertical-timeline--two-columns:before {
        background-color: #ccccca;
    }
}

`;
