function modifyPage() {
  const elems = document.querySelectorAll(
    "#contents, #chips, #related, .ytd-reel-shelf-renderer"
  );

  if (enabled) elems.forEach((elem) => elem.classList.remove("show"));
  if (!enabled) elems.forEach((elem) => elem.classList.add("show"));
}

function addLocationObserver(callback) {
  const config = { attributes: false, childList: true, subtree: true };
  const observer = new MutationObserver(callback);
  observer.observe(document.body, config);
}

function observer() {
  const elems = document.querySelectorAll(
    "#contents, #chips, #related, .ytd-reel-shelf-renderer"
  );

  if (!enabled) {
    elems.forEach((elem) => elem.classList.add("show"));
    return;
  }

  if (
    window.location.href.includes("youtube.com/@") ||
    window.location.href.includes("youtube.com/results?")
  ) {
    elems.forEach((elem) => {
      elem.classList.add("show");
    });
    return;
  } else if (window.location.href.includes("youtube.com")) {
    elems.forEach((elem) => {
      elem.classList.remove("show");
    });
  }
}

chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
  if (data.msg === "toggle-focus-mode") {
    enabled = !enabled;
    chrome.storage.sync.set({ isEnabled: enabled });
    modifyPage();
  }
});

let enabled;
chrome.storage.sync.get(["isEnabled"]).then((result) => {
  enabled = result.isEnabled;
});

chrome.storage.sync.set({ isEnabled: enabled });

addLocationObserver(observer);
observer();
