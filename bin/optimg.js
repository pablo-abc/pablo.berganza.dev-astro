import Jimp from 'jimp';
import path from 'node:path';
import { globbySync } from 'globby';

function getPaths(imgPath, outputExt = 'processed') {
  const { dir, ext, name } = path.parse(imgPath);
  return {
    input: path.resolve(imgPath),
    output: path.resolve(path.join(dir, `${name}-${outputExt}${ext}`)),
  };
}

async function generatePlaceholder(imgPath) {
  const { input, output } = getPaths(imgPath, 'placeholder');
  const image = await Jimp.read(input);
  console.log('Processing', input);
  await image.resize(50, Jimp.AUTO);
  await image.quality(70);
  await image.blur(10);
  console.log('Writing', output, 'to', output);
  await image.writeAsync(output);
}

async function generateResized(imgPath, width) {
  const { input, output } = getPaths(imgPath, width);
  const image = await Jimp.read(input);
  console.log('Processing', input);
  await image.resize(width, Jimp.AUTO);
  await image.quality(70);
  console.log('Writing', output, 'to', output);
  await image.writeAsync(output);
}

async function generateImages(images) {
  console.log('#### GENERATING IMAGES ####');
  return Promise.all(
    images.map(async (imgPath) => {
      await Promise.all([
        // generatePlaceholder(imgPath),
        // generateResized(imgPath, 400),
        generateResized(imgPath, 800),
        // generateResized(imgPath, 1200),
        // generateResized(imgPath, 1600),
      ]);
    })
  );
}

const imgPaths = process.argv.slice(2).flatMap((arg) => {
  return globbySync(arg);
});

generateImages(imgPaths);
