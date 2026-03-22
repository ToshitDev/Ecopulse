/* eslint-disable @next/next/no-img-element */

"use client";

import { useEffect, useRef, useState } from "react";
import { AnalysisCard } from "@/components/analysis-card";
import { SectionHeading } from "@/components/section-heading";
import { toAnalysisResult } from "@/lib/ai-analysis";
import { isMarketplaceAction } from "@/lib/listing-routing";
import { getMockAnalysis } from "@/lib/mock-analysis";
import { useAppStore } from "@/lib/store";
import type { AnalysisResult } from "@/lib/types";

export function UploadFlow() {
  const { listings, postListing } = useAppStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [persistedImageUrl, setPersistedImageUrl] = useState<string>("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [message, setMessage] = useState("Choose a photo to generate a listing draft.");
  const analysisTimeoutRef = useRef<number | null>(null);
  const fileReadTokenRef = useRef(0);
  const routesToMarketplace = analysis ? isMarketplaceAction(analysis.recommendedAction) : false;
  const primaryCta =
    analysis?.cta ??
    (analysis?.recommendedAction === "dispose"
      ? "Send to Recovery Board"
      : analysis?.recommendedAction === "recycle"
        ? "Send to Recovery Board"
        : analysis?.recommendedAction === "donate"
          ? "Send to Recovery Board"
          : "Post to Marketplace");

  useEffect(() => {
    return () => {
      if (analysisTimeoutRef.current) {
        window.clearTimeout(analysisTimeoutRef.current);
      }
    };
  }, []);

  const analyzeWithFallback = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/analyze-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Gemini analysis failed");
      }

      const payload = (await response.json()) as Parameters<typeof toAnalysisResult>[0];
      return toAnalysisResult(payload);
    } catch {
      return getMockAnalysis(file, listings.length);
    }
  };

  const handlePost = () => {
    if (!selectedFile || !analysis || !persistedImageUrl) {
      setMessage("Choose a file first so EcoPulse can draft the listing.");
      return;
    }

    postListing({
      ...analysis,
      imageUrl: persistedImageUrl,
      imageName: selectedFile.name,
    });

    setSelectedFile(null);
    setAnalysis(null);
    setPreviewUrl("");
    setPersistedImageUrl("");
    setMessage(
      routesToMarketplace
        ? "Item sent to Marketplace and ready to be claimed."
        : "Item sent to Recovery Board with the recommended next action.",
    );
  };

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Upload"
        title="Turn one photo into a clear routing decision"
        description="Upload a leftover item and let EcoPulse identify it, classify the material, and route it to Marketplace or Recovery Board."
      />

      <div className="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)] lg:items-start">
        <section className="surface-card rounded-[1.9rem] p-5 md:p-6">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--earth)]">
                Upload workspace
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
                One clear item photo
              </h3>
            </div>
            <div className="rounded-[1.15rem] bg-[#edf3ed] px-3 py-2 text-right">
              <p className="text-[11px] uppercase tracking-[0.14em] text-[color:var(--accent)]">
                {analysis ? "Recommended route" : "Pending AI review"}
              </p>
              <p className="mt-1 text-lg font-semibold text-[color:var(--foreground)]">
                {!analysis
                  ? "Waiting for analysis"
                  : analysis.recommendedAction === "dispose"
                  ? "Recovery Board"
                  : !routesToMarketplace
                    ? "Recovery Board"
                    : "Marketplace"}
              </p>
            </div>
          </div>

          <label
            htmlFor="item-photo"
            className="flex min-h-[22rem] cursor-pointer flex-col items-center justify-center rounded-[1.7rem] border border-dashed border-[color:var(--line-strong)] bg-[#f8f2e7] p-5 text-center"
          >
            {previewUrl ? (
              <div className="w-full space-y-3">
                <img
                  src={previewUrl}
                  alt="Selected upload preview"
                  className="h-64 w-full rounded-[1.35rem] border border-[color:var(--line)] object-cover"
                />
                <div className="rounded-[1.15rem] bg-white/70 px-4 py-3 text-left text-sm text-[color:var(--muted)]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--earth)]">
                    Selected file
                  </p>
                  <p className="mt-1 truncate">{selectedFile?.name}</p>
                </div>
              </div>
            ) : (
              <div className="max-w-sm space-y-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--earth)]">
                  Photo required
                </p>
                <div>
                  <p className="text-2xl font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
                    Upload one item photo
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                    Best for leftover cardboard, wood scraps, electronics parts, acrylic,
                    containers, fabric, or event materials.
                  </p>
                </div>
              </div>
            )}
          </label>

          <input
            id="item-photo"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;
              if (analysisTimeoutRef.current) {
                window.clearTimeout(analysisTimeoutRef.current);
                analysisTimeoutRef.current = null;
              }

              fileReadTokenRef.current += 1;
              const readToken = fileReadTokenRef.current;

              if (file) {
                setIsAnalyzing(true);
                setMessage("Reviewing the item and choosing the clearest next step...");
                setPersistedImageUrl("");
                const reader = new FileReader();
                reader.onload = () => {
                  if (readToken !== fileReadTokenRef.current) {
                    return;
                  }

                  const result = typeof reader.result === "string" ? reader.result : "";
                  setPreviewUrl(result);
                  setPersistedImageUrl(result);
                };
                reader.onerror = () => {
                  if (readToken !== fileReadTokenRef.current) {
                    return;
                  }

                  setPreviewUrl("");
                  setPersistedImageUrl("");
                  setIsAnalyzing(false);
                  setMessage("The image could not be loaded. Choose a different photo.");
                };
                reader.readAsDataURL(file);
                analysisTimeoutRef.current = window.setTimeout(() => {
                  void analyzeWithFallback(file).then((result) => {
                    if (readToken !== fileReadTokenRef.current) {
                      return;
                    }

                    setAnalysis(result);
                    setIsAnalyzing(false);
                    setMessage(
                      isMarketplaceAction(result.recommendedAction)
                        ? "Analysis ready. Send this item to Marketplace when it looks right."
                        : "Analysis ready. Send this item to Recovery Board.",
                    );
                  });
                }, 650);
              } else {
                setPreviewUrl("");
                setPersistedImageUrl("");
                setIsAnalyzing(false);
                setMessage("Choose a photo to generate a listing draft.");
              }

              setAnalysis(null);
              setSelectedFile(file);
            }}
          />

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <label
              htmlFor="item-photo"
              className="cursor-pointer rounded-[1.2rem] bg-[color:var(--accent)] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#3f6a54]"
            >
              {selectedFile ? "Choose a different photo" : "Choose photo"}
            </label>
            <button
              type="button"
              onClick={handlePost}
              disabled={!analysis || !persistedImageUrl || isAnalyzing}
              className={`rounded-[1.2rem] px-4 py-3.5 text-sm font-semibold transition ${
                analysis && persistedImageUrl && !isAnalyzing
                  ? "border border-[color:var(--line-strong)] bg-[#f7efe0] text-[color:var(--foreground)] hover:border-[color:var(--earth)]"
                  : "cursor-not-allowed border border-[color:var(--line)] bg-[#f6f0e6] text-[color:var(--muted)]"
              }`}
            >
              {primaryCta}
            </button>
          </div>

          <div className="mt-5 grid gap-3">
            <div className="rounded-[1.25rem] border border-[color:var(--line)] bg-[#fcf9f3] p-4 text-sm leading-6 text-[color:var(--muted)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--earth)]">
                Status
              </p>
              <p className="mt-2">{message}</p>
            </div>
            <div className="rounded-[1.25rem] bg-[#f3ede2] p-4 text-sm leading-6 text-[color:var(--muted)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--earth)]">
                Point system
              </p>
              <p className="mt-2">Post any committed item +10, claim reuse +50, resolve recovery +25, verified reuse +50 coming next</p>
            </div>
          </div>
        </section>

        <div>
          {isAnalyzing ? (
            <section className="surface-card rounded-[1.9rem] p-6 md:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--earth)]">
                AI item review
              </p>
              <h3 className="mt-4 text-[1.9rem] font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
                Reviewing the upload
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-[color:var(--muted)]">
                EcoPulse is drafting the item label, material type, routing guidance, and a quick
                impact estimate for this upload.
              </p>
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                <div className="rounded-[1.25rem] bg-[#f3ede2] p-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--earth)]">Title</p>
                  <p className="mt-2 text-sm text-[color:var(--muted)]">Estimating likely material</p>
                </div>
                <div className="rounded-[1.25rem] bg-[#edf3ed] p-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--accent)]">Reuse ideas</p>
                  <p className="mt-2 text-sm text-[color:var(--muted)]">Drafting practical next uses</p>
                </div>
                <div className="rounded-[1.25rem] bg-[#f4eee8] p-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--earth)]">Next step</p>
                  <p className="mt-2 text-sm text-[color:var(--muted)]">Preparing the routing recommendation</p>
                </div>
              </div>
            </section>
          ) : analysis ? (
            <AnalysisCard result={analysis} />
          ) : (
            <section className="surface-card rounded-[1.9rem] p-6 md:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--earth)]">
                Ready for AI review
              </p>
              <h3 className="mt-4 text-[1.9rem] font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
                A clean draft appears here
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-[color:var(--muted)]">
                Once a photo is selected, EcoPulse drafts a clean item summary with material
                context, routing guidance, and a quick impact estimate.
              </p>
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                <div className="rounded-[1.25rem] bg-[#f3ede2] p-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--earth)]">Title</p>
                  <p className="mt-2 text-sm text-[color:var(--muted)]">Clear item name</p>
                </div>
                <div className="rounded-[1.25rem] bg-[#edf3ed] p-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--accent)]">Impact</p>
                  <p className="mt-2 text-sm text-[color:var(--muted)]">Simple sustainability estimate</p>
                </div>
                <div className="rounded-[1.25rem] bg-[#f4eee8] p-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--earth)]">Next step</p>
                  <p className="mt-2 text-sm text-[color:var(--muted)]">Ready for the next step</p>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
