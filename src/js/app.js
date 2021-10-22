/* eslint-disable no-unused-vars */

// Styles related to the app itself
import "../css/styles.css";

/* Web Component */
import "../components/task-list/task-list";

// eslint-disable-next-line func-names
document.addEventListener("DOMContentLoaded", () => {
  const lazyBackground = [].slice.call(
    document.querySelectorAll("body")
  );

  if ("IntersectionObserver" in window) {
    // eslint-disable-next-line func-names
    const lazyBackgroundObserver = new IntersectionObserver((
      entries,
      observer
    ) => {
      // eslint-disable-next-line func-names
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          lazyBackgroundObserver.unobserve(entry.target);
        }
      });
    });

    // eslint-disable-next-line func-names
    lazyBackground.forEach((background) => {
      lazyBackgroundObserver.observe(background);
    });
  }
});
