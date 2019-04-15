const gulp = require('gulp');
const server = require('gulp-webserver');
const fs = require('fs');
const path = require('path');
const minjs = require('gulp-minify');
const mincss = require('gulp-clean-css');

gulp.task('server',()=>{
    gulp.src('./index.html').pipe(server({
        port :3000,
        open :true,
        middleware :(req,res)=>{
            if(req.url === '/api'){
                res.end(fs.readFileSync(path.join(__dirname,'json/data.json')));
            }
            res.end(fs.readFileSync(path.join(__dirname,'index.html')));
        }
    }));
});

gulp.task('js',()=>{
    gulp.src('./script/*.js').pipe(minjs()).pipe(gulp.dest('./minjs'))
})

gulp.task('css',()=>{
    gulp.src('./css/*.css').pipe(mincss()).pipe(gulp.dest('./mincss'))
});

gulp.task('default',['js','css','server']);