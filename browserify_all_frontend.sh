#!/bin/bash

browserify frontend/preguntas/create.js -o public/js/preguntas/create.js
browserify frontend/preguntas/index.js -o public/js/preguntas/index.js

