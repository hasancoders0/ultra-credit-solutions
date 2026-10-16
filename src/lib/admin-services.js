
import { services as initialServices } from "@/data/services";

export const SERVICE_STORAGE_KEY = "ucs-admin-services";
export const SERVICE_UPDATED_EVENT = "ucs-services-updated";

function normalizeService(service, index = 0) {
  const image =
    typeof service.image === "string"
      ? { src: service.image, alt: service.imageAlt || "" }
      : {
          src: service.image?.src || "",
          alt: service.image?.alt || service.imageAlt || "",
        };

  return {
    ...service,
    id: service.id ?? index + 1,
    title: service.title || "",
    slug: service.slug || "",
    description: service.description || "",
    href: service.href || `/services/${service.slug || ""}`,
    number: service.number || String(index + 1).padStart(2, "0"),
    featured: service.featured ?? false,
    image,
    content: {
      introduction: service.content?.introduction || "",
      sections: Array.isArray(service.content?.sections)
        ? service.content.sections
        : [],
    },
    status: service.status || "published",
    order: Number(service.order ?? service.number ?? index + 1) || index + 1,
    seo: {
      title: service.seo?.title || service.title || "",
      description:
        service.seo?.description || service.description || "",
    },
    createdAt: service.createdAt || null,
    updatedAt: service.updatedAt || null,
  };
}

export function getAdminServices() {
  if (typeof window === "undefined") {
    return initialServices.map(normalizeService);
  }

  try {
    const saved = localStorage.getItem(SERVICE_STORAGE_KEY);

    if (saved !== null) {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(normalizeService);
      }

      // An empty old storage value should not hide the initial services.
      return initialServices.map(normalizeService);
    }
  } catch (error) {
    console.error("Unable to load services:", error);
  }

  return initialServices.map(normalizeService);
}

export function saveAdminServices(services) {
  if (typeof window === "undefined") {
    throw new Error("Services can only be saved in the browser.");
  }

  localStorage.setItem(
    SERVICE_STORAGE_KEY,
    JSON.stringify(services.map(normalizeService))
  );

  window.dispatchEvent(new Event(SERVICE_UPDATED_EVENT));
}

export function getAdminServiceById(id) {
  return getAdminServices().find(
    (service) => String(service.id) === String(id)
  ) || null;
}

export function saveAdminService(serviceData) {
  const services = getAdminServices();
  const now = new Date().toISOString();

  const existing = services.find(
    (service) => String(service.id) === String(serviceData.id)
  );

  const id =
    existing?.id ??
    Math.max(0, ...services.map((service) => Number(service.id) || 0)) + 1;

  const service = normalizeService(
    {
      ...existing,
      ...serviceData,
      id,
      href: `/services/${serviceData.slug}`,
      createdAt: existing?.createdAt || serviceData.createdAt || now,
      updatedAt: now,
    },
    services.length
  );

  const nextServices = existing
    ? services.map((item) =>
        String(item.id) === String(id) ? service : item
      )
    : [...services, service];

  saveAdminServices(nextServices);

  return service;
}

export function deleteAdminService(id) {
  const nextServices = getAdminServices().filter(
    (service) => String(service.id) !== String(id)
  );

  saveAdminServices(nextServices);

  return nextServices;
}
