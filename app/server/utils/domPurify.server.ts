import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";

export const sanitize = (html: string) => {
  const window = new JSDOM("").window;
  const DOMPurify = createDOMPurify(window);
  return DOMPurify.sanitize(html);
};
