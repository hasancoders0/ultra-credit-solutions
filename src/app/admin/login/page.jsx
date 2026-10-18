"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  LockKeyhole,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event) {
    event.preventDefault();

    if (loading) return;

    setError("");

    if (!identifier.trim() || !password) {
      setError("Please enter your email or username and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        cache: "no-store",
        body: JSON.stringify({
          identifier: identifier.trim(),
          password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        setError(
          data.message ||
            (response.status === 401
              ? "Invalid email/username or password."
              : "Unable to sign in. Please try again."),
        );
        return;
      }

      const requestedPath = searchParams.get("next");

      const destination =
        requestedPath?.startsWith("/admin/") &&
        !requestedPath.startsWith("//") &&
        requestedPath !== "/admin/login"
          ? requestedPath
          : "/admin";

      router.replace(destination);
      router.refresh();
    } catch (err) {
      console.error("Admin login request failed:", err);
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F5F7FB] px-4 py-10 sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#2852A0]/[0.04] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[#FF6B81]/[0.05] blur-3xl"
      />

      <div className="relative z-10 w-full max-w-[448px]">
        <div className="mb-8 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2852A0] text-white shadow-lg shadow-[#2852A0]/20">
              <ShieldCheck size={27} strokeWidth={2} />
            </div>

            <div>
              <p className="text-[18px] font-bold leading-tight tracking-tight text-[#081828]">
                Ultra Credit
              </p>
              <p className="mt-1 text-[11px] font-semibold tracking-[0.24em] text-[#2852A0]">
                SOLUTIONS USA
              </p>
            </div>
          </div>
        </div>

        <section className="rounded-[26px] border border-[#E5EAF3] bg-white p-6 shadow-[0_24px_80px_rgba(25,45,80,0.08)] sm:p-9">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#2852A0]/10 text-[#2852A0]">
            <LockKeyhole size={23} strokeWidth={1.8} />
          </div>

          <p className="mb-2 text-[12px] font-bold tracking-[0.2em] text-[#2852A0]">
            ADMIN PORTAL
          </p>

          <h1 className="text-[30px] font-bold leading-tight tracking-[-0.04em] text-[#081828]">
            Welcome back
          </h1>

          <p className="mt-1 text-sm leading-6 text-[#718096]">
            Sign in to manage your website and business content.
          </p>

          {error && (
            <div
              role="alert"
              aria-live="polite"
              className="mt-6 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-3.5 text-sm text-red-700"
            >
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-7 space-y-5">
            <div>
              <label
                htmlFor="admin-identifier"
                className="mb-2 block text-sm font-semibold text-[#081828]"
              >
                Email or Username
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3]"
                />

                <input
                  id="admin-identifier"
                  name="identifier"
                  type="text"
                  autoComplete="username"
                  autoCapitalize="none"
                  spellCheck={false}
                  required
                  maxLength={254}
                  value={identifier}
                  onChange={(event) => {
                    setIdentifier(event.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter your email or username"
                  disabled={loading}
                  className="h-12 w-full rounded-xl border border-[#DFE5EF] bg-white pl-11 pr-4 text-sm text-[#081828] outline-none transition placeholder:text-[#A0A9B8] focus:border-[#2852A0] focus:ring-4 focus:ring-[#2852A0]/10 disabled:cursor-not-allowed disabled:bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-2 block text-sm font-semibold text-[#081828]"
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  size={19}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3]"
                />

                <input
                  id="admin-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  maxLength={1024}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter your password"
                  disabled={loading}
                  className="h-12 w-full rounded-xl border border-[#DFE5EF] bg-white pl-11 pr-12 text-sm text-[#081828] outline-none transition placeholder:text-[#A0A9B8] focus:border-[#2852A0] focus:ring-4 focus:ring-[#2852A0]/10 disabled:cursor-not-allowed disabled:bg-gray-50"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  disabled={loading}
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#8994A6] transition hover:bg-gray-100 hover:text-[#2852A0] disabled:cursor-not-allowed"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2852A0] px-4 text-sm font-semibold text-white shadow-md shadow-[#2852A0]/15 transition hover:bg-[#21458A] focus:outline-none focus:ring-4 focus:ring-[#2852A0]/20 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <LoaderCircle size={19} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in to dashboard
                  <ArrowRight size={19} />
                </>
              )}
            </button>
          </form>

          {process.env.NODE_ENV === "development" && (
            <div className="mt-6 rounded-xl bg-[#F5F7FC] p-4">
              <p className="text-xs font-semibold text-[#2852A0]">
                Development testing only
              </p>
              <p className="mt-1 text-xs leading-5 text-[#718096]">
                Sign in using your registered email or username.
              </p>
            </div>
          )}
        </section>

        <footer className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-[#718096] transition hover:text-[#2852A0]"
          >
            Back to website
          </Link>

          <p className="mt-1 text-xs text-[#98A2B3]">
            © {new Date().getFullYear()} Ultra Credit Solutions USA
          </p>
        </footer>
      </div>
    </main>
  );
}

function LoginFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F7FB] px-4">
      <div
        role="status"
        className="flex items-center gap-3 rounded-xl border border-[#E5EAF3] bg-white px-5 py-4 text-sm text-[#718096] shadow-sm"
      >
        <LoaderCircle size={20} className="animate-spin text-[#2852A0]" />
        Loading admin login...
      </div>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <AdminLoginForm />
    </Suspense>
  );
}
