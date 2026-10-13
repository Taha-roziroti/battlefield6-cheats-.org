export const TARGET_WIDTH = 3840;

export const RASTER_DIRS = [
  'public/images/battlefield/gameplay',
  'public/images/battlefield',
  'public/images/fragpunk',
  'public/images/gameplay',
  'public/images/blog',
];

export function isMasterFile(name) {
  return (
    /\.(png|jpe?g)$/i.test(name) &&
    !/-\d+\.webp$/i.test(name) &&
    !name.startsWith('og-') &&
    !name.endsWith('.upscale.tmp') &&
    !name.endsWith('.enhance.tmp') &&
    !name.endsWith('.ai.tmp') &&
    name !== 'dimensions.json' &&
    !name.endsWith('-4k.jpg')
  );
}
