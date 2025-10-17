const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const filePath = path.resolve(__dirname, "../student-code/index.html");
const html = fs.readFileSync(filePath, "utf8");
const { document } = new JSDOM(html).window;

describe("Unit 01 - Lesson 01: HTML Document Structure", () => {
  test("includes DOCTYPE declaration", () => {
    expect(html.toLowerCase()).toContain("<!doctype html>");
  });

  test("includes <html> tag", () => {
    expect(document.documentElement.nodeName).toBe("HTML");
  });

  test("includes <head> and <title>", () => {
    const head = document.querySelector("head");
    expect(head).not.toBeNull();

    const title = head.querySelector("title");
    expect(title).not.toBeNull();
    expect(title.textContent.trim().length).toBeGreaterThan(0);
  });

  test("includes <body> with <h1> and <p>", () => {
    const body = document.querySelector("body");
    expect(body).not.toBeNull();

    const h1 = body.querySelector("h1");
    expect(h1).not.toBeNull();
    expect(h1.textContent.trim().length).toBeGreaterThan(0);

    const p = body.querySelector("p");
    expect(p).not.toBeNull();
    expect(p.textContent.trim().length).toBeGreaterThan(0);
  });

  test("all elements have closing tags", () => {
    const selfClosingTags = ["<br", "<img", "<meta", "<input", "<hr", "<link", "<source"];
    const lines = html.split("\n");
    const unclosedTags = lines.filter(line => {
      const trimmed = line.trim();
      return (
        trimmed.startsWith("<") &&
        !trimmed.startsWith("</") &&
        !trimmed.endsWith(">") &&
        !selfClosingTags.some(tag => trimmed.startsWith(tag))
      );
    });

    expect(unclosedTags.length).toBe(0);
  });
});
