const sharp = require('sharp');
const fs = require('fs');
const directory = '../static/images';

fs.readdirSync(directory).filter((file) => file.search('small') === -1).forEach(file => {
  sharp(`${directory}/${file}`)
    .resize(
      {
        width: 200,
        height: 100,
      }
    ) // width, height
    .toFile(`${directory}/${file}-small.jpg`);
});

fs.readdirSync(directory).filter((file) => file.search('medium') === -1).forEach(file => {
  sharp(`${directory}/${file}`)
    .resize(
      {
        width: 768,
        height: 480,
        fit: sharp.fit.fill,
      }
    ) // width, height
    .toFile(`${directory}/${file}-medium.jpg`);
});