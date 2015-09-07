/*global module */

module.exports = function(grunt) {
  'use strict';

  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    //watch
    watch: {
      sass: {
        files: ['www/css/*.scss'],
        tasks: ['sass']
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'www/**/*.{css,html}',
            'www/js/*.js'
          ]
        },
        options: {
          server: {
            baseDir: "./"
          },
          startPath: "www/index.html",
          watchTask: true // < VERY important
        }
      }
    },

    //sass
    sass: {
      dist: {
        options: {
          style: 'compact',
          noCache: true,
          loadPath: [
              'bower_components/bourbon/app/assets/stylesheets/'
            ]
        },
        files: [{
          expand: true,
          cwd: 'www/css',
          src: ['{,*/}*.scss'],
          dest: 'www/css',
          ext: '.css'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'www/',
          dest: '../app2015-none/www/',
          src: [
            '**',
            '!res',
            '!img/bottom.png'
          ]
        }]
      }
    }
  });

  //task
  grunt.registerTask('default', [
    'browserSync',
    'watch'
    ]);
};