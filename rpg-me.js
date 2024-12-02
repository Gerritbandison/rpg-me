export class RpgMeApp {
  constructor() {
    this.init();
  }

  init() {
    // Elements
    this.character = document.getElementById("character");
    this.seedInput = document.getElementById("seed");
    this.accessoriesInput = document.getElementById("accessories");
    this.baseInput = document.getElementById("base");
    this.hatInput = document.getElementById("hat");
    this.fireInput = document.getElementById("fire");
    this.shareBtn = document.getElementById("share-btn");
    this.copyBtn = document.getElementById("copy-btn");
    this.shareLink = document.getElementById("share-link");

    // Event Listeners
    [this.seedInput, this.accessoriesInput, this.baseInput, this.hatInput, this.fireInput].forEach((input) =>
      input.addEventListener("input", () => this.updateCharacter())
    );
    this.shareBtn.addEventListener("click", () => this.generateShareLink());
    this.copyBtn.addEventListener("click", () => this.copyToClipboard());

    // Initialize state from URL if available
    this.loadFromURL();
  }

  updateCharacter() {
    // Update character properties dynamically
    this.character.seed = this.seedInput.value || "1234567890";
    this.character.accessories = this.accessoriesInput.value || "0";
    this.character.base = this.baseInput.value || "0";
    this.character.hat = this.hatInput.value || "none";
    this.character.fire = this.fireInput.value === "true";

    // Update URL state
    this.updateURL();
  }

  generateShareLink() {
    const params = new URLSearchParams();
    params.set("seed", this.seedInput.value || "1234567890");
    params.set("accessories", this.accessoriesInput.value || "0");
    params.set("base", this.baseInput.value || "0");
    params.set("hat", this.hatInput.value || "none");
    params.set("fire", this.fireInput.value === "true");

    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    this.shareLink.value = url;
    window.history.replaceState(null, "", url);
  }

  copyToClipboard() {
    const link = this.shareLink.value;

    if (link) {
      navigator.clipboard.writeText(link).then(() => {
        alert("Link copied to clipboard!");
      }).catch((err) => {
        console.error("Failed to copy text: ", err);
      });
    } else {
      alert("No link to copy! Generate a share link first.");
    }
  }

  loadFromURL() {
    const params = new URLSearchParams(window.location.search);

    this.seedInput.value = params.get("seed") || "1234567890";
    this.accessoriesInput.value = params.get("accessories") || "0";
    this.baseInput.value = params.get("base") || "0";
    this.hatInput.value = params.get("hat") || "none";
    this.fireInput.value = params.get("fire") === "true";

    this.updateCharacter();
  }

  updateURL() {
    const params = new URLSearchParams();
    params.set("seed", this.seedInput.value || "1234567890");
    params.set("accessories", this.accessoriesInput.value || "0");
    params.set("base", this.baseInput.value || "0");
    params.set("hat", this.hatInput.value || "none");
    params.set("fire", this.fireInput.value === "true");

    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", url);
  }
}

// Initialize the app
document.addEventListener("DOMContentLoaded", () => new RpgMeApp());
