document.addEventListener("DOMContentLoaded", function () {
  // Guard: make sure dependent files loaded correctly
  if (typeof listings === "undefined") {
    console.error("data.js not loaded correctly.");
    showToast("data.js not loaded correctly.");
    return;
  }

  if (
    typeof getSelectedListing === "undefined" ||
    typeof getListingById === "undefined" ||
    typeof addRecentlyViewed === "undefined" ||
    typeof toggleFavorite === "undefined" ||
    typeof isFavorite === "undefined" ||
    typeof isInCompare === "undefined" ||
    typeof addCompare === "undefined" ||
    typeof removeCompare === "undefined" ||
    typeof getFullReviewsForListing === "undefined" ||
    typeof addReview === "undefined"
  ) {
    console.error("storage.js not loaded correctly.");
    showToast("storage.js not loaded correctly.");
    return;
  }

  const selectedId = getSelectedListing();
  const listing = getListingById(selectedId) || listings[0];

  if (!listing) {
    console.error("No listing found.");
    showToast("No listing found.");
    return;
  }

  addRecentlyViewed(listing);
renderDetail(listing);
setupDetailEvents(listing);
setupHeaderActions();
});

function renderDetail(item) {
  renderMainInfo(item);
  renderGallery(item);
  renderTags(item);
  renderFeatures(item);
  renderAmenities(item);
  renderScores(item);
  renderNearby(item);
  renderCommute(item);
  renderReviews(item);
}

function renderMainInfo(item) {
  const mainImage = document.querySelector("#detailMainImage");
  const title = document.querySelector("#detailTitle");
  const subtitle = document.querySelector("#detailSubtitle");
  const price = document.querySelector("#detailPrice");
  const rating = document.querySelector("#detailRating");
  const school = document.querySelector("#detailSchool");
  const distance = document.querySelector("#detailDistance");
  const deposit = document.querySelector("#detailDeposit");
  const lease = document.querySelector("#detailLease");
  const roomType = document.querySelector("#detailRoomType");
  const availability = document.querySelector("#detailAvailability");
  const landlord = document.querySelector("#detailLandlord");
  const description = document.querySelector("#detailDescription");
  const verifiedBadge = document.querySelector("#detailVerifiedBadge");

  if (mainImage) {
    mainImage.src = item.image;
    mainImage.alt = item.title;
  }

  if (title) title.textContent = item.title;
  if (subtitle) {
    subtitle.textContent = `${item.location} • ${item.distanceKm} km to ${item.school}`;
  }
  if (price) price.textContent = `£${item.price}/mo`;
  if (rating) rating.textContent = item.rating;
  if (school) school.textContent = item.school;
  if (distance) distance.textContent = item.distance;
  if (deposit) deposit.textContent = item.deposit;
  if (lease) lease.textContent = item.lease;
  if (roomType) roomType.textContent = item.roomType;
  if (availability) availability.textContent = item.availability;
  if (landlord) landlord.textContent = item.landlord;
  if (description) description.textContent = item.description;

  if (verifiedBadge) {
    verifiedBadge.textContent = item.verified ? "Verified" : "Not Verified";
    verifiedBadge.style.display = "inline-flex";
  }

  updateFavoriteButton(item.id);
  updateCompareButton(item.id);
}

function renderGallery(item) {
  const thumbnailsContainer = document.querySelector("#detailThumbnails");
  const mainImage = document.querySelector("#detailMainImage");

  if (!thumbnailsContainer) return;

  const gallery =
    Array.isArray(item.gallery) && item.gallery.length ? item.gallery : [item.image];

  thumbnailsContainer.innerHTML = gallery
    .map(function (image, index) {
      return `
        <button
          class="thumbnail-btn ${index === 0 ? "active" : ""}"
          data-image="${image}"
          aria-label="View gallery image ${index + 1}"
        >
          <img src="${image}" alt="${item.title} thumbnail ${index + 1}" />
        </button>
      `;
    })
    .join("");

  const thumbnailButtons = thumbnailsContainer.querySelectorAll(".thumbnail-btn");

  thumbnailButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      thumbnailButtons.forEach(function (itemBtn) {
        itemBtn.classList.remove("active");
      });

      button.classList.add("active");

      if (mainImage) {
        mainImage.src = button.dataset.image;
        mainImage.alt = item.title;
      }
    });
  });
}

