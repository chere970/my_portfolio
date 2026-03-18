import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import type { ResumeData } from "@/data/resume";

type GenerateOptions = {
  filename?: string;
};

const DEFAULT_FONT_SIZE = 10;
const HEADING_FONT_SIZE = 14;
const SECTION_TITLE_SIZE = 11;
const LINE_HEIGHT = 14;
const PAGE_MARGIN = 48;

const formatUrl = (url?: string) =>
  url ? url.replace(/^https?:\/\//, "") : undefined;

const buildContactLine = (resume: ResumeData) => {
  const { email, location, phone, website, github, linkedin } = resume.profile;
  const segments = [
    email,
    phone,
    location,
    formatUrl(website),
    formatUrl(github),
    formatUrl(linkedin),
  ].filter(Boolean);

  return segments.join(" • ");
};

const wrapText = (
  text: string,
  maxWidth: number,
  measure: (text: string) => number,
) => {
  const words = text.replace(/\s+/g, " ").trim().split(" ");
  const lines: string[] = [];
  let current = "";

  words.forEach((word) => {
    const test = current ? `${current} ${word}` : word;
    if (measure(test) <= maxWidth) {
      current = test;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  });

  if (current) lines.push(current);
  return lines;
};

const drawWrappedText = (params: {
  page: any;
  text: string;
  x: number;
  y: number;
  maxWidth: number;
  font: any;
  size: number;
  lineHeight: number;
  color?: ReturnType<typeof rgb>;
}) => {
  const {
    page,
    text,
    x,
    y,
    maxWidth,
    font,
    size,
    lineHeight,
    color = rgb(0, 0, 0),
  } = params;
  const lines = wrapText(text, maxWidth, (t) =>
    font.widthOfTextAtSize(t, size),
  );
  let currentY = y;

  lines.forEach((line) => {
    page.drawText(line, { x, y: currentY, size, font, color });
    currentY -= lineHeight;
  });

  return currentY;
};

export const generateResumePdf = async (resume: ResumeData) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]); // US Letter

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const { width, height } = page.getSize();
  const contentWidth = width - PAGE_MARGIN * 2;

  let cursorY = height - PAGE_MARGIN;

  page.drawText(resume.profile.name, {
    x: PAGE_MARGIN,
    y: cursorY,
    size: 18,
    font: fontBold,
    color: rgb(0.1, 0.1, 0.1),
  });

  cursorY -= 22;

  page.drawText(resume.profile.title, {
    x: PAGE_MARGIN,
    y: cursorY,
    size: HEADING_FONT_SIZE,
    font: fontRegular,
    color: rgb(0.25, 0.25, 0.25),
  });

  cursorY -= 18;

  const contactLine = buildContactLine(resume);
  cursorY = drawWrappedText({
    page,
    text: contactLine,
    x: PAGE_MARGIN,
    y: cursorY,
    maxWidth: contentWidth,
    font: fontRegular,
    size: DEFAULT_FONT_SIZE,
    lineHeight: LINE_HEIGHT,
    color: rgb(0.4, 0.4, 0.4),
  });

  cursorY -= 6;

  cursorY = drawWrappedText({
    page,
    text: resume.profile.summary,
    x: PAGE_MARGIN,
    y: cursorY,
    maxWidth: contentWidth,
    font: fontRegular,
    size: DEFAULT_FONT_SIZE,
    lineHeight: LINE_HEIGHT,
    color: rgb(0.2, 0.2, 0.2),
  });

  const drawSectionHeader = (label: string) => {
    cursorY -= 14;
    page.drawText(label.toUpperCase(), {
      x: PAGE_MARGIN,
      y: cursorY,
      size: SECTION_TITLE_SIZE,
      font: fontBold,
      color: rgb(0.2, 0.2, 0.2),
    });
    cursorY -= 10;
    page.drawLine({
      start: { x: PAGE_MARGIN, y: cursorY },
      end: { x: PAGE_MARGIN + contentWidth, y: cursorY },
      thickness: 1,
      color: rgb(0.85, 0.85, 0.85),
    });
    cursorY -= 12;
  };

  drawSectionHeader("Skills");

  resume.skills.forEach((group) => {
    const labelText = `${group.label}:`;
    const labelWidth = fontBold.widthOfTextAtSize(labelText, DEFAULT_FONT_SIZE);

    page.drawText(labelText, {
      x: PAGE_MARGIN,
      y: cursorY,
      size: DEFAULT_FONT_SIZE,
      font: fontBold,
      color: rgb(0.2, 0.2, 0.2),
    });

    cursorY = drawWrappedText({
      page,
      text: group.items.join(", "),
      x: PAGE_MARGIN + labelWidth + 8,
      y: cursorY,
      maxWidth: contentWidth - labelWidth - 8,
      font: fontRegular,
      size: DEFAULT_FONT_SIZE,
      lineHeight: LINE_HEIGHT,
      color: rgb(0.2, 0.2, 0.2),
    });

    cursorY -= 6;
  });

  drawSectionHeader("Experience");

  resume.experience.forEach((role) => {
    page.drawText(`${role.role} — ${role.company}`, {
      x: PAGE_MARGIN,
      y: cursorY,
      size: DEFAULT_FONT_SIZE + 1,
      font: fontBold,
      color: rgb(0.15, 0.15, 0.15),
    });

    cursorY -= 14;

    page.drawText(role.period, {
      x: PAGE_MARGIN,
      y: cursorY,
      size: DEFAULT_FONT_SIZE,
      font: fontRegular,
      color: rgb(0.45, 0.45, 0.45),
    });

    cursorY -= 12;

    role.highlights.forEach((item) => {
      const bullet = "•";
      page.drawText(bullet, {
        x: PAGE_MARGIN,
        y: cursorY,
        size: DEFAULT_FONT_SIZE,
        font: fontBold,
        color: rgb(0.2, 0.2, 0.2),
      });

      cursorY = drawWrappedText({
        page,
        text: item,
        x: PAGE_MARGIN + 12,
        y: cursorY,
        maxWidth: contentWidth - 12,
        font: fontRegular,
        size: DEFAULT_FONT_SIZE,
        lineHeight: LINE_HEIGHT,
        color: rgb(0.2, 0.2, 0.2),
      });

      cursorY -= 4;
    });

    cursorY -= 6;
  });

  drawSectionHeader("Projects");

  resume.projects.forEach((project) => {
    page.drawText(project.title, {
      x: PAGE_MARGIN,
      y: cursorY,
      size: DEFAULT_FONT_SIZE + 1,
      font: fontBold,
      color: rgb(0.15, 0.15, 0.15),
    });

    cursorY -= 14;

    cursorY = drawWrappedText({
      page,
      text: project.description,
      x: PAGE_MARGIN,
      y: cursorY,
      maxWidth: contentWidth,
      font: fontRegular,
      size: DEFAULT_FONT_SIZE,
      lineHeight: LINE_HEIGHT,
      color: rgb(0.2, 0.2, 0.2),
    });

    cursorY -= 4;

    cursorY = drawWrappedText({
      page,
      text: `Tech: ${project.tech.join(", ")}`,
      x: PAGE_MARGIN,
      y: cursorY,
      maxWidth: contentWidth,
      font: fontRegular,
      size: DEFAULT_FONT_SIZE,
      lineHeight: LINE_HEIGHT,
      color: rgb(0.3, 0.3, 0.3),
    });

    if (project.link) {
      cursorY -= 2;
      cursorY = drawWrappedText({
        page,
        text: `Link: ${project.link}`,
        x: PAGE_MARGIN,
        y: cursorY,
        maxWidth: contentWidth,
        font: fontRegular,
        size: DEFAULT_FONT_SIZE,
        lineHeight: LINE_HEIGHT,
        color: rgb(0.25, 0.25, 0.55),
      });
    }

    cursorY -= 8;
  });

  drawSectionHeader("Education");

  resume.education.forEach((edu) => {
    page.drawText(`${edu.degree} — ${edu.institution}`, {
      x: PAGE_MARGIN,
      y: cursorY,
      size: DEFAULT_FONT_SIZE + 1,
      font: fontBold,
      color: rgb(0.15, 0.15, 0.15),
    });

    cursorY -= 14;

    page.drawText(edu.period, {
      x: PAGE_MARGIN,
      y: cursorY,
      size: DEFAULT_FONT_SIZE,
      font: fontRegular,
      color: rgb(0.45, 0.45, 0.45),
    });

    cursorY -= 12;

    if (edu.details?.length) {
      edu.details.forEach((detail) => {
        const bullet = "•";
        page.drawText(bullet, {
          x: PAGE_MARGIN,
          y: cursorY,
          size: DEFAULT_FONT_SIZE,
          font: fontBold,
          color: rgb(0.2, 0.2, 0.2),
        });

        cursorY = drawWrappedText({
          page,
          text: detail,
          x: PAGE_MARGIN + 12,
          y: cursorY,
          maxWidth: contentWidth - 12,
          font: fontRegular,
          size: DEFAULT_FONT_SIZE,
          lineHeight: LINE_HEIGHT,
          color: rgb(0.2, 0.2, 0.2),
        });

        cursorY -= 4;
      });
    }

    cursorY -= 6;
  });

  return pdfDoc.save();
};

export const downloadResumePdf = async (
  resume: ResumeData,
  options: GenerateOptions = {},
) => {
  const pdfBytes = await generateResumePdf(resume);
  const filename =
    options.filename ??
    `${resume.profile.name.replace(/\s+/g, "_")}_Resume.pdf`;

  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
};
