var fs = require('fs');
var browserify = require('browserify');
var watchify = require('watchify');

var b = browserify({
  entries: ['frontend/preguntas/create.js'],
  cache: {},
  packageCache: {},
  plugin: [watchify]
});

b.on('update', bundle);
bundle();

function bundle() {
  console.log('Bundling preguntas/create.js');
  b.bundle().pipe(fs.createWriteStream('public/js/preguntas/create.js'));
}