function renderTags(item) {
  const tagsContainer = document.querySelector("#detailTags");
  if (!tagsContainer) return;

  const tags = [];

  if (item.furnished) tags.push("Furnished");
  if (item.noDeposit) tags.push("No Deposit");
  if (item.utilitiesIncluded) tags.push("Utilities Included");
  if (item.petsAllowed) tags.push("Pets Allowed");
  if (item.verified) tags.push("Verified");
  if (item.roomType) tags.push(item.roomType);

  tagsContainer.innerHTML = tags
    .map(function (tag) {
      return `<span>${tag}</span>`;
    })
    .join("");
}

function renderFeatures(item) {
  const featuresList = document.querySelector("#detailFeaturesList");
  if (!featuresList) return;

  const features = Array.isArray(item.features) ? item.features : [];

  featuresList.innerHTML = features
    .map(function (feature) {
      return `
        <li>
          <i class="fa-solid fa-check"></i>
          <span>${feature}</span>
        </li>
      `;
    })
    .join("");
}

function renderAmenities(item) {
  const amenitiesContainer = document.querySelector("#detailAmenities");
  if (!amenitiesContainer) return;

  const amenityMap = [
    { key: "wifi", label: "Wi-Fi", icon: "fa-wifi" },
    { key: "laundry", label: "Laundry", icon: "fa-shirt" },
    { key: "gym", label: "Gym", icon: "fa-dumbbell" },
    { key: "parking", label: "Parking", icon: "fa-square-parking" },
    { key: "security", label: "Security", icon: "fa-shield-halved" },
    { key: "elevator", label: "Elevator", icon: "fa-elevator" }
  ];

  amenitiesContainer.innerHTML = amenityMap
    .map(function (amenity) {
      const available = item.amenities && item.amenities[amenity.key];

      return `
        <div class="amenity-item ${available ? "active" : "inactive"}">
          <i class="fa-solid ${amenity.icon}"></i>
          <span>${amenity.label}</span>
          <strong>${available ? "Yes" : "No"}</strong>
        </div>
      `;
    })
    .join("");
}

function renderScores(item) {
  const overall = document.querySelector("#scoreOverall");
  const safety = document.querySelector("#scoreSafety");
  const affordability = document.querySelector("#scoreAffordability");
  const experience = document.querySelector("#scoreExperience");

  if (overall && item.studentScore) overall.textContent = item.studentScore.overall;
  if (safety && item.studentScore) safety.textContent = item.studentScore.safety;
  if (affordability && item.studentScore) {
    affordability.textContent = item.studentScore.affordability;
  }
  if (experience && item.studentScore) {
    experience.textContent = item.studentScore.studentExperience;
  }
}

function renderNearby(item) {
  const nearbyList = document.querySelector("#detailNearbyList");
  if (!nearbyList) return;

  const nearby = Array.isArray(item.nearby) ? item.nearby : [];

  nearbyList.innerHTML = nearby
    .map(function (place) {
      return `
        <li>
          <i class="fa-solid fa-location-dot"></i>
          <span>${place}</span>
        </li>
      `;
    })
    .join("");
}

function renderCommute(item) {
  const walk = document.querySelector("#commuteWalk");
  const bus = document.querySelector("#commuteBus");
  const bike = document.querySelector("#commuteBike");

  if (walk && item.commute) walk.textContent = item.commute.walk;
  if (bus && item.commute) bus.textContent = item.commute.bus;
  if (bike && item.commute) bike.textContent = item.commute.bike;
}

function renderReviews(item) {
  const reviewsList = document.querySelector("#reviewsList");
  if (!reviewsList) return;

  const allReviews = getFullReviewsForListing(item.id);

  if (!allReviews.length) {
    reviewsList.innerHTML = `
      <div class="review-card">
        <p>No reviews yet. Be the first student to share feedback.</p>
      </div>
    `;
    return;
  }

  reviewsList.innerHTML = allReviews
    .map(function (review) {
      return `
        <article class="review-card">
          <div class="review-top">
            <div class="review-user">
              <img src="${review.avatar}" alt="${review.name}" />
              <div>
                <h4>${review.name}</h4>
                <p>${formatReviewTag(review.tag || "recommendation")}</p>
              </div>
            </div>
            <div class="review-score">
              <i class="fa-solid fa-star"></i>
              <span>${review.rating}</span>
            </div>
          </div>
          <p class="review-text">${review.text}</p>
        </article>
      `;
    })
    .join("");
}

