
export default function BlogSkeleton({ variant = "listing" }) {
  const isDetail = variant === "detail";

  return (
    <div
      aria-label="Loading blog content"
      role="status"
      className="animate-pulse"
    >
      <span className="sr-only">Loading blog content...</span>

      {isDetail ? (
        <article className="mx-auto w-full max-w-[900px] px-4 py-10 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6 h-4 w-48 rounded bg-gray-200" />

          {/* Category */}
          <div className="mb-5 h-6 w-32 rounded-full bg-gray-200" />

          {/* Title */}
          <div className="mb-3 h-8 w-full max-w-3xl rounded bg-gray-200 sm:h-10" />
          <div className="mb-7 h-8 w-4/5 max-w-2xl rounded bg-gray-200 sm:h-10" />

          {/* Author and date */}
          <div className="mb-8 flex flex-wrap gap-3">
            <div className="h-4 w-32 rounded bg-gray-200" />
            <div className="h-4 w-24 rounded bg-gray-200" />
          </div>

          {/* Featured image */}
          <div className="mb-8 aspect-[16/9] w-full rounded-2xl bg-gray-200" />

          {/* Article content */}
          <div className="space-y-4">
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-11/12 rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />

            <div className="h-6 w-2/3 rounded bg-gray-200" />

            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-10/12 rounded bg-gray-200" />
            <div className="h-4 w-4/5 rounded bg-gray-200" />
          </div>
        </article>
      ) : (
        <main className="min-h-screen bg-white">
          {/* Hero placeholder */}
          <section className="bg-[#F7F9FC] px-4 py-14 sm:px-6 sm:py-20">
            <div className="mx-auto max-w-[1200px]">
              <div className="mb-4 h-4 w-36 rounded bg-gray-200" />
              <div className="mb-4 h-9 w-full max-w-xl rounded bg-gray-200 sm:h-11" />
              <div className="h-5 w-full max-w-2xl rounded bg-gray-200" />
              <div className="mt-3 h-5 w-3/4 max-w-lg rounded bg-gray-200" />
            </div>
          </section>

          <div className="mx-auto w-full max-w-[1200px] px-4 pb-12 sm:px-6 lg:px-8">
            {/* Featured article */}
            <section className="mb-10 mt-6">
              <div className="mb-4 h-4 w-36 rounded bg-gray-200" />

              <div className="grid min-w-0 overflow-hidden rounded-2xl border border-gray-100 md:grid-cols-2">
                <div className="aspect-[16/10] min-h-[210px] bg-gray-200 md:min-h-[290px]" />

                <div className="flex flex-col justify-center gap-4 p-5 sm:p-7 lg:p-9">
                  <div className="h-5 w-28 rounded-full bg-gray-200" />
                  <div className="h-7 w-full rounded bg-gray-200" />
                  <div className="h-7 w-4/5 rounded bg-gray-200" />

                  <div className="mt-2 h-4 w-full rounded bg-gray-200" />
                  <div className="h-4 w-full rounded bg-gray-200" />
                  <div className="h-4 w-2/3 rounded bg-gray-200" />

                  <div className="mt-3 h-5 w-36 rounded bg-gray-200" />
                </div>
              </div>
            </section>

            {/* Latest articles heading */}
            <section className="mt-12">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div className="w-full">
                  <div className="mb-3 h-4 w-40 rounded bg-gray-200" />
                  <div className="h-7 w-52 rounded bg-gray-200" />
                </div>
                <div className="h-4 w-20 shrink-0 rounded bg-gray-200" />
              </div>

              {/* Article cards */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <article
                    key={index}
                    className="overflow-hidden rounded-2xl border border-gray-100"
                  >
                    <div className="aspect-[16/10] bg-gray-200" />

                    <div className="space-y-4 p-5">
                      <div className="h-4 w-28 rounded-full bg-gray-200" />
                      <div className="h-6 w-full rounded bg-gray-200" />
                      <div className="h-6 w-4/5 rounded bg-gray-200" />
                      <div className="h-4 w-full rounded bg-gray-200" />
                      <div className="h-4 w-5/6 rounded bg-gray-200" />
                      <div className="pt-2">
                        <div className="h-4 w-32 rounded bg-gray-200" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </main>
      )}
    </div>
  );
}
