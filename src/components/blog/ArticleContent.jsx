
export default function ArticleContent({ sections = [] }) {
  if (!sections.length) {
    return (
      <p className="text-sm leading-7 text-[#666666]">
        This article's content will be available soon.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {sections.map((section, index) => (
        <section
          key={`${section.heading || "section"}-${index}`}
          className="min-w-0"
        >
          {section.heading && (
            <h2 className="mb-3 text-xl font-bold leading-snug tracking-tight text-[#081828] sm:text-2xl">
              {section.heading}
            </h2>
          )}

          {Array.isArray(section.paragraphs) &&
            section.paragraphs.map((paragraph, paragraphIndex) => (
              <p
                key={paragraphIndex}
                className="mb-4 text-[15px] leading-7 text-[#505967] last:mb-0 sm:text-base sm:leading-8"
              >
                {paragraph}
              </p>
            ))}
        </section>
      ))}
    </div>
  );
}
