module.exports = function(grunt) {
    //Grunt configuration
    grunt.initConfig({
        //pkg: grunt.file.readJSON('package.json'),

        // check all js files for errors
        jshint: {
            all: ['./public/js/*.js']
        },

        //concatinating multiple foundation javascripts into one js file
        concat: {
            js: {
                src: [
                    './public/libs/foundation/js/foundation.js',
                    './public/libs/foundation/js/vendor/jquery.js',
                    './public/libs/foundation/js/vendor/jquery.cookie.js',
                    './public/libs/foundation/js/vendor/placeholder.js',
                    './public/libs/foundation/js/vendor/fastclick.js'
                ],
                dest: './public/js/main.js'
            }
        },

        //minifying the javascripts to be loaded
        uglify: {
            options: {
                mangle: false
            },
            js: {
                files: {
                    './public/js/main.min.js': './public/js/main.js',
                    './public/js/modernizr.min.js': './public/libs/foundation/js/vendor/modernizr.js'
                }
            }
        },

        libsass: {
            dev: {
                src: "./public/scss/main.scss",
                dest: "./public/css/main.css"
            }
        },

        //setting up nodemon
        nodemon: {
            dev: {
                script: 'server.js'
            }
        },

        //watching for changes in  files and running tasks on file change
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
                files: ['./public/scss/main.scss'],
                tasks: ['libsass']
            }
        },

        // run watch and nodemon at the same time
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            tasks: ['nodemon', 'watch']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-libsass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('con', ['concat']);
    grunt.registerTask('minify', ['uglify']);
    grunt.registerTask('sass', ['libsass']);
    grunt.registerTask('nodem', ['nodemon']);
    grunt.registerTask('default', ['watch']);

    grunt.registerTask('default', ['sass', 'concat', 'uglify', 'concurrent']);
}