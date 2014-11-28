module.exports = function(grunt) {
    //Grunt configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            js: {
                src: [
                    './public/libs/foundation/js/foundation.js',
                    './public/libs/foundation/js/vendor/jquery.js',
                    './public/libs/foundation/js/vendor/jquery.cookie.js',
                    './public/libs/foundation/js/vendor/placeholder.js',
                    './public/libs/foundation/js/vendor/fastclick.js',
                    './public/js/app.js'
                ],
                dest: './public/js/main.js'
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            js: {
                files: {
                    './public/js/main.js': './public/js/main.min.js',
                    './public/libs/foundation/js/vendor/modernizr.js': './public/js/modernizr.min.js'
                }
            }
        },

        sass: {
            development: {
                files: {
                    "./public/css/main.css":"./public/css/main.sass"
                }
            }
        },

        watch: {
            options: {
                livereload: true,
            },
            js: {
                files: [
                    './public/libs/foundation/js/vendor/jquery.js',
                    './public/libs/foundation/js/foundation.js',
                    './public/js/*.js'
                ],
                tasks: ['concat:js', 'uglify:js']
            },
            sass: {
                files: ['./public/css/main.sass'],
                tasks: ['sass']
            },
            css: {
                files: ['./public/css/main.css'],
                tasks: []
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);
}