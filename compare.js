document.addEventListener("DOMContentLoaded", function () {
  renderComparePage();
  setupCompareEvents();
  setupHeaderActions();
});

function setupCompareEvents() {
  const clearCompareBtn = document.querySelector("#clearCompareBtn");

  if (clearCompareBtn) {
    clearCompareBtn.addEventListener("click", function () {
      const compareItems = getCompare();

      if (!compareItems.length) {
        showToast("Compare list is already empty.");
        return;
      }

      clearCompare();
      renderComparePage();
      showToast("Compare list cleared.");
    });
  }
}

function renderComparePage() {
  const compareItems = getCompare();
  const emptyState = document.querySelector("#compareEmptyState");
  const tableWrapper = document.querySelector("#compareTableWrapper");
  const compareTable = document.querySelector("#compareTable");

  if (!compareItems.length) {
    if (emptyState) emptyState.classList.remove("hidden");
    if (tableWrapper) tableWrapper.classList.add("hidden");
    return;
  }

  if (emptyState) emptyState.classList.add("hidden");
  if (tableWrapper) tableWrapper.classList.remove("hidden");

  if (!compareTable) return;

  compareTable.innerHTML = `
    ${renderCompareHeader(compareItems)}
    ${renderCompareRow("Monthly Rent", compareItems, function (item) {
      return `£${item.price}/mo`;
    })}
    ${renderCompareRow("Location", compareItems, function (item) {
      return item.location;
    })}
    ${renderCompareRow("School", compareItems, function (item) {
      return item.school;
    })}
    ${renderCompareRow("Distance", compareItems, function (item) {
      return `${item.distanceKm} km • ${item.distance}`;
    })}
    ${renderCompareRow("Rating", compareItems, function (item) {
      return `${item.rating} / 5`;
    })}
    ${renderCompareRow("Deposit", compareItems, function (item) {
      return item.deposit;
    })}
    ${renderCompareRow("Lease", compareItems, function (item) {
      return item.lease;
    })}
    ${renderCompareRow("Room Type", compareItems, function (item) {
      return item.roomType;
    })}
    ${renderCompareRow("Availability", compareItems, function (item) {
      return item.availability;
    })}
    ${renderCompareBooleanRow("Furnished", compareItems, "furnished")}
    ${renderCompareBooleanRow("No Deposit", compareItems, "noDeposit")}
    ${renderCompareBooleanRow("Utilities Included", compareItems, "utilitiesIncluded")}
    ${renderCompareBooleanRow("Pets Allowed", compareItems, "petsAllowed")}
    ${renderCompareBooleanRow("Verified", compareItems, "verified")}
    ${renderCompareAmenityRow("Wi-Fi", compareItems, "wifi")}
    ${renderCompareAmenityRow("Laundry", compareItems, "laundry")}
    ${renderCompareAmenityRow("Gym", compareItems, "gym")}
    ${renderCompareAmenityRow("Parking", compareItems, "parking")}
    ${renderCompareAmenityRow("Security", compareItems, "security")}
    ${renderCompareAmenityRow("Elevator", compareItems, "elevator")}
    ${renderCompareRow("Student Score", compareItems, function (item) {
      return `${item.studentScore.overall} • Safety ${item.studentScore.safety}`;
    })}
    ${renderCompareRow("Nearby", compareItems, function (item) {
      return item.nearby.join(", ");
    })}
  `;

  bindCompareCardEvents();
}

function renderCompareHeader(compareItems) {
  return `
    <div class="compare-row compare-row-head">
      <div class="compare-label compare-label-head">Residence</div>
      ${compareItems
        .map(function (item) {
          return `
            <div class="compare-cell compare-card-cell">
              <div class="compare-card">
                <div class="compare-card-image">
                  <img src="${item.image}" alt="${item.title}" />
                </div>

                <div class="compare-card-content">
                  <div class="compare-card-top">
                    <h3>${item.title}</h3>
                    <p>${item.location}</p>
                  </div>

                  <div class="compare-mini-tags">
                    ${item.furnished ? `<span>Furnished</span>` : ""}
                    ${item.utilitiesIncluded ? `<span>Utilities</span>` : ""}
                    ${item.petsAllowed ? `<span>Pets</span>` : ""}
                    ${item.noDeposit ? `<span>No Deposit</span>` : ""}
                  </div>

                  <div class="compare-card-actions">
                    <button class="small-btn js-open-detail" data-id="${item.id}">
                      View Details
                    </button>
                    <button class="small-btn alt js-remove-compare" data-id="${item.id}">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;
        })
        .join("")}
      ${renderEmptyCompareSlot(compareItems)}
    </div>
  `;
}

function renderCompareRow(label, compareItems, valueFn) {
  return `
    <div class="compare-row">
      <div class="compare-label">${label}</div>
      ${compareItems
        .map(function (item) {
          return `<div class="compare-cell">${valueFn(item)}</div>`;
        })
        .join("")}
      ${renderEmptyCompareValue(compareItems)}
    </div>
  `;
}

function renderCompareBooleanRow(label, compareItems, key) {
  return `
    <div class="compare-row">
      <div class="compare-label">${label}</div>
      ${compareItems
        .map(function (item) {
          const active = item[key] === true;
          return `
            <div class="compare-cell">
              <span class="compare-status ${active ? "yes" : "no"}">
                <i class="fa-solid ${active ? "fa-check" : "fa-xmark"}"></i>
                ${active ? "Yes" : "No"}
              </span>
            </div>
          `;
        })
        .join("")}
      ${renderEmptyCompareValue(compareItems)}
    </div>
  `;
}

function renderCompareAmenityRow(label, compareItems, key) {
  return `
    <div class="compare-row">
      <div class="compare-label">${label}</div>
      ${compareItems
        .map(function (item) {
          const active = item.amenities && item.amenities[key] === true;
          return `
            <div class="compare-cell">
              <span class="compare-status ${active ? "yes" : "no"}">
                <i class="fa-solid ${active ? "fa-check" : "fa-xmark"}"></i>
                ${active ? "Yes" : "No"}
              </span>
            </div>
          `;
        })
        .join("")}
      ${renderEmptyCompareValue(compareItems)}
    </div>
  `;
}

function renderEmptyCompareSlot(compareItems) {
  if (compareItems.length >= 2) return "";

  return `
    <div class="compare-cell compare-card-cell compare-placeholder-cell">
      <div class="compare-placeholder">
        <i class="fa-regular fa-square-plus"></i>
        <p>Add one more residence to compare</p>
        <a href="index.html" class="secondary-btn inline-btn">Browse More</a>
      </div>
    </div>
  `;
}

function renderEmptyCompareValue(compareItems) {
  if (compareItems.length >= 2) return "";
  return `<div class="compare-cell compare-empty-value">—</div>`;
}

function bindCompareCardEvents() {
  const detailButtons = document.querySelectorAll(".js-open-detail");
  const removeButtons = document.querySelectorAll(".js-remove-compare");

  detailButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const id = Number(button.dataset.id);
      setSelectedListing(id);
      const detailUrl = new URL("./detail.html", window.location.href).href;
window.location.href = detailUrl;
    });
  });

  removeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const id = Number(button.dataset.id);
      const result = removeCompare(id);

      renderComparePage();
      showToast(result.message);
    });
  });
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