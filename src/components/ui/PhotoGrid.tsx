// src/components/ui/PhotoGrid.tsx
import React, { useEffect, useState } from "react";

export type PhotoItem = {
  id: string;
  src: string;
  name?: string;
  description: string;
};

type Props = {
  images: { src: string; name?: string }[];
  storageKey?: string;
  cardHeight?: number;
};

export default function PhotoGrid({
  images,
  storageKey = "photo_descriptions_v1",
  cardHeight = 180,
}: Props) {
  const [items, setItems] = useState<PhotoItem[]>([]);

  useEffect(() => {
    const saved = (() => {
      try {
        const s = localStorage.getItem(storageKey);
        return s ? (JSON.parse(s) as Record<string, string>) : {};
      } catch {
        return {};
      }
    })();

    const next = images.map((img) => ({
      id: img.name || img.src,
      src: img.src,
      name: img.name,
      description: saved[img.name || img.src] ?? `Mô tả cho ${img.name ?? "ảnh"}`,
    }));

    setItems(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  useEffect(() => {
    const map: Record<string, string> = {};
    items.forEach((i) => (map[i.id] = i.description));
    try {
      localStorage.setItem(storageKey, JSON.stringify(map));
    } catch {}
  }, [items, storageKey]);

  function updateDescription(id: string, text: string) {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, description: text } : p)));
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 16,
      }}
    >
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #e6e6e6",
            borderRadius: 10,
            padding: 8,
            background: "#fff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: "100%",
              height: cardHeight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              borderRadius: 8,
              background: "#f8f9fb",
            }}
          >
            <img
              src={item.src}
              alt={item.name ?? item.id}
              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }}
            />
          </div>

          <div style={{ marginTop: 8 }}>
            <input
              type="text"
              value={item.name ?? ""}
              readOnly
              style={{ width: "100%", border: "none", background: "transparent", fontWeight: 600 }}
            />
          </div>

          <textarea
            value={item.description}
            onChange={(e) => updateDescription(item.id, e.target.value)}
            placeholder="Thêm mô tả..."
            style={{
              width: "100%",
              marginTop: 8,
              minHeight: 60,
              padding: 8,
              borderRadius: 6,
              border: "1px solid #ddd",
            }}
          />
        </div>
      ))}
    </div>
  );
}
