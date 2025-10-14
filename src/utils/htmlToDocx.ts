import { Document, Paragraph, TextRun, HeadingLevel, UnderlineType, Packer } from 'docx';
import { saveAs } from 'file-saver';

export async function exportToDocx (html: string, filename: string = 'document.docx') {
  const doc = new Document({
    styles: {
      paragraphStyles: [{
        id: 'Normal',
        name: 'Normal',
        run: {
          size: 24, // 默认12pt (24 half-points)
          font: 'SimSun',
        },
        paragraph: {
          spacing: {
            line: 360, // 1.5倍行距
          },
        },
      }],
    },
    sections: [{
      properties: {},
      children: await parseHtmlToDocx(html),
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, filename);
}

async function parseHtmlToDocx (html: string): Promise<any[]> {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const result: any[] = [];

  const processNode = (node: Node, currentStyle: any = {}): any[] => {
    const runs: any[] = [];

    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
      runs.push(new TextRun({
        text: node.textContent,
        bold: currentStyle.bold,
        italics: currentStyle.italics,
        underline: currentStyle.underline,
        size: currentStyle.fontSize,
        color: currentStyle.color,
      }));
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      const inheritedStyle = { ...currentStyle };

      // 改进的字体大小处理（关键修正）
      if (element.style.fontSize) {
        const sizeInPx = parseFloat(element.style.fontSize);
        if (!isNaN(sizeInPx)) {
          inheritedStyle.fontSize = pxToHalfPt(sizeInPx);
        }
      } else {
        const computedStyle = window.getComputedStyle(element);
        if (computedStyle.fontSize && computedStyle.fontSize !== '0px') {
          const sizeInPx = parseFloat(computedStyle.fontSize);
          if (!isNaN(sizeInPx) && sizeInPx > 0) {
            inheritedStyle.fontSize = pxToHalfPt(sizeInPx);
          }
        }
      }

      // 处理加粗
      if (element.tagName === 'STRONG' || element.tagName === 'B' ||
        parseInt(element.style.fontWeight) >= 600) {
        inheritedStyle.bold = true;
      }

      // 处理斜体
      if (element.tagName === 'EM' || element.tagName === 'I' ||
        element.style.fontStyle === 'italic') {
        inheritedStyle.italics = true;
      }

      // 处理下划线
      if (element.tagName === 'U' || element.style.textDecoration.includes('underline')) {
        inheritedStyle.underline = { type: UnderlineType.SINGLE };
      }

      // 处理字体颜色
      if (element.style.color) {
        inheritedStyle.color = rgbToHex(element.style.color);
      }

      // 处理标题
      if (/^H[1-6]$/.test(element.tagName)) {
        const level = parseInt(element.tagName.substring(1)) as 1 | 2 | 3 | 4 | 5 | 6;
        const headingLevels = [
          HeadingLevel.HEADING_1,
          HeadingLevel.HEADING_2,
          HeadingLevel.HEADING_3,
          HeadingLevel.HEADING_4,
          HeadingLevel.HEADING_5,
          HeadingLevel.HEADING_6,
        ];

        return [
          new Paragraph({
            text: element.textContent || '',
            heading: headingLevels[level - 1],
            spacing: { before: 200, after: 100 },
          })
        ];
      }

      // 处理段落
      if (element.tagName === 'P') {
        const children = Array.from(element.childNodes)
          .flatMap(child => processNode(child, inheritedStyle))
          .filter(Boolean);

        if (children.length > 0) {
          return [new Paragraph({ children })];
        }
        return [];
      }

      // 处理其他行内元素（如span）
      return Array.from(element.childNodes)
        .flatMap(child => processNode(child, inheritedStyle))
        .filter(Boolean);
    }

    return runs;
  };

  return Array.from(doc.body.childNodes)
    .flatMap(node => processNode(node))
    .filter(Boolean);
}

// 精确的 px 转 half-point 函数
function pxToHalfPt (px: number): number {
  return Math.round(px * 1.5); // 1px ≈ 0.75pt → 1.5 half-points
}

function rgbToHex (rgb: string): string {
  if (rgb.startsWith('#')) return rgb;

  const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*\d+\.?\d*)?\)/);
  if (match) {
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }
  return '#000000';
}