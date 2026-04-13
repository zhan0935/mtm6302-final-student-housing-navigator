// =========================
// Home page logic
// =========================

let listingContainer;
let searchForm;
let schoolSearchInput;
let radiusSelect;
let sortSelect;
let filterChips;

let featuredMainImage;
let featuredMainTitle;
let featuredMainSubtitle;
let featuredMainPrice;

let activeFilter = "all";
let filteredListings = [];

// =========================
// Simulated async loading
// =========================
async function loadListings() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (typeof listings !== "undefined" && Array.isArray(listings)) {
        resolve(listings);
      } else {
        reject(new Error("Listings data is unavailable."));
      }
    }, 300);
  });
}

// =========================
// Init
// =========================
document.addEventListener("DOMContentLoaded", async function () {
  // Get DOM elements only after page is loaded
  listingContainer = document.querySelector("#listingContainer");
  searchForm = document.querySelector("#searchForm");
  schoolSearchInput = document.querySelector("#schoolSearch");
  radiusSelect = document.querySelector("#radiusSelect");
  sortSelect = document.querySelector("#sortSelect");
  filterChips = document.querySelectorAll(".filter-chip");

  featuredMainImage = document.querySelector("#featuredMainImage");
  featuredMainTitle = document.querySelector("#featuredMainTitle");
  featuredMainSubtitle = document.querySelector("#featuredMainSubtitle");
  featuredMainPrice = document.querySelector("#featuredMainPrice");

  // Guards
  if (typeof listings === "undefined" || !Array.isArray(listings)) {
    console.error("data.js not loaded correctly.");
    showToast("data.js not loaded correctly.");
    return;
  }

  if (
    typeof getListingById === "undefined" ||
    typeof setSelectedListing === "undefined" ||
    typeof addRecentlyViewed === "undefined" ||
    typeof toggleFavorite === "undefined" ||
    typeof isFavorite === "undefined" ||
    typeof isInCompare === "undefined" ||
    typeof addCompare === "undefined" ||
    typeof removeCompare === "undefined"
  ) {
    console.error("storage.js not loaded correctly.");
    showToast("storage.js not loaded correctly.");
    return;
  }

  try {
    showToast("Loading residences...");
    const loadedListings = await loadListings();
    filteredListings = [...loadedListings];

    setupEvents();
    setupHeaderActions();
    setupHeaderSearch();

    const urlParams = new URLSearchParams(window.location.search);
    const presetSearch = urlParams.get("search");

    if (presetSearch && schoolSearchInput) {
      schoolSearchInput.value = presetSearch;
    }

    renderHomePage();

    if (presetSearch) {
      applyFilters();
    }

    setTimeout(function () {
      showToast(`${filteredListings.length} residences loaded.`);
    }, 350);
  } catch (error) {
    console.error(error);
    showToast("Unable to load residences.");
  }
});

// =========================
// Events
// =========================
function setupEvents() {
  if (searchForm) {
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      applyFilters();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", function () {
      applyFilters();
    });
  }

  if (filterChips && filterChips.length) {
    filterChips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        filterChips.forEach(function (item) {
          item.classList.remove("active");
        });

        chip.classList.add("active");
        activeFilter = chip.dataset.filter;
        applyFilters();
      });
    });
  }
}

// =========================
// Filter logic
// =========================
function applyFilters() {
  const schoolKeyword = schoolSearchInput
    ? schoolSearchInput.value.trim().toLowerCase()
    : "";

  const radiusValue = radiusSelect ? Number(radiusSelect.value) : 10;
  const sortValue = sortSelect ? sortSelect.value : "default";

  filteredListings = listings.filter(function (item) {
    const matchSchool =
      schoolKeyword === "" ||
      item.school.toLowerCase().includes(schoolKeyword) ||
      item.location.toLowerCase().includes(schoolKeyword) ||
      item.title.toLowerCase().includes(schoolKeyword);

    const matchRadius = item.distanceKm <= radiusValue;

    let matchChip = true;

    if (activeFilter !== "all") {
      matchChip = item[activeFilter] === true;
    }

    return matchSchool && matchRadius && matchChip;
  });

  // Sort
  if (sortValue === "priceLow") {
    filteredListings.sort(function (a, b) {
      return a.price - b.price;
    });
  } else if (sortValue === "priceHigh") {
    filteredListings.sort(function (a, b) {
      return b.price - a.price;
    });
  } else if (sortValue === "distanceNear") {
    filteredListings.sort(function (a, b) {
      return a.distanceKm - b.distanceKm;
    });
  } else if (sortValue === "ratingHigh") {
    filteredListings.sort(function (a, b) {
      return b.rating - a.rating;
    });
  }

  renderHomePage();

  if (filteredListings.length === 0) {
    showToast("No residences found. Try another search.");
  } else {
    showToast(`${filteredListings.length} residence(s) found.`);
  }
}

// =========================
// Render
// =========================
function renderHomePage() {
  renderFeaturedCard();
  renderListingCards();
}

function renderFeaturedCard() {
  const featuredItem = filteredListings[0] || listings[0];

  if (!featuredItem) return;

  if (featuredMainImage) {
    featuredMainImage.src = featuredItem.image;
    featuredMainImage.alt = featuredItem.title;
  }

  if (featuredMainTitle) {
    featuredMainTitle.textContent = featuredItem.title;
  }

  if (featuredMainSubtitle) {
    featuredMainSubtitle.textContent = `${featuredItem.distanceKm} km to ${featuredItem.school}`;
  }

  if (featuredMainPrice) {
    featuredMainPrice.textContent = `£${featuredItem.price}/mo`;
  }

  const detailsBtn = document.querySelector(".details-btn");
  const saveBtn = document.querySelector(".save-btn");

  if (detailsBtn) {
    detailsBtn.dataset.id = featuredItem.id;
    detailsBtn.onclick = function () {
      openDetails(featuredItem.id);
    };
  }

  if (saveBtn) {
    updateSaveButton(saveBtn, featuredItem.id);
    saveBtn.onclick = function () {
      handleSave(featuredItem.id, saveBtn);
    };
  }
}

