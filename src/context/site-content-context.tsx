import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  defaultSiteContent,
  siteContentSchema,
  siteContentStorageKey,
  type SiteContent,
} from "@/data/site-content";

type SiteContentPatch = {
  hero?: Partial<SiteContent["hero"]>;
  about?: Partial<SiteContent["about"]>;
  contact?: Partial<SiteContent["contact"]>;
  projects?: SiteContent["projects"];
  experiences?: SiteContent["experiences"];
  skillCategories?: SiteContent["skillCategories"];
};

type SiteContentContextValue = {
  content: SiteContent;
  replaceContent: (nextContent: SiteContent) => void;
  updateContent: (patch: SiteContentPatch) => void;
  resetContent: () => void;
};

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

const readStoredContent = () => {
  if (typeof window === "undefined") {
    return defaultSiteContent;
  }

  const rawContent = window.localStorage.getItem(siteContentStorageKey);
  if (!rawContent) {
    return defaultSiteContent;
  }

  try {
    const parsed = JSON.parse(rawContent);
    const validated = siteContentSchema.safeParse(parsed);

    if (!validated.success) {
      window.localStorage.removeItem(siteContentStorageKey);
      return defaultSiteContent;
    }

    return validated.data;
  } catch {
    window.localStorage.removeItem(siteContentStorageKey);
    return defaultSiteContent;
  }
};

export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<SiteContent>(readStoredContent);

  useEffect(() => {
    window.localStorage.setItem(siteContentStorageKey, JSON.stringify(content));
  }, [content]);

  const value = useMemo<SiteContentContextValue>(
    () => ({
      content,
      replaceContent: (nextContent) => {
        setContent(nextContent);
      },
      updateContent: (patch) => {
        setContent((previous) => ({
          ...previous,
          ...patch,
          hero: patch.hero
            ? { ...previous.hero, ...patch.hero }
            : previous.hero,
          about: patch.about
            ? { ...previous.about, ...patch.about }
            : previous.about,
          contact: patch.contact
            ? { ...previous.contact, ...patch.contact }
            : previous.contact,
        }));
      },
      resetContent: () => {
        setContent(defaultSiteContent);
      },
    }),
    [content],
  );

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error("useSiteContent must be used inside SiteContentProvider");
  }

  return context;
};
