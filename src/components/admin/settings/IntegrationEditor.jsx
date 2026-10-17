"use client";

import { useEffect, useState } from "react";
import { Code2, Save, X, AlertCircle, FileCode2 } from "lucide-react";

const initialCode = `<!-- Paste your integration code here -->
<!-- Example: Google Tag Manager, Meta Pixel, or an iframe -->`;

export default function IntegrationEditor({
  provider,
  initialValues,
  onClose,
  onSave,
}) {
  const [name, setName] = useState(initialValues?.name || provider.name || "");

  const [enabled, setEnabled] = useState(initialValues?.enabled || false);

  const [code, setCode] = useState(
    initialValues?.configuration?.code || initialCode,
  );

  const [placement, setPlacement] = useState(
    initialValues?.configuration?.placement || "body-end",
  );

  const [error, setError] = useState("");

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter an integration name.");
      return;
    }

    if (!code.trim()) {
      setError("Please paste your integration code.");
      return;
    }

    onSave({
      name: name.trim(),
      enabled,
      configuration: {
        code,
        placement,
        codeType: "html",
      },
    });
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/40 p-3 sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="integration-editor-title"
        className="my-auto flex max-h-[92vh] w-full max-w-[820px] flex-col overflow-hidden rounded-2xl border border-[#EEEEEE] bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-[#EEEEEE] px-5 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FA] text-[#2852A0]">
              <Code2 size={20} />
            </div>

            <div className="min-w-0">
              <h2
                id="integration-editor-title"
                className="text-base font-semibold text-[#081828]"
              >
                Configure Integration
              </h2>

              <p className="mt-0.5 truncate text-sm text-[#888888]">
                {provider.name}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close integration editor"
            className="rounded-lg p-2 text-[#777777] transition hover:bg-[#F5F5F5]"
          >
            <X size={19} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto"
        >
          <div className="space-y-5 p-5 sm:p-6">
            {/* Integration Name */}
            <div>
              <label
                htmlFor="integration-name"
                className="mb-2 block text-sm font-medium text-[#333333]"
              >
                Integration Name
              </label>

              <input
                id="integration-name"
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Google Tag Manager"
                className="h-10 w-full rounded-lg border border-[#EEEEEE] px-3 text-sm text-[#081828] outline-none transition focus:border-[#2852A0] focus:ring-2 focus:ring-[#2852A0]/10"
              />
            </div>

            {/* Enable Toggle */}
            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-[#EEEEEE] p-3">
              <div>
                <span className="block text-sm font-medium text-[#333333]">
                  Enable Integration
                </span>

                <span className="mt-1 block text-xs leading-5 text-[#888888]">
                  Save whether this integration should be enabled.
                </span>
              </div>

              <input
                type="checkbox"
                checked={enabled}
                onChange={(event) => setEnabled(event.target.checked)}
                className="h-4 w-4 shrink-0 accent-[#2852A0]"
              />
            </label>

            {/* Code Placement */}
            <div>
              <label
                htmlFor="integration-placement"
                className="mb-2 block text-sm font-medium text-[#333333]"
              >
                Code Placement
              </label>

              <select
                id="integration-placement"
                value={placement}
                onChange={(event) => setPlacement(event.target.value)}
                className="h-10 w-full rounded-lg border border-[#EEEEEE] bg-white px-3 text-sm text-[#081828] outline-none focus:border-[#2852A0]"
              >
                <option value="head">Head — Before page content</option>
                <option value="body-start">Body — Start of page</option>
                <option value="body-end">Body — End of page</option>
              </select>

              <p className="mt-1.5 text-xs leading-5 text-[#888888]">
                Use the placement recommended by your marketing platform. This
                preference needs a compatible website integration to take
                effect.
              </p>
            </div>

            {/* Code Editor */}
            <div>
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <label
                    htmlFor="integration-code"
                    className="block text-sm font-medium text-[#333333]"
                  >
                    Integration Code
                  </label>

                  <p className="mt-1 text-xs text-[#888888]">
                    Paste the complete code provided by your platform.
                  </p>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-md bg-[#F5F5F5] px-2 py-1 text-[10px] font-semibold text-[#666666]">
                  <FileCode2 size={12} />
                  HTML / JS / iframe
                </span>
              </div>

              <textarea
                id="integration-code"
                spellCheck={false}
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="off"
                rows={15}
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder={`<!-- Paste your complete code here -->

<script>
  // Your tracking code
</script>

<!-- Or an iframe embed -->`}
                className="min-h-[280px] w-full resize-y rounded-xl border border-[#253249] bg-[#0D1424] p-4 font-mono text-xs leading-6 text-[#C7D7F2] outline-none transition placeholder:text-[#68778F] focus:border-[#6B91D6] focus:ring-2 focus:ring-[#2852A0]/15 sm:min-h-[340px]"
              />

              <p className="mt-2 text-xs leading-5 text-[#888888]">
                The code is saved as text. It will not run until a secure,
                approved integration mechanism is implemented.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600"
              >
                <AlertCircle size={17} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 flex shrink-0 flex-col-reverse gap-3 border-t border-[#EEEEEE] bg-[#FCFCFC] px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#EEEEEE] bg-white px-4 py-2.5 text-sm font-semibold text-[#666666] transition hover:bg-[#F5F5F5]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2852A0] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#204584]"
            >
              <Save size={16} />
              Save Integration
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