function setupDetailEvents(item) {
  const favoriteBtn = document.querySelector("#detailFavoriteBtn");
  const compareBtn = document.querySelector("#detailCompareBtn");
  const reviewForm = document.querySelector("#reviewForm");

  if (favoriteBtn) {
    favoriteBtn.addEventListener("click", function () {
      const result = toggleFavorite(item);
      updateFavoriteButton(item.id);
      showToast(result.message);
    });
  }

  if (compareBtn) {
    compareBtn.addEventListener("click", function () {
      let result;

      if (isInCompare(item.id)) {
        result = removeCompare(item.id);
      } else {
        result = addCompare(item);
      }

      updateCompareButton(item.id);
      showToast(result.message);
    });
  }

  if (reviewForm) {
    reviewForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const nameInput = document.querySelector("#reviewName");
      const ratingInput = document.querySelector("#reviewRating");
      const tagInput = document.querySelector("#reviewTag");
      const textInput = document.querySelector("#reviewText");

      const name = nameInput ? nameInput.value.trim() : "";
      const rating = ratingInput ? ratingInput.value : "5";
      const tag = tagInput ? tagInput.value : "recommendation";
      const reviewText = textInput ? textInput.value.trim() : "";

      if (!name) {
        showToast("Please enter your name.");
        if (nameInput) nameInput.focus();
        return;
      }

      if (!reviewText) {
        showToast("Please enter your review comment.");
        if (textInput) textInput.focus();
        return;
      }

      if (reviewText.length < 10) {
        showToast("Please write at least 10 characters.");
        if (textInput) textInput.focus();
        return;
      }

      const result = addReview(item.id, {
        name: name,
        rating: rating,
        tag: tag,
        text: reviewText
      });

      if (result.ok) {
        renderReviews(item);
        reviewForm.reset();
        if (textInput) textInput.blur();
        showToast("Review submitted successfully.");
      } else {
        showToast("Unable to save review.");
      }
    });
  }
}

function updateFavoriteButton(id) {
  const favoriteBtn = document.querySelector("#detailFavoriteBtn");
  if (!favoriteBtn) return;

  if (isFavorite(id)) {
    favoriteBtn.innerHTML = `<i class="fa-solid fa-heart"></i> Saved`;
  } else {
    favoriteBtn.innerHTML = `<i class="fa-regular fa-heart"></i> Save`;
  }
}

function updateCompareButton(id) {
  const compareBtn = document.querySelector("#detailCompareBtn");
  if (!compareBtn) return;

  if (isInCompare(id)) {
    compareBtn.textContent = "Compared";
  } else {
    compareBtn.textContent = "Compare";
  }
}

function formatReviewTag(tag) {
  if (tag === "avoid-risk") {
    return "Avoid Risk";
  }

  return "Recommendation";
}

function showToast(message) {
  let toast = document.querySelector(".toast-message");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast-message";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(function () {
    toast.classList.remove("show");
  }, 2200);
}


function setupHeaderActions() {
  const favoritesBtn = document.querySelector("#headerFavoritesBtn");
  const notificationsBtn = document.querySelector("#headerNotificationsBtn");

  if (favoritesBtn) {
    favoritesBtn.addEventListener("click", function () {
      const profileUrl = new URL("./profile.html", window.location.href).href;
      window.location.assign(profileUrl);
    });
  }

  if (notificationsBtn) {
    notificationsBtn.addEventListener("click", function () {
      showToast("Notifications feature coming soon.");
    });
  }
}


function setupHeaderSearch() {
  const headerSearchForm = document.querySelector("#headerSearchForm");
  const headerSearchInput = document.querySelector("#headerSearchInput");

  if (!headerSearchForm || !headerSearchInput) return;

  headerSearchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const keyword = headerSearchInput.value.trim();

    if (!keyword) {
      showToast("Please enter a search term.");
      headerSearchInput.focus();
      return;
    }

    const targetUrl = new URL("./index.html", window.location.href);
    targetUrl.searchParams.set("search", keyword);
    window.location.assign(targetUrl.href);
  });
}