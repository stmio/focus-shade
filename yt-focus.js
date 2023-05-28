function addLocationObserver(callback) {
  const config = { attributes: false, childList: true, subtree: true };
  const observer = new MutationObserver(callback);
  observer.observe(document.body, config);
}

function observerCallback() {
  const grids = document.querySelectorAll(
    "#contents, #chips, #related, .ytd-reel-shelf-renderer"
  );

  if (
    window.location.href.includes("youtube.com/@") ||
    window.location.href.includes("youtube.com/results?")
  ) {
    grids.forEach((grid) => {
      grid.classList.add("show");
    });
    return;
  } else if (window.location.href.includes("youtube.com")) {
    grids.forEach((grid) => {
      grid.classList.remove("show");
    });
  }
}

addLocationObserver(observerCallback);
observerCallback();
