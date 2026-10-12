"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Star } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay } from "swiper/modules";

import "swiper/css";

import { googleReviews } from "@/data/testimonials";

/* Google Icon */
function GoogleIcon({ className = "h-7 w-7" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M43.6 24.5c0-1.5-.1-3-.4-4.4H24v8.3h11a9.4 9.4 0 0 1-4.1 6.2v5.2h6.7c3.9-3.6 6-8.9 6-15.3Z"
      />

      <path
        fill="#34A853"
        d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.7-5.2c-1.8 1.2-4 2-6.8 2-5.2 0-9.6-3.5-11.2-8.2H5.9v5.3A20.4 20.4 0 0 0 24 44Z"
      />

      <path
        fill="#FBBC05"
        d="M12.8 27.7a12.3 12.3 0 0 1 0-7.4V15H5.9a20.4 20.4 0 0 0 0 18l6.9-5.3Z"
      />

      <path
        fill="#EA4335"
        d="M24 12.1c3 0 5.7 1 7.8 3.1l5.9-5.9C34.1 5.9 29.5 4 24 4A20.4 20.4 0 0 0 5.9 15l6.9 5.3c1.6-4.7 6-8.2 11.2-8.2Z"
      />
    </svg>
  );
}

/* Star Rating */
function RatingStars({ rating = 5, size = 16 }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={size}
          strokeWidth={1.5}
          className={
            index < rating
              ? "fill-[#FBBC04] text-[#FBBC04]"
              : "fill-none text-[#D5D9E2]"
          }
        />
      ))}
    </div>
  );
}

/* Reviewer Avatar */
function ReviewerAvatar({ photo, name }) {
  const [imageError, setImageError] = useState(false);

  const initial = name?.trim()?.charAt(0)?.toUpperCase() || "G";

  if (photo && !imageError) {
    return (
      <img
        src={photo}
        alt={`${name} profile`}
        width={44}
        height={44}
        className="h-11 w-11 shrink-0 rounded-full border border-[#E8ECF3] bg-[#EDF3FF] object-cover"
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setImageError(true)}
      />
    );
  }

  return (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EDF3FF] text-sm font-semibold text-[#2852A0]"
      aria-label={`${name} avatar`}
    >
      {initial}
    </div>
  );
}

/* Single Review Card */
function ReviewCard({ review }) {
  return (
    <article className="flex h-[310px] flex-col overflow-hidden rounded-xl border border-[#E8ECF3] bg-white p-5 transition-colors duration-200 hover:border-[#C9D7F0] sm:p-6">
      {/* Reviewer Information */}
      <div className="flex shrink-0 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <ReviewerAvatar photo={review.photo} name={review.name} />

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-[#081828]">
              {review.name}
            </h3>

            <p className="mt-1 text-xs text-[#888888]">{review.date}</p>
          </div>
        </div>

        <GoogleIcon className="h-6 w-6 shrink-0" />
      </div>

      {/* Rating */}
      <div className="mt-5 shrink-0">
        <RatingStars rating={review.rating} />
      </div>

      {/* Review Content: Maximum 4 Lines */}
      <div className="mt-4 min-h-0 flex-1 overflow-hidden">
        <p
          className="line-clamp-4 text-sm leading-7 text-[#666666]"
          title={review.content}
        >
          {review.content}
        </p>
      </div>
    </article>
  );
}

/* Testimonials Section */
export default function TestimonialsSection() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { business, reviews } = googleReviews;

  return (
    <section id="testimonials" className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="overflow-hidden rounded-2xl border border-[#E2E8F2] bg-white">
          {/* Google Business Header */}
          <div className="flex flex-col gap-5 border-b border-[#E9EDF4] px-5 py-6 sm:px-7 md:flex-row md:items-center md:justify-between md:px-8">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#E7ECF4] bg-white shadow-sm">
                <GoogleIcon className="h-8 w-8" />
              </div>

              <div className="min-w-0">
                <h2 className="text-lg font-bold tracking-tight text-[#081828] sm:text-xl">
                  {business.name}
                </h2>

                <p className="mt-1 text-sm text-[#777777]">
                  {business.category}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-[#081828]">
                    {Number(business.rating).toFixed(1)}
                  </span>

                  <RatingStars rating={Math.round(business.rating)} size={16} />

                  <span className="text-sm text-[#777777]">
                    {business.totalReviews} Google reviews
                  </span>
                </div>
              </div>
            </div>

            <a
              href={business.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-lg bg-[#2852A0] px-5 py-3 text-sm font-semibold !text-white transition-colors hover:bg-[#1F4386] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2852A0] md:self-center"
            >
              <span className="!text-white">View All Reviews</span>
              <ExternalLink size={15} className="text-white" />
            </a>
          </div>

          {/* Review Slider */}
          <div className="px-5 py-8 sm:px-7 sm:py-10 lg:px-8 lg:py-12">
            {/* Section Heading */}
            <div className="mb-8 flex flex-col gap-5 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl">
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#2852A0]">
                  Customer Experiences
                </span>

                <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-[#081828] sm:text-3xl">
                  What Our Customers Say
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#777777] sm:text-base">
                  Read customer feedback and explore more reviews directly on
                  Google.
                </p>
              </div>

              {/* Slider Navigation */}
              <div className="flex shrink-0 items-center gap-2">
                <button
                  ref={prevRef}
                  type="button"
                  aria-label="Previous reviews"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E2E8F2] bg-white text-[#2852A0] transition-colors hover:border-[#2852A0] hover:bg-[#2852A0] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2852A0]"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  ref={nextRef}
                  type="button"
                  aria-label="Next reviews"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E2E8F2] bg-white text-[#2852A0] transition-colors hover:border-[#2852A0] hover:bg-[#2852A0] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2852A0]"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <Swiper
              modules={[Navigation, A11y, Autoplay]}
              spaceBetween={18}
              slidesPerView={1}
              watchOverflow
              loop={reviews.length > 3}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={700}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                if (swiper.params.navigation) {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 18,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
              className="!overflow-hidden"
            >
              {reviews.map((review, index) => (
                <SwiperSlide
                  key={review.id ?? `${review.name}-${index}`}
                  className="!h-auto"
                >
                  <ReviewCard review={review} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
