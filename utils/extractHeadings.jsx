import * as cheerio from "cheerio";

// Extract headings
export function extractHeadings(html) {
  const $ = cheerio.load(html);

  return $("h2, h3").map((_, el) => {
    const text = $(el).text();
    const id = text.trim().toLowerCase().replace(/\s+/g, "-");
    return {
      id,
      text,
      level: el.tagName.toUpperCase(), // H2 or H3
    };
  }).get();
}

// Inject ids into headings
export function injectHeadingIds(html) {
  const $ = cheerio.load(html);

  $("h2, h3").each((_, el) => {
    const text = $(el).text();
    const id = text.trim().toLowerCase().replace(/\s+/g, "-");
    $(el).attr("id", id);
  });

  return $("body").html(); // Return only inner body content
}
