// =========================
// Generic localStorage helpers
// =========================
function getData(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return [];
  }
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// =========================
// Favorites
// =========================
function getFavorites() {
  return getData("favorites");
}

function isFavorite(id) {
  return getFavorites().some((item) => item.id === Number(id));
}

function addFavorite(item) {
  const favorites = getFavorites();
  const exists = favorites.some((fav) => fav.id === item.id);

  if (!exists) {
    favorites.push(item);
    saveData("favorites", favorites);
    return { ok: true, message: "Added to favorites." };
  }

  return { ok: false, message: "Already in favorites." };
}

function removeFavorite(id) {
  const favorites = getFavorites().filter((item) => item.id !== Number(id));
  saveData("favorites", favorites);
  return { ok: true, message: "Removed from favorites." };
}

function toggleFavorite(item) {
  if (isFavorite(item.id)) {
    return removeFavorite(item.id);
  }
  return addFavorite(item);
}

function clearFavorites() {
  localStorage.removeItem("favorites");
  return { ok: true, message: "Favorites cleared." };
}

// =========================
// Compare
// Only allow up to 2 items
// =========================
function getCompare() {
  return getData("compare");
}

function isInCompare(id) {
  return getCompare().some((item) => item.id === Number(id));
}

function addCompare(item) {
  const compare = getCompare();
  const exists = compare.some((entry) => entry.id === item.id);

  if (exists) {
    return { ok: false, message: "Already added to compare." };
  }

  if (compare.length >= 2) {
    return { ok: false, message: "You can only compare 2 residences." };
  }

  compare.push(item);
  saveData("compare", compare);
  return { ok: true, message: "Added to compare." };
}

function removeCompare(id) {
  const compare = getCompare().filter((item) => item.id !== Number(id));
  saveData("compare", compare);
  return { ok: true, message: "Removed from compare." };
}

function clearCompare() {
  localStorage.removeItem("compare");
  return { ok: true, message: "Compare list cleared." };
}

// =========================
// Reviews
// Save user-added reviews separately
// =========================
function getStoredReviews() {
  return getData("userReviews");
}

function getReviewsByListingId(listingId) {
  const reviews = getStoredReviews();
  return reviews.filter((review) => review.listingId === Number(listingId));
}

function addReview(listingId, review) {
  const reviews = getStoredReviews();

  const newReview = {
    id: Date.now(),
    listingId: Number(listingId),
    name: review.name || "Anonymous Student",
    avatar:
      review.avatar ||
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    rating: Number(review.rating) || 5,
    text: review.text || "",
    tag: review.tag || "recommendation",
    createdAt: new Date().toISOString()
  };

  reviews.unshift(newReview);
  saveData("userReviews", reviews);

  return { ok: true, message: "Review added.", review: newReview };
}

function deleteReview(reviewId) {
  const reviews = getStoredReviews().filter(
    (review) => review.id !== Number(reviewId)
  );
  saveData("userReviews", reviews);
  return { ok: true, message: "Review deleted." };
}

// =========================
// Recently Viewed
// Keep latest 6 viewed items
// =========================
function getRecentlyViewed() {
  return getData("recentlyViewed");
}

function addRecentlyViewed(item) {
  let recent = getRecentlyViewed().filter((entry) => entry.id !== item.id);

  recent.unshift({
    id: item.id,
    title: item.title,
    price: item.price,
    location: item.location,
    distance: item.distance,
    image: item.image
  });

  if (recent.length > 6) {
    recent = recent.slice(0, 6);
  }

  saveData("recentlyViewed", recent);
}

function clearRecentlyViewed() {
  localStorage.removeItem("recentlyViewed");
  return { ok: true, message: "Recently viewed cleared." };
}

// =========================
// Selected listing for detail page
// =========================
function setSelectedListing(id) {
  localStorage.setItem("selectedListing", String(id));
}

function getSelectedListing() {
  return Number(localStorage.getItem("selectedListing")) || null;
}

// =========================
// Utility helpers
// =========================
function getListingById(id) {
  return listings.find(function (item) {
    return Number(item.id) === Number(id);
  });
}

function getFullReviewsForListing(listingId) {
  const listing = getListingById(listingId);
  const baseReviews = listing && Array.isArray(listing.reviews) ? listing.reviews : [];
  const userReviews = getReviewsByListingId(listingId);

  return [...userReviews, ...baseReviews];
}

function getDashboardStats() {
  return {
    favoritesCount: getFavorites().length,
    compareCount: getCompare().length,
    recentCount: getRecentlyViewed().length,
    reviewCount: getStoredReviews().length
  };
}