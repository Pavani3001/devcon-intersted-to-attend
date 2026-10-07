const posterImagePath = "ChatGPT Image Oct 7, 2026, 02_05_58 PM.png";
const canvas = document.querySelector("#poster-canvas");
const context = canvas.getContext("2d");
const photoInput = document.querySelector("#photo-input");
const nameInput = document.querySelector("#name-input");
const uploadZone = document.querySelector(".upload-zone");
const uploadTitle = document.querySelector("#upload-title");
const downloadButton = document.querySelector("#download-button");
const previewStatus = document.querySelector("#preview-status");
const captionText = document.querySelector("#caption-text");
const copyCaptionButton = document.querySelector("#copy-caption-button");
const captionTabs = document.querySelectorAll(".caption-tab");

const poster = new Image();
let profilePhoto = null;
let selectedCaption = "linkedin";
const photoCircle = { centerX: 723, centerY: 615, diameter: 308 };

const captions = {
  linkedin: `Excited to share to attend DEVCON 8 India 🇮🇳🚀

Looking forward to connecting with developers, builders, and tech enthusiasts, learning from the community, and exploring new ideas around technology and innovation.

📍 Jio World Centre, BKC, Mumbai

📅 3–6 November 2026

Build. Connect. Innovate.

#DEVCON8 #DEVCONIndia #TechCommunity #Developers #Innovation #Mumbai`,
  x: `Excited for DEVCON 8 India 🚀🇮🇳

Looking forward to meeting builders, developers & tech enthusiasts, learning, connecting, and exploring new ideas!

📍 Mumbai | Nov 3–6, 2026

Build. Connect. Innovate.

#DEVCON8 #DEVCONIndia #TechCommunity #Developers`,
};

function renderCaption() {
  captionText.textContent = captions[selectedCaption];
}

function drawCover(image, x, y, width, height) {
  const scale = Math.max(width / image.width, height / image.height);
  const sourceWidth = width / scale;
  const sourceHeight = height / scale;
  const sourceX = (image.width - sourceWidth) / 2;
  const sourceY = (image.height - sourceHeight) / 2;
  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
}

function renderPoster() {
  if (!poster.complete) return;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(poster, 0, 0, canvas.width, canvas.height);

  if (profilePhoto) {
    const photoX = photoCircle.centerX - photoCircle.diameter / 2;
    const photoY = photoCircle.centerY - photoCircle.diameter / 2;
    context.save();
    context.beginPath();
    context.arc(
      photoCircle.centerX,
      photoCircle.centerY,
      photoCircle.diameter / 2,
      0,
      Math.PI * 2,
    );
    context.clip();
    drawCover(profilePhoto, photoX, photoY, photoCircle.diameter, photoCircle.diameter);
    context.restore();
  }

  const name = nameInput.value.trim() || "Name";
  context.save();
  // Clear the template's placeholder text while keeping its neon border visible.
  context.beginPath();
  context.moveTo(585, 798);
  context.lineTo(860, 798);
  context.lineTo(883, 832);
  context.lineTo(857, 866);
  context.lineTo(588, 866);
  context.lineTo(562, 832);
  context.closePath();
  context.fillStyle = "#09285e";
  context.fill();
  context.fillStyle = "#f7f7ff";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = "italic 48px 'Trebuchet MS', sans-serif";
  context.fillText(name, 722, 834, 320);
  context.restore();
}

function loadPhoto(file) {
  if (!file || !file.type.startsWith("image/")) return;
  const reader = new FileReader();
  reader.onload = () => {
    profilePhoto = new Image();
    profilePhoto.onload = () => {
      uploadTitle.textContent = file.name;
      previewStatus.textContent = "UPDATED";
      renderPoster();
    };
    profilePhoto.src = reader.result;
  };
  reader.readAsDataURL(file);
}

poster.onload = () => {
  canvas.width = poster.naturalWidth;
  canvas.height = poster.naturalHeight;
  renderPoster();
};
poster.src = posterImagePath;

nameInput.addEventListener("input", renderPoster);
photoInput.addEventListener("change", (event) => loadPhoto(event.target.files[0]));
uploadZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  uploadZone.classList.add("dragging");
});
uploadZone.addEventListener("dragleave", () => uploadZone.classList.remove("dragging"));
uploadZone.addEventListener("drop", (event) => {
  event.preventDefault();
  uploadZone.classList.remove("dragging");
  loadPhoto(event.dataTransfer.files[0]);
});
downloadButton.addEventListener("click", () => {
  const link = document.createElement("a");
  const fileName = nameInput.value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  link.download = `${fileName || "devcon8-poster"}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
});
captionTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    selectedCaption = tab.dataset.caption;
    captionTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });
    renderCaption();
  });
});
copyCaptionButton.addEventListener("click", async () => {
  await navigator.clipboard.writeText(captions[selectedCaption]);
  copyCaptionButton.textContent = "Copied";
  window.setTimeout(() => { copyCaptionButton.textContent = "Copy"; }, 1500);
});
renderCaption();
