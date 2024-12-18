export class RpgMeApp {
  constructor() {
    this.init();
  }

  init() {
    // Initialize elements
    this.character = document.getElementById("character");
    this.seedInput = document.getElementById("seed");
    this.accessoriesInput = document.getElementById("accessories");
    this.faceInput = document.getElementById("face");
    this.faceitemInput = document.getElementById("faceitem");
    this.hairInput = document.getElementById("hair");
    this.pantsInput = document.getElementById("pants");
    this.shirtInput = document.getElementById("shirt");
    this.skinInput = document.getElementById("skin");
    this.hatcolorInput = document.getElementById("hatcolor");
    this.hatInput = document.getElementById("hat");
    this.fireInput = document.getElementById("fire");
    this.shareBtn = document.getElementById("share-btn");
    this.copyBtn = document.getElementById("copy-btn");
    this.shareLink = document.getElementById("share-link");

    // Attach event listeners for inputs
    const inputs = [
      this.seedInput,
      this.accessoriesInput,
      this.faceInput,
      this.faceitemInput,
      this.hairInput,
      this.pantsInput,
      this.shirtInput,
      this.skinInput,
      this.hatcolorInput,
      this.hatInput,
    ];
    inputs.forEach((input) => input?.addEventListener("input", () => this.updateCharacter()));

    this.fireInput?.addEventListener("change", () => this.updateCharacter());
    this.shareBtn?.addEventListener("click", () => this.generateShareLink());
    this.copyBtn?.addEventListener("click", () => this.copyToClipboard());

    // Load state from URL if available
    this.loadFromURL();
  }

  updateCharacter() {
    const validHats = [
      "none",
      "bunny",
      "coffee",
      "construction",
      "cowboy",
      "education",
      "knight",
      "ninja",
      "party",
      "pirate",
      "watermelon",
    ];

    // Update character properties
    this.character.seed = this.seedInput?.value || "1234567890";
    this.character.accessories = this.accessoriesInput?.value || "0";
    this.character.face = this.faceInput?.value || "0";
    this.character.faceitem = this.faceitemInput?.value || "0";
    this.character.hair = this.hairInput?.value || "0";
    this.character.pants = this.pantsInput?.value || "0";
    this.character.shirt = this.shirtInput?.value || "0";
    this.character.skin = this.skinInput?.value || "0";
    this.character.hatcolor = this.hatcolorInput?.value || "0";

    // Validate and update hat
    const enteredHat = this.hatInput?.value.toLowerCase();
    this.character.hat = validHats.includes(enteredHat) ? enteredHat : "none";
    this.character.fire = this.fireInput?.checked || false;

    // Update URL state
    this.updateURL();
  }

  generateShareLink() {
    const params = new URLSearchParams({
      seed: this.character.seed,
      accessories: this.character.accessories,
      face: this.character.face,
      faceitem: this.character.faceitem,
      hair: this.character.hair,
      pants: this.character.pants,
      shirt: this.character.shirt,
      skin: this.character.skin,
      hatcolor: this.character.hatcolor,
      hat: this.character.hat,
      fire: this.character.fire ? "1" : "0",
    });

    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    this.shareLink.value = url;
    window.history.replaceState(null, "", url);
  }

  copyToClipboard() {
    const link = this.shareLink.value;

    if (link) {
      navigator.clipboard
        .writeText(link)
        .then(() => alert("Link copied to clipboard!"))
        .catch((err) => console.error("Failed to copy text: ", err));
    } else {
      alert("No link to copy! Generate a share link first.");
    }
  }

  loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    const validHats = [
      "none",
      "bunny",
      "coffee",
      "construction",
      "cowboy",
      "education",
      "knight",
      "ninja",
      "party",
      "pirate",
      "watermelon",
    ];

    this.seedInput.value = params.get("seed") || "1234567890";
    this.accessoriesInput.value = params.get("accessories") || "0";
    this.faceInput.value = params.get("face") || "0";
    this.faceitemInput.value = params.get("faceitem") || "0";
    this.hairInput.value = params.get("hair") || "0";
    this.pantsInput.value = params.get("pants") || "0";
    this.shirtInput.value = params.get("shirt") || "0";
    this.skinInput.value = params.get("skin") || "0";
    this.hatcolorInput.value = params.get("hatcolor") || "0";

    const hatFromURL = params.get("hat")?.toLowerCase() || "none";
    this.hatInput.value = validHats.includes(hatFromURL) ? hatFromURL : "none";

    this.fireInput.checked = params.get("fire") === "1";

    this.updateCharacter();
  }

  updateURL() {
    const params = new URLSearchParams({
      seed: this.character.seed,
      accessories: this.character.accessories,
      face: this.character.face,
      faceitem: this.character.faceitem,
      hair: this.character.hair,
      pants: this.character.pants,
      shirt: this.character.shirt,
      skin: this.character.skin,
      hatcolor: this.character.hatcolor,
      hat: this.character.hat,
      fire: this.character.fire ? "1" : "0",
    });

    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", url);
  }
}

// Initialize the app
document.addEventListener("DOMContentLoaded", () => new RpgMeApp());
