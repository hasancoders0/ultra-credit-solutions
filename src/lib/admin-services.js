
import { services as initialServices } from "@/data/services";

export const SERVICE_STORAGE_KEY = null;
export const SERVICE_UPDATED_EVENT = "ucs-services-updated";

let servicesStore = initialServices.map((service) => ({
  ...service,
  category: service.category || "",
  image: { ...(service.image || {}) },
  content: {
    ...(service.content || {}),
    sections: (service.content?.sections || []).map((section) => ({
      ...section,
    })),
  },
  seo: { ...(service.seo || {}) },
}));

function cloneService(service) {
  return {
    ...service,
    image: { ...(service.image || {}) },
    content: {
      ...(service.content || {}),
      sections: (service.content?.sections || []).map((section) => ({
        ...section,
      })),
    },
    seo: { ...(service.seo || {}) },
  };
}

function notifyServicesUpdated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(SERVICE_UPDATED_EVENT));
  }
}

export function getAdminServices() {
  return servicesStore.map(cloneService);
}

export function getAdminServiceById(id) {
  const service = servicesStore.find(
    (item) => String(item.id) === String(id)
  );

  return service ? cloneService(service) : null;
}

export function saveAdminServices(nextServices) {
  if (!Array.isArray(nextServices)) {
    throw new Error("Services must be provided as an array.");
  }

  servicesStore = nextServices.map(cloneService);
  notifyServicesUpdated();

  return getAdminServices();
}

export function saveAdminService(serviceToSave) {
  if (!serviceToSave || serviceToSave.id == null) {
    throw new Error("A valid service with an ID is required.");
  }

  const index = servicesStore.findIndex(
    (service) => String(service.id) === String(serviceToSave.id)
  );

  if (index === -1) {
    servicesStore = [...servicesStore, cloneService(serviceToSave)];
  } else {
    servicesStore = servicesStore.map((service, i) =>
      i === index ? cloneService(serviceToSave) : service
    );
  }

  notifyServicesUpdated();

  return getAdminServiceById(serviceToSave.id);
}

export function deleteAdminService(id) {
  servicesStore = servicesStore.filter(
    (service) => String(service.id) !== String(id)
  );

  notifyServicesUpdated();

  return getAdminServices();
}

export function resetAdminServices() {
  servicesStore = initialServices.map(cloneService);
  notifyServicesUpdated();

  return getAdminServices();
}
