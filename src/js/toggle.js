function init() {
  const statusText = document.getElementById("status");
  const options = document.getElementById("options");
  const toggleButton = document.getElementById("toggle");

  chrome.storage.sync.get(["isEnabled"]).then((result) => {
    statusText.textContent = result.isEnabled ? "Enabled" : "Disabled";
    if (!result.isEnabled) statusText.classList.add("disabled");
    else options.classList.add("hide");
  });

  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    try {
      const res = await chrome.tabs.sendMessage(tabs[0].id, {
        msg: "get-session-timer",
      });

      const end = new Date(res.end);
      if (Date.now() - end < 0) {
        toggleButton.classList.add("hide");
        document.getElementById("timer").classList.remove("hide");
        document.getElementById("mins").textContent = Math.round(
          (end - Date.now()) / 60000
        );
      } else toggleButton.classList.remove("hide");
    } catch (error) {
      console.log("Extension only works on the YouTube website!");
    }
  });

  document.getElementById("toggle").addEventListener("click", toggle);
}

function toggle() {
  const statusText = document.getElementById("status");
  const options = document.getElementById("options");
  const duration = document.getElementById("session-duration").value;
  const toggleButton = document.getElementById("toggle");

  if (statusText.textContent === "Enabled") {
    statusText.textContent = "Disabled";
    statusText.classList.add("disabled");
    options.classList.remove("hide");
  } else {
    statusText.textContent = "Enabled";
    statusText.classList.remove("disabled");
    options.classList.add("hide");
  }

  if (duration) {
    toggleButton.classList.add("hide");
  }

  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    try {
      await chrome.tabs.sendMessage(tabs[0].id, {
        msg: "toggle-focus-mode",
        duration: duration,
      });
    } catch (error) {
      console.log("Extension only works on the YouTube website!");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => init());
