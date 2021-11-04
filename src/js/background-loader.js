// eslint-disable-next-line func-names
function backgroundLoader() {
  document.addEventListener("DOMContentLoaded", () => {
    const lazyBackground = [].slice.call(document.querySelectorAll("body"));

    if ("IntersectionObserver" in window) {
      // eslint-disable-next-line func-names
      const lazyBackgroundObserver = new IntersectionObserver(
        // eslint-disable-next-line no-unused-vars
        (entries, observer) => {
          // eslint-disable-next-line func-names
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              lazyBackgroundObserver.unobserve(entry.target);
            }
          });
        }
      );

      // eslint-disable-next-line func-names
      lazyBackground.forEach((background) => {
        lazyBackgroundObserver.observe(background);
      });
    }
  });
}

export default backgroundLoader;
