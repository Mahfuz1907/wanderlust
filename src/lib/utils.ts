export { cn } from "cn";

const LOCAL_DESTINATION_IMAGES = "/assets/destinations/";

/**
 * Resolve a destination image value into a src `next/image` can render:
 * - "https://…" URLs (as entered in the add-destination form) are used as-is.
 * - "/…" paths are used as-is (they already point into public/).
 * - Bare filenames like "image1.png" resolve to /assets/destinations/.
 *
 * Never returns an invalid src, so next/image can't throw at render time.
 */
export function getImageSrc(src?: string): string | undefined {
  if (!src) return undefined;
  // next/image only allows the hosts configured in remotePatterns (https).
  if (src.startsWith("http://")) return undefined;
  if (src.startsWith("https://")) return src;
  if (src.startsWith("/")) return src;
  return `${LOCAL_DESTINATION_IMAGES}${src}`;
}
