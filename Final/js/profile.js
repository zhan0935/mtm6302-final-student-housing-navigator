setupHeaderActions();
document.addEventListener("DOMContentLoaded", function () {
  renderDashboard();
  setupDashboardEvents();
  setupHeaderSearch();
});

function setupDashboardEvents() {
  const clearFavoritesBtn = document.querySelector("#clearFavoritesBtn");
  const clearRecentBtn = document.querySelector("#clearRecentBtn");
  const clearCompareBtn = document.querySelector("#clearCompareDashboardBtn");

  if (clearFavoritesBtn) {
    clearFavoritesBtn.addEventListener("click", function () {
      const favorites = getFavorites();

      if (!favorites.length) {
        showToast("Favorites list is already empty.");
        return;
      }

      clearFavorites();
      renderDashboard();
      showToast("Favorites cleared.");
    });
  }

  if (clearRecentBtn) {
    clearRecentBtn.addEventListener("click", function () {
      const recent = getRecentlyViewed();

      if (!recent.length) {
        showToast("Recently viewed list is already empty.");
        return;
      }

      clearRecentlyViewed();
      renderDashboard();
      showToast("Recently viewed cleared.");
    });
  }

  if (clearCompareBtn) {
    clearCompareBtn.addEventListener("click", function () {
      const compareItems = getCompare();

      if (!compareItems.length) {
        showToast("Compare list is already empty.");
        return;
      }

      clearCompare();
      renderDashboard();
      showToast("Compare list cleared.");
    });
  }
}

function renderDashboard() {
  renderStats();
  renderFavorites();
  renderRecentlyViewed();
  renderCompareMini();
  renderActivitySummary();
}