function renderListingCards() {
  if (!listingContainer) return;

  if (filteredListings.length === 0) {
    listingContainer.innerHTML = `
      <article class="listing-card">
        <div class="listing-card-content">
          <div>
            <h4>No results found</h4>
            <p>Try another school name, a larger radius, or a different filter.</p>
          </div>
        </div>
      </article>
    `;
    return;
  }

  listingContainer.innerHTML = filteredListings
    .slice(0, 6)
    .map(function (item) {
      return `
        <article class="listing-card" data-id="${item.id}">
          <div class="listing-card-image">
            <img src="${item.image}" alt="${item.title}" />
          </div>

          <div class="listing-card-content">
            <div class="listing-card-top">
              <div>
                <h4>${item.title}</h4>
                <p>${item.location} • ${item.distance}</p>
              </div>
              <p class="listing-price">£${item.price}/mo</p>
            </div>

            <div class="listing-tags">
              ${item.furnished ? `<span>Furnished</span>` : ""}
              ${item.noDeposit ? `<span>No Deposit</span>` : ""}
              ${item.utilitiesIncluded ? `<span>Utilities Included</span>` : ""}
              ${item.petsAllowed ? `<span>Pets Allowed</span>` : ""}
              ${item.verified ? `<span>Verified</span>` : ""}
            </div>

            <div class="listing-card-actions">
              <button class="small-btn js-detail-btn" data-id="${item.id}">
                View Details
              </button>
              <button class="small-btn alt js-save-btn" data-id="${item.id}">
                ${isFavorite(item.id) ? "Saved" : "Save"}
              </button>
              <button class="small-btn alt js-compare-btn" data-id="${item.id}">
                ${isInCompare(item.id) ? "Compared" : "Compare"}
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  bindListingCardEvents();
}

// =========================
// Card events
// =========================
function bindListingCardEvents() {
  const detailButtons = document.querySelectorAll(".js-detail-btn");
  const saveButtons = document.querySelectorAll(".js-save-btn");
  const compareButtons = document.querySelectorAll(".js-compare-btn");
  const listingCards = document.querySelectorAll(".listing-card[data-id]");

  detailButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      const id = Number(button.dataset.id);
      openDetails(id);
    });
  });

  saveButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      const id = Number(button.dataset.id);
      handleSave(id, button);
    });
  });

  compareButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      const id = Number(button.dataset.id);
      handleCompare(id);
    });
  });

  listingCards.forEach(function (card) {
    card.addEventListener("click", function (event) {
      if (
        event.target.closest(".js-detail-btn") ||
        event.target.closest(".js-save-btn") ||
        event.target.closest(".js-compare-btn")
      ) {
        return;
      }

      const id = Number(card.dataset.id);
      setFeaturedCardById(id);
    });
  });
}

// =========================
// Actions
// =========================
function openDetails(id) {
  setSelectedListing(id);

  const item = getListingById(id);
  if (item) {
    addRecentlyViewed(item);
  }

  const detailUrl = new URL("./detail.html", window.location.href).href;
  window.location.assign(detailUrl);
}

function handleSave(id, button) {
  const item = getListingById(id);
  if (!item) return;

  const result = toggleFavorite(item);

  if (button) {
    button.textContent = isFavorite(id) ? "Saved" : "Save";
  }

  const featuredSaveBtn = document.querySelector(".save-btn");
  if (featuredSaveBtn) {
    const selectedId = Number(document.querySelector(".details-btn")?.dataset.id);
    if (selectedId === id) {
      updateSaveButton(featuredSaveBtn, id);
    }
  }

  renderListingCards();
  showToast(result.message);
}

function handleCompare(id) {
  const item = getListingById(id);
  if (!item) return;

  let result;

  if (isInCompare(id)) {
    result = removeCompare(id);
  } else {
    result = addCompare(item);
  }

  renderListingCards();
  showToast(result.message);
}

// =========================
// Featured card switching
// =========================
function setFeaturedCardById(id) {
  const item = getListingById(id);
  if (!item) return;

  if (featuredMainImage) {
    featuredMainImage.src = item.image;
    featuredMainImage.alt = item.title;
  }

  if (featuredMainTitle) {
    featuredMainTitle.textContent = item.title;
  }

  if (featuredMainSubtitle) {
    featuredMainSubtitle.textContent = `${item.distanceKm} km to ${item.school}`;
  }

  if (featuredMainPrice) {
    featuredMainPrice.textContent = `£${item.price}/mo`;
  }

  const detailsBtn = document.querySelector(".details-btn");
  const saveBtn = document.querySelector(".save-btn");

  if (detailsBtn) {
    detailsBtn.dataset.id = item.id;
    detailsBtn.onclick = function () {
      openDetails(item.id);
    };
  }

  if (saveBtn) {
    updateSaveButton(saveBtn, item.id);
    saveBtn.onclick = function () {
      handleSave(item.id, saveBtn);
    };
  }
}

function updateSaveButton(button, id) {
  if (!button) return;

  if (isFavorite(id)) {
    button.innerHTML = `<i class="fa-solid fa-heart"></i> Saved`;
  } else {
    button.innerHTML = `<i class="fa-regular fa-heart"></i> Save`;
  }
}

// =========================
// Header actions
// =========================
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

// =========================
// Toast message
// =========================
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