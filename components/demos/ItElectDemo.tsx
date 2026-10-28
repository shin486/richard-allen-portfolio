"use client";

import React, { useState } from "react";
import { ExternalLink, Moon, Sun } from "lucide-react";

interface CourseItem {
  id: string;
  code: string;
  name: string;
  instructor: string;
}

interface ReviewResult {
  summary: string;
  strengths: string[];
  improvements: string[];
  score: number;
  readiness: "Ready for Submission" | "Needs Minor Revisions" | "Needs Major Work";
}

interface SubmissionItem {
  id: string;
  courseCode: string;
  repoUrl: string;
  status: "Pending" | "Reviewed";
  submittedAt: string;
  review: ReviewResult | null;
}

// Synced with ITELECT4 src/store/coursesStore.ts, submissionStore.ts & src/ai/gemini.ts
const INITIAL_COURSES: CourseItem[] = [
  {
    id: "1",
    code: "ITELECT4",
    name: "IT Elective 4",
    instructor: "Prof. Santos",
  },
  {
    id: "2",
    code: "ITELECT3",
    name: "IT Elective 3",
    instructor: "Prof. Reyes",
  },
  {
    id: "3",
    code: "CSSWENG",
    name: "Software Engineering",
    instructor: "Prof. Cruz",
  },
];

const INITIAL_SUBMISSIONS: SubmissionItem[] = [
  {
    id: "sub-1",
    courseCode: "ITELECT4",
    repoUrl: "https://github.com/shin486/itelect4-project",
    status: "Reviewed",
    submittedAt: "2026-10-24",
    review: {
      summary:
        "Full-stack React 19 + TypeScript + Zustand submission tracker with Express & Prisma PostgreSQL backend and structured Gemini 2.5 Flash JSON schema validation.",
      strengths: [
        "Clean separation of Zustand stores (authStore, coursesStore, submissionStore, uiStore) with localStorage persistence",
        "Strict Zod schema validation (ReviewResultSchema) enforcing structured JSON output from @google/genai",
        "Deployed frontend & backend on Vercel with Prisma PostgreSQL integration",
      ],
      improvements: [
        "Add optimistic UI rollback when backend API latency exceeds 3 seconds",
        "Include Vitest unit tests for coursesStore and submissionStore actions",
      ],
      score: 96,
      readiness: "Ready for Submission",
    },
  },
  {
    id: "sub-2",
    courseCode: "CSSWENG",
    repoUrl: "https://github.com/shin486/ShinPay-",
    status: "Reviewed",
    submittedAt: "2026-10-22",
    review: {
      summary:
        "Enterprise Philippine payroll web application featuring 2025 SSS, PhilHealth (5%), Pag-IBIG, and BIR TRAIN withholding tax calculation engines.",
      strengths: [
        "Accurate implementation of 2025 Philippine statutory deduction brackets in lib/payroll-engine.ts",
        "Multi-entity architecture supporting multiple businesses and automated payslip generation",
      ],
      improvements: [
        "Add PDF batch export for BIR Form 2316 annual alphalist reporting",
      ],
      score: 94,
      readiness: "Ready for Submission",
    },
  },
  {
    id: "sub-3",
    courseCode: "ITELECT3",
    repoUrl: "https://github.com/shin486/auto-avenue-ims",
    status: "Pending",
    submittedAt: "2026-10-25",
    review: null,
  },
];

const READINESS_STYLE: Record<ReviewResult["readiness"], string> = {
  "Ready for Submission": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  "Needs Minor Revisions": "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  "Needs Major Work": "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
};

