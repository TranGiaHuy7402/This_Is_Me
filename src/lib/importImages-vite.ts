// src/lib/importImages-vite.ts
export type ImageModule = {
  src: string;
  name?: string;
};

/**
 * Load ảnh (eager) từ src/assets/photos (thay đổi đường dẫn nếu bạn để chỗ khác)
 */
export function loadImagesEager(): ImageModule[] {
  // đổi đường dẫn nếu bạn để ảnh ở src/assets (ví dụ: '../assets/**/*...' hoặc '../assets/photos/**/*...')
  const modules = import.meta.glob('../assets/photos/**/*.{png,jpg,jpeg,webp,svg}', { eager: true });

  return Object.entries(modules).map(([path, mod]) => {
    const src = (mod as any).default || (mod as any);
    const parts = path.split('/');
    const filename = parts[parts.length - 1];
    const name = filename.replace(/\.[^/.]+$/, ''); // tên file không có ext
    return { src: String(src), name };
  });
}
