import { locations as initialLocations } from "@/data/locations";

export const LOCATION_STORAGE_KEY = "ucs-admin-locations";
export const LOCATION_UPDATED_EVENT = "ucs-locations-updated";

export function createSlug(value = "") {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeLocation(item, index = 0) {
  return {
    ...item,
    id: item.id ?? index + 1,
    title: item.title || "",
    slug: item.slug || "",
    state: item.state || "",
    city: item.city || "",
    description: item.description || "",
    introduction: item.introduction || "",
    serviceAreas: Array.isArray(item.serviceAreas) ? item.serviceAreas : [],
    image: { src: "", alt: "", ...(item.image || {}) },
    content: Array.isArray(item.content) ? item.content : [],
    faqs: Array.isArray(item.faqs) ? item.faqs : [],
    internalLinks: Array.isArray(item.internalLinks)
      ? item.internalLinks
      : [],
    status: item.status || "draft",
    featured: Boolean(item.featured),
    order: Number(item.order) || index + 1,
    seo: {
      title: item.title || "",
      description: item.description || "",
      canonical: "",
      ogImage: "",
      robots: "noindex,follow",
      ...(item.seo || {}),
    },
  };
}

export function getAdminLocations() {
  if (typeof window === "undefined") {
    return initialLocations.map(normalizeLocation);
  }

  try {
    const saved = localStorage.getItem(LOCATION_STORAGE_KEY);

    if (saved === null) {
      return initialLocations.map(normalizeLocation);
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed)
      ? parsed.map(normalizeLocation)
      : initialLocations.map(normalizeLocation);
  } catch (error) {
    console.error("Unable to load locations:", error);
    return initialLocations.map(normalizeLocation);
  }
}

export function saveAdminLocations(items) {
  if (typeof window === "undefined") {
    throw new Error("Browser storage is unavailable.");
  }

  localStorage.setItem(
    LOCATION_STORAGE_KEY,
    JSON.stringify(items.map(normalizeLocation))
  );

  window.dispatchEvent(new Event(LOCATION_UPDATED_EVENT));
}

export function getAdminLocationById(id) {
  return (
    getAdminLocations().find(
      (item) => String(item.id) === String(id)
    ) || null
  );
}

export function saveAdminLocation(data) {
  const current = getAdminLocations();
  const existing = current.find(
    (item) => String(item.id) === String(data.id)
  );
  const slug = createSlug(data.slug || data.title);

  if (!data.title?.trim() || !slug) {
    throw new Error("Title and URL slug are required.");
  }

  if (!data.city?.trim() || !data.state?.trim()) {
    throw new Error("City and state are required.");
  }

  const duplicate = current.some(
    (item) =>
      item.slug === slug &&
      String(item.id) !== String(existing?.id ?? "")
  );

  if (duplicate) {
    throw new Error("This URL slug is already in use.");
  }

  const now = new Date().toISOString();
  const id =
    existing?.id ??
    Math.max(0, ...current.map((item) => Number(item.id) || 0)) + 1;

  const saved = normalizeLocation(
    {
      ...existing,
      ...data,
      id,
      slug,
      createdAt: existing?.createdAt || now,
      updatedAt: now,
    },
    current.length
  );

  saveAdminLocations(
    existing
      ? current.map((item) =>
          String(item.id) === String(id) ? saved : item
        )
      : [...current, saved]
  );

  return saved;
}

export function deleteAdminLocation(id) {
  const next = getAdminLocations().filter(
    (item) => String(item.id) !== String(id)
  );

  saveAdminLocations(next);
  return next;
}