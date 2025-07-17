import katex from "katex";
import "katex/dist/katex.min.css";

/**
 * Replace LaTeX expressions in a given HTML string with rendered
 * KaTeX HTML.
 *
 * Expressions are either inline (e.g. `$x^2 + y^2$`) or block-level
 * (e.g. `$$\frac{x^2 + y^2}{2}$$`).
 *
 * If an expression is invalid, it will be replaced with a red
 * `[Invalid LaTeX]` string.
 *
 * @param rawHtml - The HTML string to render.
 * @returns The modified HTML string with all LaTeX expressions replaced.
 */
export function renderKatexFromHtml(rawHtml: string | null): string {
  if (!rawHtml) return "";
  return rawHtml.replace(
    /\$\$(.+?)\$\$|\$(.+?)\$/g,
    (_, blockExpr, inlineExpr) => {
      try {
        const expr = blockExpr || inlineExpr;
        const html = katex.renderToString(expr, {
          displayMode: !!blockExpr,
          throwOnError: false,
        });
        return html;
      } catch (e) {
        return `<span class="text-red-500">[Invalid LaTeX]</span>`;
      }
    },
  );
}
