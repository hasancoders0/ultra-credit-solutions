import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import DOMPurify from "isomorphic-dompurify";
import LocationCTA from "@/components/locations/LocationCTA";

function hasHtml(value) {
  return typeof value === "string" && /<\/?[a-z][\s\S]*>/i.test(value);
}

function RichText({ value, className = "", paragraphClassName = "" }) {
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  if (!hasHtml(value)) {
    return (
      <div className={className}>
        <p className={`whitespace-pre-line ${paragraphClassName}`}>{value}</p>
      </div>
    );
  }

  const cleanHtml = DOMPurify.sanitize(value, {
    USE_PROFILES: { html: true },
  });

  return (
    <div
      className={`${className} [&_a]:text-[#2852A0] [&_a]:underline [&_a]:underline-offset-4 [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold [&_li]:ml-6 [&_ol]:my-4 [&_ol]:list-decimal [&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_ul]:my-4 [&_ul]:list-disc`}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}

function getAreaLabel(area) {
  if (typeof area === "string") return area;

  if (area && typeof area.name === "string") {
    return area.name;
  }

  return "";
}

export default function LocationDetails({ location }) {
  const content = Array.isArray(location.content) ? location.content : [];

  const serviceAreas = Array.isArray(location.serviceAreas)
    ? location.serviceAreas
    : [];

  const faqs = Array.isArray(location.faqs) ? location.faqs : [];

  const internalLinks = Array.isArray(location.internalLinks)
    ? location.internalLinks
    : [];

  const description = location.description || "";
  const introduction = location.introduction || "";

  return (
    <>
      {/* Location Hero */}
      <section className="bg-[#F9F9F9]">
        <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 sm:py-20">
          <Link
            href="/locations"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-black"
          >
            <ArrowLeft size={16} />
            All Locations
          </Link>

          <div className="mt-8 max-w-3xl">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-600">
              <MapPin size={16} />
              {[location.city, location.state].filter(Boolean).join(", ")}
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
              {location.title}
            </h1>

            {description && (
              <RichText
                value={description}
                className="mt-5 text-base leading-8 text-gray-600 sm:text-lg [&_p]:mb-0"
                paragraphClassName="text-base leading-8 text-gray-600 sm:text-lg"
              />
            )}

            <Link
              href="/appointment"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gray-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Make an Appointment
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* Location Content */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-[850px] px-5 sm:px-8">
          {introduction && (
            <div className="mb-10 text-base leading-8 text-gray-700">
              <RichText value={introduction} />
            </div>
          )}

          {content.length > 0 ? (
            <div className="space-y-10">
              {content.map((section, index) => {
                if (
                  !section ||
                  typeof section !== "object" ||
                  Array.isArray(section)
                ) {
                  return null;
                }

                const heading =
                  typeof section.heading === "string" ? section.heading : "";

                const paragraphs = Array.isArray(section.paragraphs)
                  ? section.paragraphs
                  : typeof section.paragraphs === "string"
                    ? [section.paragraphs]
                    : [];

                return (
                  <section
                    key={section.id || `${heading}-${index}`}
                    className="min-w-0"
                  >
                    {heading && (
                      <h2 className="mb-4 text-2xl font-semibold tracking-tight text-gray-950 sm:text-3xl">
                        {heading}
                      </h2>
                    )}

                    <div className="space-y-4 text-base leading-8 text-gray-700">
                      {paragraphs.map((paragraph, paragraphIndex) => {
                        if (
                          typeof paragraph !== "string" ||
                          !paragraph.trim()
                        ) {
                          return null;
                        }

                        return (
                          <RichText
                            key={paragraphIndex}
                            value={paragraph}
                            className="min-w-0"
                            paragraphClassName="text-base leading-8 text-gray-700"
                          />
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            !introduction && (
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-gray-950">
                  Credit Information for {location.city || location.state}
                </h2>

                <p className="mt-4 text-base leading-8 text-gray-700">
                  Contact Ultra Credit Solutions USA to learn more about
                  available credit solutions and the services that may fit your
                  needs.
                </p>
              </div>
            )
          )}

          {/* Service Areas */}
          {serviceAreas.length > 0 && (
            <section className="mt-12 border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-semibold tracking-tight text-gray-950">
                Areas We Serve
              </h2>

              <ul className="mt-5 flex flex-wrap gap-3">
                {serviceAreas.map((area, index) => {
                  const label = getAreaLabel(area);

                  if (!label) return null;

                  return (
                    <li
                      key={
                        typeof area === "object" && area?.id
                          ? area.id
                          : `${label}-${index}`
                      }
                      className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700"
                    >
                      {label}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* FAQs */}
          {faqs.length > 0 && (
            <section className="mt-12 border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-semibold tracking-tight text-gray-950">
                Frequently Asked Questions
              </h2>

              <div className="mt-6 space-y-6">
                {faqs.map((faq, index) => {
                  if (!faq || typeof faq !== "object") {
                    return null;
                  }

                  const question =
                    typeof faq.question === "string" ? faq.question : "";

                  const answer =
                    typeof faq.answer === "string" ? faq.answer : "";

                  if (!question && !answer) return null;

                  return (
                    <div
                      key={faq.id || `${question}-${index}`}
                      className="border-b border-gray-200 pb-5"
                    >
                      {question && (
                        <h3 className="text-lg font-semibold text-gray-950">
                          {question}
                        </h3>
                      )}

                      {answer && (
                        <RichText
                          value={answer}
                          className="mt-2 text-base leading-7 text-gray-600"
                          paragraphClassName="text-base leading-7 text-gray-600"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Internal Links */}
          {internalLinks.length > 0 && (
            <section className="mt-12 border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-semibold tracking-tight text-gray-950">
                Related Resources
              </h2>

              <ul className="mt-5 space-y-3">
                {internalLinks.map((item, index) => {
                  if (!item || typeof item !== "object") {
                    return null;
                  }

                  const href =
                    typeof item.href === "string"
                      ? item.href
                      : typeof item.url === "string"
                        ? item.url
                        : "";

                  const label =
                    typeof item.title === "string"
                      ? item.title
                      : typeof item.label === "string"
                        ? item.label
                        : "";

                  if (!href || !label || !href.startsWith("/")) {
                    return null;
                  }

                  return (
                    <li key={item.id || `${href}-${index}`}>
                      <Link
                        href={href}
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-800 underline-offset-4 hover:underline"
                      >
                        {label}
                        <ArrowRight size={15} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>
      </section>

      <LocationCTA />
    </>
  );
}
