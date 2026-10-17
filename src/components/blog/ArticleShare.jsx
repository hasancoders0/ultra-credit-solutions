"use client";

import { useState } from "react";

const shareOptions = [
  {
    name: "Facebook",
    label: "f",
    color: "hover:bg-[#1877F2] hover:text-white",
    getUrl: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: "LinkedIn",
    label: "in",
    color: "hover:bg-[#0A66C2] hover:text-white",
    getUrl: (url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    name: "X",
    label: "𝕏",
    color: "hover:bg-black hover:text-white",
    getUrl: (url, title) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
];

export default function ArticleShare({ title = "" }) {
  const [copied, setCopied] = useState(false);

  function getCurrentUrl() {
    return window.location.href;
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(getCurrentUrl());
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      window.prompt("Copy this article link:", getCurrentUrl());
    }
  }

  async function shareArticle() {
    const url = getCurrentUrl();

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch {
        // The user may cancel the native share dialog.
      }
    } else {
      await copyLink();
    }
  }

  function openShareWindow(option) {
    const url = getCurrentUrl();

    window.open(
      option.getUrl(url, title),
      "_blank",
      "noopener,noreferrer,width=700,height=500",
    );
  }

  return (
    <section className="mt-7 border-y border-[#EEEEEE] py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-bold text-[#081828]">
            Enjoyed this article?
          </h2>

          <p className="mt-1 text-xs text-[#777777]">
            Share it with someone who may find it helpful.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              type="button"
              onClick={() => openShareWindow(option)}
              aria-label={`Share on ${option.name}`}
              title={`Share on ${option.name}`}
              className={`flex h-10 min-w-10 items-center justify-center rounded-lg border border-[#E5E7EB] px-3 text-sm font-bold text-[#2852A0] transition-colors ${option.color}`}
            >
              {option.label}
            </button>
          ))}

          <button
            type="button"
            onClick={shareArticle}
            aria-label="Share article"
            className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#E5E7EB] px-3 text-xs font-semibold text-[#2852A0] transition-colors hover:bg-[#EEF3FC]"
          >
            Share
          </button>

          <button
            type="button"
            onClick={copyLink}
            className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#2852A0] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#1E417F]"
          >
            <span aria-hidden="true">↗</span>
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
      </div>
    </section>
  );
}