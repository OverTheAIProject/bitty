module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      all: {
        src: ['package.json', 'src/**/*.js'],
        dest: 'app/'
      },
      bootstrap: {
        expand: true,
        cwd: 'node_modules/bootstrap/dist',
        src: '**',
        dest: 'app/src/static',
      },
      jquery: {
        expand: true,
        cwd: 'node_modules/jquery/dist',
        src: '**',
        dest: 'app/src/static/js',
      },
      vue: {
        expand: true,
        cwd: 'node_modules/vue/dist',
        src: 'vue.js',
        dest: 'app/src/static/js',
      },
      'vue-resource': {
        expand: true,
        cwd: 'node_modules/vue-resource/dist',
        src: 'vue-resource.js',
        dest: 'app/src/static/js',
      }
    },
    electron: {
      win32Build: {
        options: {
          name: '<%= pkg.name %>',
          dir: 'app',
          out: 'build',
          platforn: 'win32',
          arch: 'x64'
        }
      }
    },
    pug: {
      compile: {
        options: {
          data: {
            debug: false,
            pretty: true,
          }
        },
        files: [{
            cwd: "src/static/pug",
            src: "**/*.pug",
            dest: "app/src/static/",
            expand: true,
            ext: ".html"
          }]
      }
    },
    less: {
      compile: {
        options: {
          style: 'expanded',
        },
        files: [{
            cwd: "src/static/less",
            src: "**/*.less",
            dest: "app/src/static/css",
            expand: true,
            ext: ".css"
          }]
      }
    },
    run: {
      options: {
        wait: false,
      },
      debug: {
        exec: 'electron app/'
      }
    },
    watch: {
      jade: {
        options: {
          wait: false
        },
        files: 'src/static/pug/**/*.pug',
        tasks: 'pug'
      },
      less: {
        options: {
          wait: false
        },
        files: 'src/static/less/**/*.less',
        tasks: 'less'
      },
      scripts: {
        options: {
          wait: false
        },
        files: 'src/**/*.js',
        tasks: 'copy'
      },
      gruntfile: {
        files: "Gruntfile.js",
        tasks: 'default-watch'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-run');

  grunt.registerTask('default', ['copy', 'less', 'pug']);
  grunt.registerTask('default-watch', ['default', 'watch']);
  grunt.registerTask('debug', ['default', 'run:debug', 'watch']);
}