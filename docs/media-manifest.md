# Owner-Supplied Media Manifest

## Publication decision

The August 14, 2026 owner instruction explicitly requested that the supplied photographs and videos be added to the website. The assets below are treated as approved for this preview. This approval covers use of the media itself; it does not independently approve credential, venue, client, or service claims beyond what is visibly depicted.

All still images are published as WebP. Original HEIC, JPEG, and MOV files remain untouched outside the project. Conversion strips EXIF, location, device, creation-time, and other embedded metadata from the public outputs.

## Source-to-output map

| Supplied source                                            | Web output                             | Site role                                                       |
| ---------------------------------------------------------- | -------------------------------------- | --------------------------------------------------------------- |
| `FullSizeRender.heic`                                      | `pierce-owner-tuning-library.webp`     | Piano Tuning service imagery                                    |
| `IMG_1186.heic`                                            | `pierce-owner-rpt-event.webp`          | About-page convention photograph; credential copy remains gated |
| `codex-clipboard-45b90ff1-fb28-4a48-bf47-d6f89c147894.png` | `pierce-owner-rpt-convention.webp`     | About-page 2026 convention photograph                           |
| `IMG_5007.HEIC`                                            | `pierce-owner-tuning-festival.webp`    | Homepage media showcase                                         |
| `codex-clipboard-3db7d6f6-beea-4adb-89c4-f8b08e6c1fa7.jpg` | `pierce-owner-portrait-vertical.webp`  | About-page lead portrait                                        |
| `codex-clipboard-4eac4cbf-1085-4c40-b071-fce120c3e098.jpg` | `pierce-owner-portrait-landscape.webp` | Homepage media showcase                                         |
| `codex-clipboard-2254fa5d-a292-4069-8d60-abd7d6e6b7e1.jpg` | `pierce-owner-tuning-monochrome.webp`  | About-page work photograph                                      |
| `copy_F65637B1-DA17-4103-B472-5F53BA3E680D.mov`            | `pierce-at-grand.mp4` + WebP poster    | Deferred homepage video                                         |
| `IMG_1203.MOV`                                             | `piano-venue-clip.mp4` + WebP poster   | Deferred homepage venue clip                                    |
| `IMG_1203(1).MOV`                                          | Deduplicated against `IMG_1203.MOV`    | Not published twice                                             |

The two `IMG_1203` files have different container metadata but the same SHA-256 hash after decoding their video frames. Publishing one optimized copy avoids a duplicate download and duplicate content.

## Performance behavior

- Responsive Astro image variants are generated from the WebP masters.
- The homepage hero is the only eager, high-priority image.
- All downstream photographs and video posters are lazy-loaded.
- MP4 files use H.264, stripped metadata, and fast-start layout.
- Video files have no initial network cost: the initial HTML stores each URL in `data-src`, and the MP4 source is assigned only after an explicit play action.

## Reproduction

`scripts/prepare-owner-media.mjs` performs the still conversion, video transcode, poster extraction, metadata stripping, and size reporting. It accepts explicit source and converter paths so the project does not hard-code a private Downloads or temporary directory.
