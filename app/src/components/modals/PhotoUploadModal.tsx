"use client";

import { useRef, useState, type DragEvent } from "react";
import { Sheet } from "@/components/dogworld/Sheet";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/dogworld/ToastProvider";

export type PhotoUploadModalProps = {
  open: boolean;
  onClose: () => void;
  /** Subject (e.g. "Astor", "Kull C") used in the title and toast */
  subject?: string;
};

export function PhotoUploadModal({
  open,
  onClose,
  subject,
}: PhotoUploadModalProps) {
  const showToast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<{
    name: string;
    url: string;
    size: number;
  } | null>(null);
  const [caption, setCaption] = useState("");
  const [dragOver, setDragOver] = useState(false);

  function reset() {
    setPreview(null);
    setCaption("");
    setDragOver(false);
  }

  function handleClose() {
    reset();
    onClose();
  }

  function loadFile(file: File) {
    if (!file.type.startsWith("image/")) {
      showToast("Bare bilde-filer er støttet", "error");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview({ name: file.name, url, size: file.size });
  }

  function onDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) loadFile(file);
  }

  function save() {
    if (!preview) return;
    showToast(
      `Bildet «${preview.name}» lagret${subject ? ` på ${subject}` : ""}`,
      "success",
    );
    handleClose();
  }

  return (
    <Sheet
      open={open}
      onClose={handleClose}
      title="Last opp bilde"
      subtitle={subject ? `Knytt et bilde til ${subject}` : undefined}
    >
      <div className="px-3 pb-2 flex flex-col gap-3">
        {!preview ? (
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            className={
              "block border-2 border-dashed rounded-card p-8 text-center cursor-pointer transition-colors " +
              (dragOver
                ? "border-forest-700 bg-forest-50"
                : "border-n-300 hover:border-n-500 hover:bg-n-50")
            }
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="sr-only"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) loadFile(f);
              }}
            />
            <div className="w-12 h-12 rounded-full bg-bg-card border border-n-200 grid place-items-center mx-auto mb-3 text-n-500">
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M3 8h3l2-2h8l2 2h3v12H3z" />
                <circle cx="12" cy="14" r="4" />
              </svg>
            </div>
            <div className="text-sm font-medium text-n-950">
              Slipp et bilde her, eller trykk for å velge
            </div>
            <div className="text-xs text-n-500 mt-1">
              JPG, PNG eller HEIC · maks 20 MB
            </div>
          </label>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="aspect-[4/3] bg-n-100 rounded-card overflow-hidden border border-n-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview.url}
                alt={preview.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-baseline justify-between text-xs text-n-500 font-mono">
              <span className="truncate">{preview.name}</span>
              <span className="flex-shrink-0 ml-2">
                {(preview.size / 1024).toFixed(0)} KB
              </span>
            </div>
            <button
              type="button"
              onClick={() => setPreview(null)}
              className="self-start text-xs text-forest-700 hover:text-forest-900 underline"
            >
              Velg annet bilde
            </button>
            <label className="block">
              <span className="text-sm font-medium text-n-950 block mb-1.5">
                Bildetekst (valgfritt)
              </span>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="F.eks. «BIS-1 NKK Bergen»"
                className="w-full bg-bg-card border border-n-300 rounded-btn px-3 py-2 text-sm focus:outline-none focus:border-forest-500"
              />
            </label>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2 border-t border-n-100">
          <Button variant="ghost" size="sm" onClick={handleClose}>
            Avbryt
          </Button>
          <Button
            variant="primary"
            size="sm"
            state={preview ? "default" : "disabled"}
            onClick={save}
          >
            Lagre bilde
          </Button>
        </div>
      </div>
    </Sheet>
  );
}
