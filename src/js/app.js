/* eslint-disable no-unused-vars */

// Styles related to the app itself
import styles from "../css/styles.css";

/* Web Component */
import TaskList from "../components/task-list/task-list";

// eslint-disable-next-line func-names
document.addEventListener("DOMContentLoaded", function () {
  const lazyBackground = [].slice.call(
    document.querySelectorAll("body")
  );

  if ("IntersectionObserver" in window) {
    // eslint-disable-next-line func-names
    const lazyBackgroundObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      // eslint-disable-next-line func-names
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          lazyBackgroundObserver.unobserve(entry.target);
        }
      });
    });

    // eslint-disable-next-line func-names
    lazyBackground.forEach(function (background) {
      lazyBackgroundObserver.observe(background);
    });
  }
});
