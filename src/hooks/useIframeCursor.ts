import { useEffect, type RefObject } from "react";

/**
 * Lets the site's drawn cursor (CustomCursor) work inside a same-origin iframe. The parent page gets no
 * pointer events while the mouse is over the frame, so this hides the system cursor inside it, forwards
 * each move to the parent window in page coordinates, and reports what's under the pointer so links in
 * the frame still change the cursor's colour.
 */
export function useIframeCursor(frameRef: RefObject<HTMLIFrameElement | null>) {
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    let cleanup = () => {};

    const attach = () => {
      cleanup();
      const doc = frame.contentDocument;
      if (!doc) return;

      // Same rule as globals.css: the drawn circle replaces the system cursor for mouse users.
      const style = doc.createElement("style");
      style.textContent = "@media (pointer: fine) { html, html * { cursor: none !important; } }";
      doc.head.appendChild(style);

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        const rect = frame.getBoundingClientRect();
        window.dispatchEvent(
          new PointerEvent("pointermove", {
            pointerType: "mouse",
            clientX: rect.left + e.clientX,
            clientY: rect.top + e.clientY,
          }),
        );
      };
      const onOver = (e: PointerEvent) => {
        window.dispatchEvent(new CustomEvent("cursor-target", { detail: e.target }));
      };
      doc.addEventListener("pointermove", onMove);
      doc.addEventListener("pointerover", onOver);
      cleanup = () => {
        doc.removeEventListener("pointermove", onMove);
        doc.removeEventListener("pointerover", onOver);
        style.remove();
      };
    };

    frame.addEventListener("load", attach);
    if (frame.contentDocument?.readyState === "complete" && frame.contentDocument.body?.childElementCount) attach();
    return () => {
      frame.removeEventListener("load", attach);
      cleanup();
    };
  }, [frameRef]);
}