export default function ItElectDemo() {
  const [page, setPage] = useState<"dashboard" | "courses" | "submissions" | "review">("dashboard");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [courses, setCourses] = useState<CourseItem[]>(INITIAL_COURSES);
  const [submissions, setSubmissions] = useState<SubmissionItem[]>(INITIAL_SUBMISSIONS);

  // CoursesPage state
  const [newCode, setNewCode] = useState("");
  const [newName, setNewName] = useState("");
  const [newInstructor, setNewInstructor] = useState("");

  // SubmissionsPage state
  const [subCourseCode, setSubCourseCode] = useState("ITELECT4");
  const [subRepoUrl, setSubRepoUrl] = useState("");

  // ReviewPage state
  const [selectedSubId, setSelectedSubId] = useState("sub-1");
  const [isGenerating, setIsGenerating] = useState(false);

  const selectedSub =
    submissions.find((s) => s.id === selectedSubId) || submissions[0];

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim() || !newName.trim()) return;
    setCourses((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        code: newCode.trim().toUpperCase(),
        name: newName.trim(),
        instructor: newInstructor.trim() || "Prof. Liman",
      },
    ]);
    setNewCode("");
    setNewName("");
    setNewInstructor("");
  };

  const handleRemoveCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const handleAddSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subRepoUrl.trim()) return;
    const newId = `sub-${Date.now()}`;
    const newItem: SubmissionItem = {
      id: newId,
      courseCode: subCourseCode,
      repoUrl: subRepoUrl.trim(),
      status: "Pending",
      submittedAt: new Date().toISOString().slice(0, 10),
      review: null,
    };
    setSubmissions((prev) => [newItem, ...prev]);
    setSubRepoUrl("");
    setSelectedSubId(newId);
  };

  const handleGenerateReview = () => {
    if (!selectedSub) return;
    setIsGenerating(true);
    setTimeout(() => {
      const repoName = selectedSub.repoUrl.split("/").pop() || "repository";
      const generated: ReviewResult = {
        summary: `Gemini 2.5 Flash audit of ${repoName} for ${selectedSub.courseCode}: Well-structured project repository with clear modular separation and clean commit history.`,
        strengths: [
          `Follows ${selectedSub.courseCode} rubric standards with modular component hierarchy`,
          "Clean TypeScript/ESLint configuration and well-documented README setup",
          "Proper state management and API error handling patterns",
        ],
        improvements: [
          "Add automated end-to-end integration tests for edge-case user inputs",
          "Include API response caching headers to reduce cold-start latency",
        ],
        score: 93,
        readiness: "Ready for Submission",
      };
      setSubmissions((prev) =>
        prev.map((s) =>
          s.id === selectedSub.id ? { ...s, status: "Reviewed", review: generated } : s
        )
      );
      setIsGenerating(false);
    }, 450);
  };

  const reviewedCount = submissions.filter((s) => s.status === "Reviewed").length;

  return (
    /* Exact Layout.tsx from C:\Users\Richard Allen\Desktop\ITELECT4\itelect4-project\src\components\Layout.tsx */
    <div className={isDarkMode ? "dark w-full h-full" : "w-full h-full"}>
      <div className="w-full h-full flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans select-none overflow-hidden">
        {/* Exact Top Navbar from Layout.tsx */}
        <nav className="flex flex-wrap items-center gap-1.5 border-b border-gray-200 bg-white px-3.5 py-2.5 dark:border-gray-700 dark:bg-gray-800 shrink-0">
          <span className="mr-2 font-bold text-[13px] text-gray-900 dark:text-white">
            Submission Tracker
          </span>

          {(
            [
              { id: "dashboard", label: "Dashboard" },
              { id: "courses", label: "Courses" },
              { id: "submissions", label: "Submissions" },
              { id: "review", label: "AI Review" },
            ] as const
          ).map((nav) => {
            const active = page === nav.id;
            return (
              <button
                key={nav.id}
                type="button"
                onClick={() => setPage(nav.id)}
                className={`rounded px-2.5 py-1 text-[11.5px] transition-colors ${
                  active
                    ? "bg-blue-600 font-semibold text-white"
                    : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {nav.label}
              </button>
            );
          })}

          <div className="ml-auto flex items-center gap-1.5">
            <a
              href="https://itelect4-project-nine.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded border border-blue-200 bg-blue-50 px-2 py-1 text-[10.5px] font-semibold text-blue-700 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300"
              title="Open Live Deployed Vercel App"
            >
              Live Vercel App <ExternalLink className="w-3 h-3" />
            </a>

            <button
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="rounded bg-gray-800 px-2.5 py-1 text-[11px] font-medium text-white dark:bg-gray-200 dark:text-gray-900 flex items-center gap-1"
            >
              {isDarkMode ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
              {isDarkMode ? "Light" : "Dark"}
            </button>
          </div>
        </nav>

        {/* Main Outlet Content from DashboardPage.tsx, CoursesPage.tsx, SubmissionsPage.tsx, ReviewPage.tsx */}
        <main className="flex-1 overflow-y-auto p-3.5 space-y-3">
          {/* PAGE 1: DashboardPage.tsx */}
          {page === "dashboard" && (
            <div className="space-y-3">
              <div>
                <h1 className="text-base font-bold text-gray-900 dark:text-white">
                  Dashboard
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Overview of your courses and project submissions.
                </p>
              </div>

              {/* UserCard.tsx */}
              <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-2xs dark:border-gray-700 dark:bg-gray-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">
                    Richard Allen Liman
                  </p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    richard_allen_liman@dlsl.edu.ph · Role: Student (BSIT)
                  </p>
                </div>
                <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10.5px] font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                  Authenticated
                </span>
              </div>

              {/* 3 Stat Cards from DashboardPage.tsx */}
              <div className="grid grid-cols-3 gap-2.5">
                <div
                  onClick={() => setPage("courses")}
                  className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3 shadow-2xs hover:border-blue-400 dark:border-gray-700 dark:bg-gray-800"
                >
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">Courses</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {courses.length}
                  </p>
                </div>
                <div
                  onClick={() => setPage("submissions")}
                  className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3 shadow-2xs hover:border-blue-400 dark:border-gray-700 dark:bg-gray-800"
                >
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">Submissions</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {submissions.length}
                  </p>
                </div>
                <div
                  onClick={() => setPage("review")}
                  className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3 shadow-2xs hover:border-blue-400 dark:border-gray-700 dark:bg-gray-800"
                >
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">AI Reviews</p>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {reviewedCount}
                  </p>
                </div>
              </div>

              {/* Courses Overview Grid from DashboardPage.tsx */}
              <div>
                <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                  Courses Overview
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="rounded-lg border border-gray-200 bg-white p-3 shadow-2xs dark:border-gray-700 dark:bg-gray-800"
                    >
                      <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                        {course.code}
                      </span>
                      <h3 className="mt-1.5 text-xs font-bold text-gray-900 dark:text-white">
                        {course.name}
                      </h3>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">
                        {course.instructor}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PAGE 2: CoursesPage.tsx */}
          {page === "courses" && (
            <div className="space-y-3">
              <div>
                <h1 className="text-base font-bold text-gray-900 dark:text-white">
                  Courses
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Manage enrolled courses in Zustand coursesStore.
                </p>
              </div>

              <form
                onSubmit={handleAddCourse}
                className="grid grid-cols-1 sm:grid-cols-4 gap-2 rounded-lg border border-gray-200 bg-white p-3 shadow-2xs dark:border-gray-700 dark:bg-gray-800"
              >
                <input
                  type="text"
                  placeholder="Code (e.g. CSARCH2)"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="rounded border border-gray-300 px-2.5 py-1.5 text-xs dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Course Name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="rounded border border-gray-300 px-2.5 py-1.5 text-xs dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Instructor"
                  value={newInstructor}
                  onChange={(e) => setNewInstructor(e.target.value)}
                  className="rounded border border-gray-300 px-2.5 py-1.5 text-xs dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <button
                  type="submit"
                  className="rounded bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
                >
                  + Add Course
                </button>
              </form>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-3 shadow-2xs dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div>
                      <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                        {course.code}
                      </span>
                      <h3 className="mt-1 text-xs font-bold text-gray-900 dark:text-white">
                        {course.name}
                      </h3>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">
                        {course.instructor}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveCourse(course.id)}
                      className="mt-2 self-start text-[11px] font-medium text-red-600 hover:underline dark:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PAGE 3: SubmissionsPage.tsx */}
          {page === "submissions" && (
            <div className="space-y-3">
              <div>
                <h1 className="text-base font-bold text-gray-900 dark:text-white">
                  Submissions
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Submit your GitHub repository for AI-powered code review.
                </p>
              </div>

              <form
                onSubmit={handleAddSubmission}
                className="flex flex-wrap gap-2 rounded-lg border border-gray-200 bg-white p-3 shadow-2xs dark:border-gray-700 dark:bg-gray-800"
              >
                <select
                  value={subCourseCode}
                  onChange={(e) => setSubCourseCode(e.target.value)}
                  className="rounded border border-gray-300 px-2.5 py-1.5 text-xs dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.code}>
                      {c.code} — {c.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="https://github.com/username/repo"
                  value={subRepoUrl}
                  onChange={(e) => setSubRepoUrl(e.target.value)}
                  className="flex-1 min-w-[180px] rounded border border-gray-300 px-2.5 py-1.5 text-xs dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <button
                  type="submit"
                  className="rounded bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
                >
                  Submit Repository
                </button>
              </form>

              <div className="space-y-2">
                {submissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 shadow-2xs dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-gray-100 px-2 py-0.5 text-[10.5px] font-bold text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                          {sub.courseCode}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            sub.status === "Reviewed"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                              : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                          }`}
                        >
                          {sub.status}
                        </span>
                      </div>
                      <p className="mt-1 truncate text-xs font-medium text-blue-600 dark:text-blue-400">
                        {sub.repoUrl}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSubId(sub.id);
                        setPage("review");
                      }}
                      className="ml-2 shrink-0 rounded bg-blue-600 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-blue-700"
                    >
                      {sub.review ? "View AI Review" : "Run AI Review"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PAGE 4: ReviewPage.tsx (Exact Gemini Structured Output UI) */}
          {page === "review" && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h1 className="text-base font-bold text-gray-900 dark:text-white">
                    AI Code Review
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Powered by Google Gemini 2.5 Flash + Zod ReviewResultSchema
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedSub.id}
                    onChange={(e) => setSelectedSubId(e.target.value)}
                    className="rounded border border-gray-300 bg-white px-2.5 py-1 text-xs dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  >
                    {submissions.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.courseCode} — {s.repoUrl.replace("https://github.com/", "")}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleGenerateReview}
                    disabled={isGenerating}
                    className="rounded bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isGenerating
                      ? "Reviewing..."
                      : selectedSub.review
                      ? "Re-run Review"
                      : "Generate Review"}
                  </button>
                </div>
              </div>

              {selectedSub.review ? (
                <div className="rounded-lg border border-gray-200 bg-white p-3.5 shadow-2xs dark:border-gray-700 dark:bg-gray-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-gray-900 dark:text-white">
                      {selectedSub.courseCode} ·{" "}
                      <span className="text-blue-600 dark:text-blue-400">
                        {selectedSub.repoUrl.replace("https://github.com/", "")}
                      </span>
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold ${
                        READINESS_STYLE[selectedSub.review.readiness]
                      }`}
                    >
                      {selectedSub.review.readiness}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    {selectedSub.review.summary}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <p className="mb-1 text-[11px] font-semibold text-gray-700 dark:text-gray-200">
                        Strengths
                      </p>
                      <ul className="space-y-1">
                        {selectedSub.review.strengths.map((s, i) => (
                          <li
                            key={i}
                            className="flex gap-1.5 text-[11px] text-gray-600 dark:text-gray-300"
                          >
                            <span className="font-bold text-emerald-500">+</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="mb-1 text-[11px] font-semibold text-gray-700 dark:text-gray-200">
                        Areas for Improvement
                      </p>
                      <ul className="space-y-1">
                        {selectedSub.review.improvements.map((imp, i) => (
                          <li
                            key={i}
                            className="flex gap-1.5 text-[11px] text-gray-600 dark:text-gray-300"
                          >
                            <span className="font-bold text-amber-500">-</span>
                            <span>{imp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-2 text-[11px] text-gray-500 dark:border-gray-700 dark:text-gray-400 flex items-center justify-between">
                    <span>
                      Suggested Score:{" "}
                      <strong className="text-sm text-gray-900 dark:text-white">
                        {selectedSub.review.score}/100
                      </strong>
                    </span>
                    <span>Validated via Zod ReviewResultSchema</span>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-gray-300 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    This submission has not been reviewed by Gemini AI yet.
                  </p>
                  <button
                    type="button"
                    onClick={handleGenerateReview}
                    className="rounded bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
                  >
                    Generate Gemini 2.5 Flash Review
                  </button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
