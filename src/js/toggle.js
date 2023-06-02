function setStatusText() {
  const statusText = document.getElementById("status");

  chrome.storage.sync.get(["isEnabled"]).then((result) => {
    statusText.textContent = result.isEnabled ? "Enabled" : "Disabled";
    if (!result.isEnabled) statusText.classList.add("disabled");
  });

  document.getElementById("toggle").addEventListener("click", toggle);
}

function toggle() {
  const statusText = document.getElementById("status");

  if (statusText.textContent === "Enabled") {
    statusText.textContent = "Disabled";
    statusText.classList.add("disabled");
  } else {
    statusText.textContent = "Enabled";
    statusText.classList.remove("disabled");
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { msg: "toggle-focus-mode" });
  });
}

document.addEventListener("DOMContentLoaded", () => setStatusText());
