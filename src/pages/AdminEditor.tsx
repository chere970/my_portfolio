import { useEffect, useMemo, useState } from "react";
import { siteContentSchema, defaultSiteContent } from "@/data/site-content";
import { useSiteContent } from "@/context/site-content-context";
import { toast } from "sonner";

const authSessionKey = "portfolio-admin-authenticated";
const fallbackPasscode = "change-me";

const AdminEditor = () => {
  const { content, replaceContent, resetContent } = useSiteContent();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.sessionStorage.getItem(authSessionKey) === "true";
  });
  const [passcode, setPasscode] = useState("");
  const [editorValue, setEditorValue] = useState("");

  const configuredPasscode =
    import.meta.env.VITE_ADMIN_EDITOR_PASSCODE ?? fallbackPasscode;
  const prettyContent = useMemo(
    () => JSON.stringify(content, null, 2),
    [content],
  );

  useEffect(() => {
    setEditorValue(prettyContent);
  }, [prettyContent]);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    if (passcode.trim() !== configuredPasscode) {
      toast.error("Invalid passcode");
      return;
    }

    window.sessionStorage.setItem(authSessionKey, "true");
    setIsAuthenticated(true);
    setPasscode("");
    toast.success("Admin mode enabled");
  };

  const handleSave = () => {
    let parsedContent: unknown;

    try {
      parsedContent = JSON.parse(editorValue);
    } catch {
      toast.error("Invalid JSON format");
      return;
    }

    const validated = siteContentSchema.safeParse(parsedContent);
    if (!validated.success) {
      const issue = validated.error.issues[0];
      const location = issue.path.length > 0 ? issue.path.join(".") : "root";
      toast.error(`Invalid content at ${location}: ${issue.message}`);
      return;
    }

    replaceContent(validated.data);
    toast.success("Content saved");
  };

  const handleReset = () => {
    resetContent();
    setEditorValue(JSON.stringify(defaultSiteContent, null, 2));
    toast.success("Content reset to defaults");
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem(authSessionKey);
    setIsAuthenticated(false);
    toast.success("Logged out");
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-background text-foreground px-6 py-20">
        <div className="mx-auto max-w-md glass rounded-xl p-8">
          <h1 className="text-2xl font-bold font-heading mb-2">Admin Editor</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Enter the admin passcode to edit live portfolio content.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={passcode}
              onChange={(event) => setPasscode(event.target.value)}
              placeholder="Admin passcode"
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              required
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Unlock editor
            </button>
          </form>
          {configuredPasscode === fallbackPasscode && (
            <p className="text-xs text-amber-500 mt-4">
              Security warning: set VITE_ADMIN_EDITOR_PASSCODE in your
              environment to override the default passcode.
            </p>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold font-heading">
              Admin Content Editor
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Edit portfolio copy as JSON and save instantly to browser storage.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setEditorValue(prettyContent)}
              className="px-4 py-2 rounded-md border border-border text-sm hover:bg-secondary transition-colors"
            >
              Reload latest
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 rounded-md border border-border text-sm hover:bg-secondary transition-colors"
            >
              Reset defaults
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 rounded-md border border-border text-sm hover:bg-secondary transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="glass rounded-xl p-4">
          <label
            htmlFor="content-editor"
            className="block text-sm font-medium mb-3"
          >
            Site content JSON
          </label>
          <textarea
            id="content-editor"
            value={editorValue}
            onChange={(event) => setEditorValue(event.target.value)}
            className="w-full h-[62vh] rounded-lg bg-secondary border border-border p-4 font-mono text-sm text-foreground focus:outline-none focus:border-primary/50"
            spellCheck={false}
          />
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Save content
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminEditor;
