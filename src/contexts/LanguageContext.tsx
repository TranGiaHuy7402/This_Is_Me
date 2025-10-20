// src/contexts/LanguageContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

type Language = "vi" | "en";

interface Translations {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    aboutButton: string;
    galleryButton: string;
  };
  about: {
    title: string;
    name: string;
    birthDate: string;
    description: string;
  };
  contact: {
    title: string;
    subtitle: string;
  };
  gallery: {
    title: string;
    subtitle: string;
    photos: Array<{
      description: string;
    }>;
  };
  // ADDED: video section
  video: {
    title: string;
    lead: string; // short lead under title (optional)
    description: string; // longer paragraph below video
  };
  footer: {
    madeWith: string;
    copyright: string;
  };
}

const translations: Record<Language, Translations> = {
  vi: {
    hero: {
      title: "This is me!",
      subtitle: "Chào mừng đến với thế giới của tôi",
      description:
        "Đây là câu chuyện về thế giới tràn ngập đầy màu sắc của tôi tại nước Úc xinh đẹp, được thể hiện qua những bức ảnh sống động. Mỗi bức ảnh là một câu chuyện, mỗi khoảnh khắc là một kỷ niệm đáng nhớ. Cùng khám phá những khoảnh khắc đẹp nhất trong cuộc sống của tôi.",
      aboutButton: "Về tôi",
      galleryButton: "Xem album",
    },
    about: {
      title: "Về tôi",
      name: "Tôi tên là:",
      birthDate: "Sinh nhật tôi:",
      description:
        "Cuộc sống ở Úc của tôi là một hành trình tuyệt vời với vô vàn khoảnh khắc đáng nhớ. Tôi yêu thích việc ghi lại những giây phút đẹp đẽ và chia sẻ niềm vui với mọi người xung quanh.",
    },
    contact: {
      title: "Muốn biết thêm về tôi?",
      subtitle: "Bạn có thể khám phá thêm về tôi qua các kênh sau đây",
    },
    gallery: {
      title: "Album ảnh của tôi",
      subtitle: "Đây là những khoảnh khắc đẹp đẽ của tôi được lưu giữ qua từng bức ảnh",
      photos: [
        { description: "Hóa ra tôi khá phù hợp với sắc xanh lá này!" },
        { description: "Giữa vạn hoa khoe sắc, nụ cười rạng rỡ nở rộ" },
        { description: "Nụ cười rạng rỡ dưới ánh nắng rực rỡ" },
        { description: "Hãy thưởng thức view đẹp này bằng một ly rượu vang" },
        { description: "Tôi thích ăn tối ở những nhà hàng như này" },
        { description: "Làm choáng ngợp xung quanh bằng sắc trắng" },
        { description: "Tận hưởng một ngày đẹp trời" },
        { description: "Trên đường tới bãi biển" },
        { description: "Đi dạo cùng chồng tôi ở bến cảng" },
      ],
    },
    video: {
      title: "Video Giới thiệu",
      lead: "",
      description:
        "Đây là cuộc sống thường ngày của tôi tại nước Úc xinh đẹp này. Hi vọng bạn có thể cảm nhận được niềm vui và hạnh phúc trong từng khoảnh khắc.",
    },
    footer: {
      madeWith: "nhân dịp ngày Phụ nữ Việt Nam",
      copyright:
        "© 2025 This is me! - Tất cả ảnh và nội dung thuộc bản quyền của mẹ tôi và con trai yêu quý của bà ấy.",
    },
  },
  en: {
    hero: {
      title: "This is me!",
      subtitle: "Welcome to my world",
      description:
        "This is a story of my colorful journey in this beautiful Australia. Every photo is a story, every moment is a cherished memory. Explore the most beautiful moments in my life.",
      aboutButton: "About Me",
      galleryButton: "View Album",
    },
    about: {
      title: "About Me",
      name: "Full Name:",
      birthDate: "My Date of Birth:",
      description:
        "My life in Australia is a wonderful journey with countless memorable moments. I love capturing beautiful moments and sharing joy with people around me.",
    },
    contact: {
      title: "Wanna know more about me?",
      subtitle: "Explore more about me through the following channels",
    },
    gallery: {
      title: "My Photo Album",
      subtitle: "These are my beautiful moments captured in photos",
      photos: [
        { description: "Turns out I look so good in green!" },
        { description: "Among blooming flowers, a radiant smile bloom" },
        { description: "Shining smile under shining sunshine" },
        { description: "Let's enjoy this beautiful view with a glass of wine" },
        { description: "I'd love to enjoy dinner at restaurants like these" },
        { description: "Stunning the area with color of white" },
        { description: "Enjoy such a beautiful day outside" },
        { description: "On my way to the beach" },
        { description: "At the harbor with my husband" },
      ],
    },
    video: {
      title: "Video Introduction",
      lead: "",
      description:
        "This is my daily life in this beautiful Australia. Hope you can feel the joy and happiness in every moment.",
    },
    footer: {
      madeWith: "for Vietnamese Women's Day",
      copyright:
        "© 2025 This is me! - All photos and content are copyrighted to my mother and her lovely son.",
    },
  },
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("vi");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "vi" ? "en" : "vi"));
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
