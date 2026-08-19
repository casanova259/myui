/**
 * scripts/record-previews.mjs
 *
 * Records a short looping clip of every component route and saves
 * compressed .webm previews + poster thumbnails into /public/previews.
 *
 * USAGE:
 *   1. Run your Next.js dev server in another terminal:  npm run dev
 *   2. Then run:  node scripts/record-previews.mjs
 *
 * Requires: playwright (npm i -D playwright && npx playwright install chromium)
 *           ffmpeg available on PATH
 */

import { chromium } from "playwright";
import { execSync } from "node:child_process";
import { mkdirSync, renameSync, rmSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const RECORD_MS = 3500; // how long to let each animation loop before we stop recording
const VIEWPORT = { width: 1280, height: 720 };
const OUT_WIDTH = 480; // final thumbnail video width in px

const COMPONENTS = [
  "abstractcards", "accrodian", "animatedtext", "cards", "case", "domino",
  "dynamicisland", "encrypt", "f1", "fadescroll", "faqs", "features", "flip",
  "fliplinks", "kind", "mask", "navbar", "OrbitSlider", "oviparallax",
  "pagetransition", "parallax", "pinscroll", "raf", "record", "scramblenav",
  "scrolliods", "shift", "showcase", "slider", "smoothinput", "space", "split",
  "sqnc", "themetoggle", "tra", "UNIQ", "wallet",
];

const RAW_DIR = path.resolve("scripts/.tmp-videos");
const OUT_DIR = path.resolve("public/previews");

mkdirSync(RAW_DIR, { recursive: true });
mkdirSync(OUT_DIR, { recursive: true });

function ffmpegAvailable() {
  try {
    execSync("ffmpeg -version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

async function recordOne(browser, name) {
  const routeDir = path.join(RAW_DIR, name);
  mkdirSync(routeDir, { recursive: true });

  const context = await browser.newContext({
    viewport: VIEWPORT,
    recordVideo: { dir: routeDir, size: VIEWPORT },
  });
  const page = await context.newPage();

  try {
    await page.goto(`${BASE_URL}/${name}`, { waitUntil: "networkidle", timeout: 15000 });
  } catch (err) {
    console.warn(`  ! could not load /${name}: ${err.message}`);
  }

  await page.waitForTimeout(RECORD_MS);

  const video = page.video();
  await context.close(); // finalizes the video file to disk

  if (!video) return null;
  const rawPath = await video.path();
  return rawPath;
}

function postProcess(rawPath, name) {
  const outVideo = path.join(OUT_DIR, `${name}.webm`);
  const outPoster = path.join(OUT_DIR, `${name}.jpg`);

  // Compress + scale + strip audio. -an removes audio, crf controls quality/size.
  execSync(
    `ffmpeg -y -i "${rawPath}" -an -vf "scale=${OUT_WIDTH}:-1" -c:v libvpx-vp9 -b:v 0 -crf 34 "${outVideo}"`,
    { stdio: "inherit" }
  );

  // Grab a poster frame at 0.3s so the thumbnail shows something instantly, before the video loads.
  execSync(
    `ffmpeg -y -ss 0.3 -i "${rawPath}" -vframes 1 -vf "scale=${OUT_WIDTH}:-1" "${outPoster}"`,
    { stdio: "inherit" }
  );
}

async function main() {
  if (!ffmpegAvailable()) {
    console.error("ffmpeg not found on PATH. Install it first, then re-run this script.");
    process.exit(1);
  }

  const browser = await chromium.launch();

  for (const name of COMPONENTS) {
    console.log(`Recording /${name} ...`);
    const rawPath = await recordOne(browser, name);
    if (!rawPath || !existsSync(rawPath)) {
      console.warn(`  ! no video produced for ${name}, skipping`);
      continue;
    }
    postProcess(rawPath, name);
    console.log(`  -> saved public/previews/${name}.webm + .jpg`);
  }

  await browser.close();
  rmSync(RAW_DIR, { recursive: true, force: true });
  console.log("\nDone. Previews are in public/previews/");
}

main();
