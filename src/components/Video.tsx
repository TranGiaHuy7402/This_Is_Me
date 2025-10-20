import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Video = () => {
  const { t } = useLanguage();

  // 👉 Đặt link video mp4 trực tiếp tại đây:
  const videoUrl = "https://res.cloudinary.com/movielover/video/upload/v1760937341/aq7umjvz301zs59uwjtv.mp4"; 

  return (
    <section
      id="video"
      className="py-20 bg-gradient-to-br from-[hsl(var(--primary)/0.15)] via-[hsl(var(--accent)/0.15)] to-[hsl(var(--primary)/0.25)]"
    >
      <div className="container mx-auto px-4">
        {/* Tiêu đề */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
            {t.video.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.video.lead}</p>
        </div>

        {/* Video */}
        <div className="flex justify-center mb-12">
          <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-border bg-black/80">
            <div style={{ position: "relative", paddingTop: "56.25%" }}>
              <video
                src={videoUrl}
                className="absolute top-0 left-0 w-full h-full object-contain"
                controls
                playsInline
                autoPlay
                muted
              />
            </div>
          </div>
        </div>

        {/* Mô tả */}
        <div className="text-center">
          <p className="text-foreground/80 text-lg leading-relaxed max-w-3xl mx-auto">
            {t.video.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Video;
