module.exports = () => {
  blinker.gulp.task('images:copy', function () {
    return blinker.gulp.src(
      [
        './' + blinker.config.sourcePath + '/' + blinker.config.imagesDirectory + '/**/*',
        '!./' + blinker.config.sourcePath + '/' + blinker.config.svgSpriteDirectory + '/**/*',
        '!./' + blinker.config.sourcePath + '/' + blinker.config.svgInlineSpriteDirectory + '/**/*',
      ]
    )
      .pipe(blinker.gulp.dest(blinker.config.temporaryPath + '/' + blinker.config.imagesDirectory))
  });

  blinker.gulp.task('fonts:copy', function () {
    return blinker.gulp.src(['./' + blinker.config.sourcePath + '/' + blinker.config.fontsDirectory + '/**/*'])
      .pipe(blinker.gulp.dest(blinker.config.temporaryPath + '/' + blinker.config.fontsDirectory))
  });

blinker.gulp.task('ajax:copy', function () {
    return blinker.gulp.src(['./' + blinker.config.sourcePath + '/' + blinker.config.ajaxDirectory + '/**/*'])
        .pipe(blinker.gulp.dest(blinker.config.temporaryPath + '/' + blinker.config.ajaxDirectory))
});

  blinker.gulp.task('dist', function () {
    return blinker.gulp.src(
      [
        './' + blinker.config.temporaryPath + '/**/*',
        '!./' + blinker.config.temporaryPath + '/' + blinker.config.javascriptDirectory + '/**/*',
      ]
    )
      .pipe(blinker.gulp.dest(blinker.config.destinationPath + '/'))
  });
};