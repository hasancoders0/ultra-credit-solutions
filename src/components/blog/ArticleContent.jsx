import DOMPurify from "isomorphic-dompurify";

function hasHtml(value) {
  return typeof value === "string" && /<\/?[a-z][\s\S]*>/i.test(value);
}

function RichContent({ value }) {
  if (typeof value !== "string" || !value.trim()) return null;

  if (!hasHtml(value)) {
    return <p>{value}</p>;
  }

  const cleanHtml = DOMPurify.sanitize(value, {
    USE_PROFILES: { html: true },
  });

  return (
    <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
  );
}

export default function ArticleContent({ sections = [] }) {
  if (!Array.isArray(sections) || sections.length === 0) {
    return (
      <p className="text-sm leading-7 text-[#666666]">
        This article's content will be available soon.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {sections.map((section, index) => {
        if (!section || typeof section !== "object") return null;

        const heading =
          typeof section.heading === "string" ? section.heading : "";

        const paragraphs = Array.isArray(section.paragraphs)
          ? section.paragraphs
          : [];

        return (
          <section
            key={`${heading || "section"}-${index}`}
            className="min-w-0"
          >
            {heading && (
              <h2 className="mb-3 text-xl font-bold leading-snug tracking-tight text-[#081828] sm:text-2xl">
                {heading}
              </h2>
            )}

            <div className="space-y-4 text-[15px] leading-7 text-[#505967] sm:text-base sm:leading-8 [&_a]:text-blue-700 [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_h1]:mb-3 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold [&_li]:ml-6 [&_ol]:list-decimal [&_p]:mb-4 [&_p:last-child]:mb-0 [&_ul]:list-disc">
              {paragraphs.map((paragraph, paragraphIndex) => {
                if (
                  typeof paragraph !== "string" ||
                  !paragraph.trim()
                ) {
                  return null;
                }

                return hasHtml(paragraph) ? (
                  <RichContent
                    key={paragraphIndex}
                    value={paragraph}
                  />
                ) : (
                  <p key={paragraphIndex}>{paragraph}</p>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
