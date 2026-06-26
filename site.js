(function () {
  const config = window.REALO_KIDS_CONFIG || {};
  const playStoreUrl = config.playStoreUrl || "#";

  document.querySelectorAll("[data-play-store-link]").forEach((link) => {
    link.href = playStoreUrl;
  });

  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  const grid = document.querySelector("[data-screenshot-grid]");
  if (!grid) return;

  const screenshots = config.screenshots || [];
  screenshots.forEach((shot, index) => {
    const figure = document.createElement("figure");
    figure.className = "screenshot-card";

    const frame = document.createElement("div");
    frame.className = "screenshot-frame";

    const img = document.createElement("img");
    img.src = shot.src;
    img.alt = shot.alt || `Realo Kids screenshot ${index + 1}`;
    img.loading = "lazy";
    img.addEventListener("error", () => {
      frame.classList.add("is-placeholder");
      img.remove();
      const placeholder = document.createElement("div");
      placeholder.className = "screenshot-placeholder";
      placeholder.innerHTML = `<strong>${shot.label || `Screenshot ${index + 1}`}</strong><span>${shot.src}</span>`;
      frame.appendChild(placeholder);
    });

    const caption = document.createElement("figcaption");
    const captionTitle = document.createElement("strong");
    captionTitle.textContent = shot.label || `Screenshot ${index + 1}`;
    caption.appendChild(captionTitle);

    if (shot.description) {
      const captionDescription = document.createElement("span");
      captionDescription.textContent = shot.description;
      caption.appendChild(captionDescription);
    }

    frame.appendChild(img);
    figure.appendChild(frame);
    figure.appendChild(caption);
    grid.appendChild(figure);
  });
})();
