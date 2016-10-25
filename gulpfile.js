var gulp = require('gulp');
// var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

// gulp.task('test', function(){
//     return gulp.src('js/*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'))
// });

gulp.task('scss', function(){   //'scss' to nazwa własna
    return gulp.src("sass/main.scss")   //zwraca plik main.scss w katalogu sass
        .pipe(sourcemaps.init())
        .pipe(sass({
         errLogToConsole: true,     //wyświetli errory w konsoli
         outputStyle: 'expanded',   //utwórz plik css maksymalnie rozwinięty
         // sourceComments: true,
     }).on('error', sass.logError))  //nasłuchuje błędy
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("css"))     //utwórz plik css
})

gulp.task('default', ['scss'], function() {
    gulp.watch('sass/**/*.scss', ['scss'])  //nasłuchuj pliki wszystkie pliki .scss z folderu (sass sass/**/*.scss)
});                                         //wszystko, co zostało wpisane w pliku scss jest na bieżąco przenoszone do pliku css

// pliki .gitignore, gulpfile.js i package.json można skopiować, ale pliki w nod_modules należy zainstalować komendą npm install [nazwa pliku] np. npm install gulp
// w nowym projekcie należy tylko skopiować pliki .gitignore, gulpfile.js i package.json oraz folder sass, w konsoli wpisać npm install (wszystkie pliki utworzą się same), a potem wpisać w konsoli gulp
//przy każdej zmianie w pliku gulpfile.js należy w konsoli wpisać wyłączyć gulp przez wpisanie w konsoli ctlt + c, odpowiedzieć y, a następnie włączyć gulp pezez wpisanie w konsoli gulp