function renderStats() {
  const statsGrid = document.querySelector("#statsGrid");
  if (!statsGrid) return;

  const stats = getDashboardStats();

  const cards = [
    {
      label: "Favorites",
      value: stats.favoritesCount,
      icon: "fa-heart"
    },
    {
      label: "Compare List",
      value: stats.compareCount,
      icon: "fa-code-compare"
    },
    {
      label: "Recently Viewed",
      value: stats.recentCount,
      icon: "fa-clock-rotate-left"
    },
    {
      label: "Reviews Added",
      value: stats.reviewCount,
      icon: "fa-star"
    }
  ];

  statsGrid.innerHTML = cards
    .map(function (card) {
      return `
        <article class="dashboard-stat-card">
          <div class="dashboard-stat-icon">
            <i class="fa-solid ${card.icon}"></i>
          </div>
          <div>
            <h3>${card.value}</h3>
            <p>${card.label}</p>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderFavorites() {
  const favoritesList = document.querySelector("#favoritesList");
  if (!favoritesList) return;

  const favorites = getFavorites();

  if (!favorites.length) {
    favoritesList.innerHTML = renderEmptyState(
      "No favorites yet",
      "Save residences from the home page or detail page to build your shortlist."
    );
    return;
  }

  favoritesList.innerHTML = favorites
    .map(function (item) {
      return `
        <article class="dashboard-residence-card">
          <div class="dashboard-residence-image">
            <img src="${item.image}" alt="${item.title}" />
          </div>

          <div class="dashboard-residence-content">
            <div class="dashboard-residence-top">
              <div>
                <h3>${item.title}</h3>
                <p>${item.location} • ${item.distance}</p>
              </div>
              <strong>£${item.price}/mo</strong>
            </div>

            <div class="listing-tags">
              ${item.furnished ? `<span>Furnished</span>` : ""}
              ${item.noDeposit ? `<span>No Deposit</span>` : ""}
              ${item.utilitiesIncluded ? `<span>Utilities Included</span>` : ""}
              ${item.petsAllowed ? `<span>Pets Allowed</span>` : ""}
            </div>

            <div class="dashboard-card-actions">
              <button class="small-btn js-open-detail" data-id="${item.id}">
                View Details
              </button>
              <button class="small-btn alt js-remove-favorite" data-id="${item.id}">
                Remove
              </button>
              <button class="small-btn alt js-add-compare" data-id="${item.id}">
                ${isInCompare(item.id) ? "Compared" : "Compare"}
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  bindFavoriteEvents();
}

function renderRecentlyViewed() {
  const recentList = document.querySelector("#recentList");
  if (!recentList) return;

  const recent = getRecentlyViewed();

  if (!recent.length) {
    recentList.innerHTML = renderEmptyState(
      "No recent views yet",
      "Open a residence detail page and it will appear here."
    );
    return;
  }

  recentList.innerHTML = recent
    .map(function (item) {
      return `
        <article class="dashboard-residence-card compact">
          <div class="dashboard-residence-image">
            <img src="${item.image}" alt="${item.title}" />
          </div>

          <div class="dashboard-residence-content">
            <div class="dashboard-residence-top">
              <div>
                <h3>${item.title}</h3>
                <p>${item.location} • ${item.distance}</p>
              </div>
              <strong>£${item.price}/mo</strong>
            </div>

            <div class="dashboard-card-actions">
              <button class="small-btn js-open-detail" data-id="${item.id}">
                View Again
              </button>
              <button class="small-btn alt js-save-from-recent" data-id="${item.id}">
                ${isFavorite(item.id) ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  bindRecentEvents();
}

function renderCompareMini() {
  const compareMiniList = document.querySelector("#compareMiniList");
  if (!compareMiniList) return;

  const compareItems = getCompare();

  if (!compareItems.length) {
    compareMiniList.innerHTML = renderEmptyState(
      "No compare items yet",
      "Add up to 2 residences to compare pricing, commute, and amenities."
    );
    return;
  }

  compareMiniList.innerHTML = compareItems
    .map(function (item) {
      return `
        <article class="compare-mini-card">
          <div class="compare-mini-image">
            <img src="${item.image}" alt="${item.title}" />
          </div>

          <div class="compare-mini-content">
            <h3>${item.title}</h3>
            <p>${item.location}</p>
            <strong>£${item.price}/mo</strong>

            <div class="dashboard-card-actions">
              <button class="small-btn js-open-detail" data-id="${item.id}">
                View
              </button>
              <button class="small-btn alt js-remove-compare-item" data-id="${item.id}">
                Remove
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  bindCompareMiniEvents();
}

function renderActivitySummary() {
  const activitySummary = document.querySelector("#activitySummary");
  if (!activitySummary) return;

  const stats = getDashboardStats();

  activitySummary.innerHTML = `
    <div class="activity-row">
      <span>Favorites saved</span>
      <strong>${stats.favoritesCount}</strong>
    </div>
    <div class="activity-row">
      <span>Residences in compare</span>
      <strong>${stats.compareCount}</strong>
    </div>
    <div class="activity-row">
      <span>Recently viewed items</span>
      <strong>${stats.recentCount}</strong>
    </div>
    <div class="activity-row">
      <span>Reviews submitted</span>
      <strong>${stats.reviewCount}</strong>
    </div>
  `;
}

function bindFavoriteEvents() {
  const detailButtons = document.querySelectorAll(".js-open-detail");
  const removeButtons = document.querySelectorAll(".js-remove-favorite");
  const compareButtons = document.querySelectorAll(".js-add-compare");

  detailButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const id = Number(button.dataset.id);
      setSelectedListing(id);
      window.location.href = "detail.html";
    });
  });

  removeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const id = Number(button.dataset.id);
      const result = removeFavorite(id);

      renderDashboard();
      showToast(result.message);
    });
  });

  compareButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const id = Number(button.dataset.id);
      const item = getListingById(id);

      if (!item) return;

      let result;

      if (isInCompare(id)) {
        result = removeCompare(id);
      } else {
        result = addCompare(item);
      }

      renderDashboard();
      showToast(result.message);
    });
  });
}

function bindRecentEvents() {
  const detailButtons = document.querySelectorAll(".js-open-detail");
  const saveButtons = document.querySelectorAll(".js-save-from-recent");

  detailButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const id = Number(button.dataset.id);
      setSelectedListing(id);
      const detailUrl = new URL("./detail.html", window.location.href).href;
window.location.href = detailUrl;
    });
  });

  saveButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const id = Number(button.dataset.id);
      const item = getListingById(id);

      if (!item) return;

      const result = toggleFavorite(item);
      renderDashboard();
      showToast(result.message);
    });
  });
}

function bindCompareMiniEvents() {
  const detailButtons = document.querySelectorAll(".js-open-detail");
  const removeButtons = document.querySelectorAll(".js-remove-compare-item");

  detailButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const id = Number(button.dataset.id);
      setSelectedListing(id);
      window.location.href = "detail.html";
    });
  });

  removeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const id = Number(button.dataset.id);
      const result = removeCompare(id);

      renderDashboard();
      showToast(result.message);
    });
  });
}

function renderEmptyState(title, text) {
  return `
    <div class="dashboard-empty-state">
      <h3>${title}</h3>
      <p>${text}</p>
    </div>
  `;
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