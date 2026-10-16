
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FileText,
  BriefcaseBusiness,
  MapPin,
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  ChevronDown,
  Tags,
  AlertCircle,
  SlidersHorizontal,
} from "lucide-react";

import initialCategories from "@/data/categories";

const STORAGE_KEY = "ucs-admin-categories";

const categoryTypes = [
  {
    key: "blog",
    label: "Blog",
    icon: FileText,
  },
  {
    key: "services",
    label: "Services",
    icon: BriefcaseBusiness,
  },
  {
    key: "locations",
    label: "Locations",
    icon: MapPin,
  },
];

function createSlug(value = "") {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function emptyForm() {
  return {
    name: "",
    slug: "",
    description: "",
    status: "active",
  };
}

function normalizeCategories(data) {
  return {
    blog: Array.isArray(data?.blog) ? data.blog : [],
    services: Array.isArray(data?.services) ? data.services : [],
    locations: Array.isArray(data?.locations) ? data.locations : [],
  };
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState(() =>
    normalizeCategories(initialCategories)
  );

  const [activeType, setActiveType] = useState("blog");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [slugEdited, setSlugEdited] = useState(false);
  const [formError, setFormError] = useState("");

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [storageReady, setStorageReady] = useState(false);

  // Load categories from localStorage.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        setCategories(normalizeCategories(JSON.parse(saved)));
      }
    } catch (error) {
      console.error("Unable to load categories:", error);
    } finally {
      setStorageReady(true);
    }
  }, []);

  // Save category changes.
  useEffect(() => {
    if (!storageReady) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    } catch (error) {
      console.error("Unable to save categories:", error);
    }
  }, [categories, storageReady]);

  const currentType = categoryTypes.find(
    (type) => type.key === activeType
  );

  const currentCategories = categories[activeType] || [];

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    return currentCategories.filter((category) => {
      const matchesSearch =
        !query ||
        category.name.toLowerCase().includes(query) ||
        category.slug.toLowerCase().includes(query) ||
        (category.description || "").toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" || category.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [currentCategories, search, statusFilter]);

  function openCreateModal() {
    setEditingId(null);
    setForm(emptyForm());
    setSlugEdited(false);
    setFormError("");
    setModalOpen(true);
  }

  function openEditModal(category) {
    setEditingId(category.id);
    setForm({
      name: category.name || "",
      slug: category.slug || "",
      description: category.description || "",
      status: category.status || "active",
    });
    setSlugEdited(true);
    setFormError("");
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm());
    setSlugEdited(false);
    setFormError("");
  }

  function updateField(field, value) {
    setForm((previous) => {
      const next = { ...previous, [field]: value };

      if (field === "name" && !slugEdited) {
        next.slug = createSlug(value);
      }

      return next;
    });
  }

  function saveCategory(event) {
    event.preventDefault();
    setFormError("");

    const name = form.name.trim();
    const slug = createSlug(form.slug);

    if (!name) {
      setFormError("Please enter a category name.");
      return;
    }

    if (!slug) {
      setFormError("Please enter a valid category slug.");
      return;
    }

    const duplicate = currentCategories.some(
      (category) =>
        category.slug.toLowerCase() === slug.toLowerCase() &&
        category.id !== editingId
    );

    if (duplicate) {
      setFormError(
        "This slug already exists in this category group."
      );
      return;
    }

    if (editingId !== null) {
      setCategories((previous) => ({
        ...previous,
        [activeType]: previous[activeType].map((category) =>
          category.id === editingId
            ? {
                ...category,
                name,
                slug,
                description: form.description.trim(),
                status: form.status,
              }
            : category
        ),
      }));
    } else {
      const nextId =
        Math.max(
          0,
          ...Object.values(categories)
            .flat()
            .map((category) => Number(category.id) || 0)
        ) + 1;

      setCategories((previous) => ({
        ...previous,
        [activeType]: [
          ...previous[activeType],
          {
            id: nextId,
            name,
            slug,
            description: form.description.trim(),
            status: form.status,
          },
        ],
      }));
    }

    closeModal();
  }

  function toggleStatus(category) {
    setCategories((previous) => ({
      ...previous,
      [activeType]: previous[activeType].map((item) =>
        item.id === category.id
          ? {
              ...item,
              status:
                item.status === "active" ? "inactive" : "active",
            }
          : item
      ),
    }));
  }

  function confirmDelete() {
    if (!deleteTarget) return;

    setCategories((previous) => ({
      ...previous,
      [deleteTarget.type]: previous[deleteTarget.type].filter(
        (category) => category.id !== deleteTarget.id
      ),
    }));

    setDeleteTarget(null);
  }

  function changeType(type) {
    setActiveType(type);
    setSearch("");
    setStatusFilter("all");
  }

  return (
    <div className="space-y-5">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <SummaryCard
          label="Total Categories"
          value={Object.values(categories).flat().length}
          icon={Tags}
          iconClass="bg-[#EEF2FA] text-[#2852A0]"
        />

        <SummaryCard
          label="Active Categories"
          value={Object.values(categories)
            .flat()
            .filter((item) => item.status === "active").length}
          icon={Check}
          iconClass="bg-[#EAF9F0] text-[#16834A]"
        />

        <SummaryCard
          label="Inactive Categories"
          value={Object.values(categories)
            .flat()
            .filter((item) => item.status === "inactive").length}
          icon={SlidersHorizontal}
          iconClass="bg-[#FFF4E5] text-[#B7791F]"
        />
      </div>

      {/* Main Categories Panel */}
      <section className="overflow-hidden rounded-xl border border-[#EEEEEE] bg-white">
        {/* Tabs */}
        <div className="grid grid-cols-1 border-b border-[#EEEEEE] sm:grid-cols-3">
          {categoryTypes.map((type) => {
            const Icon = type.icon;
            const active = activeType === type.key;

            return (
              <button
                key={type.key}
                type="button"
                onClick={() => changeType(type.key)}
                className={`flex items-center justify-center gap-2 border-b-2 px-4 py-4 text-sm font-semibold transition ${
                  active
                    ? "border-[#2852A0] bg-[#2852A0]/5 text-[#2852A0]"
                    : "border-transparent text-[#666666] hover:bg-[#F9F9F9]"
                }`}
              >
                <Icon size={17} strokeWidth={1.8} />
                <span>{type.label}</span>

                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    active
                      ? "bg-[#2852A0]/10 text-[#2852A0]"
                      : "bg-[#F5F5F5] text-[#888888]"
                  }`}
                >
                  {categories[type.key].length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 border-b border-[#EEEEEE] p-4 sm:p-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-[#081828]">
              {currentType?.label} Categories
            </h2>

            <p className="mt-1 text-sm text-[#888888]">
              {activeType === "blog" &&
                "Organize your blog posts by category."}
              {activeType === "services" &&
                "Organize your website services by category."}
              {activeType === "locations" &&
                "Organize your service areas and location pages."}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative min-w-0 sm:w-[220px]">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search categories..."
                className="h-10 w-full rounded-lg border border-[#EEEEEE] bg-white pl-9 pr-3 text-sm text-[#081828] outline-none placeholder:text-[#999999] focus:border-[#2852A0]"
              />
            </div>

            <div className="relative sm:w-[150px]">
              <SlidersHorizontal
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]"
              />

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                className="h-10 w-full appearance-none rounded-lg border border-[#EEEEEE] bg-white pl-9 pr-9 text-sm text-[#333333] outline-none focus:border-[#2852A0]"
              >
                <option value="all">All statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#888888]"
              />
            </div>
          </div>
        </div>

        {/* Category Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="border-b border-[#EEEEEE] bg-[#FCFCFC]">
                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wide text-[#888888]">
                  Category
                </th>

                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wide text-[#888888]">
                  Slug
                </th>

                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wide text-[#888888]">
                  Status
                </th>

                <th className="px-5 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wide text-[#888888]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#EEEEEE]">
              {filteredCategories.map((category) => (
                <tr
                  key={category.id}
                  className="transition hover:bg-[#FCFCFC]"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EEF2FA] text-[#2852A0]">
                        <Tags size={17} strokeWidth={1.8} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#081828]">
                          {category.name}
                        </p>

                        <p className="mt-1 max-w-[340px] text-xs leading-5 text-[#888888]">
                          {category.description ||
                            "No description added."}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <code className="rounded-md bg-[#F7F7F7] px-2 py-1 text-[11px] text-[#666666]">
                      {category.slug}
                    </code>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => toggleStatus(category)}
                      aria-label={`Change ${category.name} status`}
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${
                        category.status === "active"
                          ? "bg-[#E8F7EE] text-[#16834A]"
                          : "bg-[#F2F2F2] text-[#777777]"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          category.status === "active"
                            ? "bg-[#16834A]"
                            : "bg-[#999999]"
                        }`}
                      />

                      {category.status === "active"
                        ? "Active"
                        : "Inactive"}
                    </button>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(category)}
                        aria-label={`Edit ${category.name}`}
                        className="rounded-lg border border-[#EEEEEE] p-2 text-[#666666] transition hover:border-[#2852A0]/30 hover:bg-[#2852A0]/5 hover:text-[#2852A0]"
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setDeleteTarget({
                            id: category.id,
                            name: category.name,
                            type: activeType,
                          })
                        }
                        aria-label={`Delete ${category.name}`}
                        className="rounded-lg border border-[#EEEEEE] p-2 text-[#777777] transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredCategories.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-14 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#F5F5F5] text-[#999999]">
                      <Tags size={22} />
                    </div>

                    <h3 className="mt-3 text-sm font-semibold text-[#081828]">
                      {search || statusFilter !== "all"
                        ? "No categories found"
                        : `No ${currentType?.label.toLowerCase()} categories yet`}
                    </h3>

                    <p className="mt-1 text-sm text-[#888888]">
                      {search || statusFilter !== "all"
                        ? "Try changing your search or status filter."
                        : `Add a category to organize your ${currentType?.label.toLowerCase()} content.`}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer and Add Button */}
        <div className="flex flex-col gap-4 border-t border-[#EEEEEE] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p className="text-sm text-[#888888]">
            Showing{" "}
            <span className="font-semibold text-[#333333]">
              {filteredCategories.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#333333]">
              {currentCategories.length}
            </span>{" "}
            {currentType?.label.toLowerCase()} categories
          </p>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-[#2852A0] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#204584] sm:self-auto"
          >
            <Plus size={17} />
            Add {activeType === "blog"
              ? "Blog"
              : activeType === "services"
                ? "Service"
                : "Location"} Category
          </button>
        </div>
      </section>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="category-modal-title"
            className="my-auto w-full max-w-[520px] rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-[#EEEEEE] px-6 py-5">
              <div>
                <h2
                  id="category-modal-title"
                  className="text-lg font-bold text-[#081828]"
                >
                  {editingId !== null
                    ? "Edit Category"
                    : "Add Category"}
                </h2>

                <p className="mt-1 text-sm text-[#888888]">
                  {currentType?.label} category
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close modal"
                className="rounded-lg p-2 text-[#777777] hover:bg-[#F5F5F5]"
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={saveCategory} className="space-y-5 p-6">
              <div>
                <label
                  htmlFor="category-name"
                  className="mb-2 block text-sm font-semibold text-[#333333]"
                >
                  Category Name <span className="text-red-500">*</span>
                </label>

                <input
                  id="category-name"
                  type="text"
                  required
                  autoFocus
                  value={form.name}
                  onChange={(event) =>
                    updateField("name", event.target.value)
                  }
                  placeholder="e.g. Credit Education"
                  className="h-11 w-full rounded-lg border border-[#EEEEEE] px-3 text-sm text-[#081828] outline-none focus:border-[#2852A0]"
                />
              </div>

              <div>
                <label
                  htmlFor="category-slug"
                  className="mb-2 block text-sm font-semibold text-[#333333]"
                >
                  URL Slug <span className="text-red-500">*</span>
                </label>

                <input
                  id="category-slug"
                  type="text"
                  required
                  value={form.slug}
                  onChange={(event) => {
                    setSlugEdited(true);
                    updateField("slug", event.target.value);
                  }}
                  placeholder="credit-education"
                  className="h-11 w-full rounded-lg border border-[#EEEEEE] px-3 text-sm text-[#081828] outline-none focus:border-[#2852A0]"
                />

                <p className="mt-1.5 text-xs text-[#888888]">
                  Lowercase letters, numbers and hyphens only.
                </p>
              </div>

              <div>
                <label
                  htmlFor="category-description"
                  className="mb-2 block text-sm font-semibold text-[#333333]"
                >
                  Description
                </label>

                <textarea
                  id="category-description"
                  rows={3}
                  value={form.description}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                  placeholder="Describe this category..."
                  className="w-full resize-y rounded-lg border border-[#EEEEEE] px-3 py-3 text-sm text-[#081828] outline-none focus:border-[#2852A0]"
                />
              </div>

              <div>
                <label
                  htmlFor="category-status"
                  className="mb-2 block text-sm font-semibold text-[#333333]"
                >
                  Status
                </label>

                <div className="relative">
                  <select
                    id="category-status"
                    value={form.status}
                    onChange={(event) =>
                      updateField("status", event.target.value)
                    }
                    className="h-11 w-full appearance-none rounded-lg border border-[#EEEEEE] bg-white px-3 pr-9 text-sm text-[#081828] outline-none focus:border-[#2852A0]"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#888888]"
                  />
                </div>
              </div>

              {formError && (
                <div
                  role="alert"
                  className="flex gap-2 rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600"
                >
                  <AlertCircle size={17} className="shrink-0" />
                  {formError}
                </div>
              )}

              <div className="flex flex-col-reverse gap-3 border-t border-[#EEEEEE] pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg border border-[#EEEEEE] px-4 py-2.5 text-sm font-semibold text-[#666666] hover:bg-[#F9F9F9]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2852A0] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#204584]"
                >
                  <Check size={16} />
                  {editingId !== null
                    ? "Save Changes"
                    : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-category-title"
            className="w-full max-w-[400px] rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Trash2 size={21} />
            </div>

            <h2
              id="delete-category-title"
              className="mt-4 text-lg font-bold text-[#081828]"
            >
              Delete Category?
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#777777]">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[#333333]">
                {deleteTarget.name}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="rounded-lg border border-[#EEEEEE] px-4 py-2.5 text-sm font-semibold text-[#666666] hover:bg-[#F9F9F9]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                Delete Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ label, value, icon: Icon, iconClass }) {
  return (
    <div className="rounded-xl border border-[#EEEEEE] bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-[#888888]">{label}</p>
          <p className="mt-1 text-2xl font-semibold text-[#081828]">
            {value}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={19} strokeWidth={1.8} />
        </div>
      </div>
    </div>
  );
}
