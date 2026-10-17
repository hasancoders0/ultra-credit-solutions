export const LOCATION_STORAGE_KEY = null;
export const LOCATION_UPDATED_EVENT = "ucs-locations-updated";

export function createSlug(value = "") {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    cache: "no-store",
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Locations request failed.");
  }

  return result.data;
}

function notifyLocationsUpdated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(LOCATION_UPDATED_EVENT));
  }
}

export async function getAdminLocations() {
  const locations = await request("/api/admin/locations");

  return Array.isArray(locations) ? locations : [];
}

export async function getAdminLocationById(id) {
  if (!id) return null;

  return request(`/api/admin/locations/${encodeURIComponent(id)}`);
}

export async function saveAdminLocation(data) {
  const payload = {
    ...data,
    slug: createSlug(data.slug || data.title),
  };

  const isExisting =
    payload.id &&
    /^[a-f\d]{24}$/i.test(String(payload.id));

  const result = await request(
    isExisting
      ? `/api/admin/locations/${encodeURIComponent(payload.id)}`
      : "/api/admin/locations",
    {
      method: isExisting ? "PATCH" : "POST",
      body: JSON.stringify(payload),
    }
  );

  notifyLocationsUpdated();

  return result;
}

export async function saveAdminLocations(items) {
  if (!Array.isArray(items)) {
    throw new Error("Locations must be provided as an array.");
  }

  const saved = [];

  for (const item of items) {
    saved.push(await saveAdminLocation(item));
  }

  return saved;
}

export async function deleteAdminLocation(id) {
  await request(`/api/admin/locations/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });

  notifyLocationsUpdated();

  return true;
}

export async function resetAdminLocations() {
  throw new Error(
    "Reset is disabled for database-backed locations. Delete or edit locations explicitly."
  );
}