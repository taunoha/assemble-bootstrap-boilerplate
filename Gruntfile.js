const sass = require('node-sass');

module.exports = function(grunt) {

     'use strict';

    /**
     *
     *        Install dependencies:     npm install
     *
     *             When developing:     grunt dev
     *              For production:     grunt build
     *
     *
    **/
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        project: {
            name: '<%= pkg.name %>'
        },

        // Concat
        concat: {
            js: {
                src: [
                    'src/assets/scripts/vendors/modernizr.custom.js',
                    'node_modules/jquery/dist/jquery.js',
                    'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
                    'node_modules/underscore/underscore.js',
                    'src/assets/scripts/ld-plugins/*.js',
                    'src/assets/scripts/main.js'
                ],
                dest: 'dist/assets/scripts/app.js'
            }
        },

        // Min JS
        terser: {
            options: {
                mangle: true,
                ecma: 5
            },
            js: {
                src: 'dist/assets/scripts/app.js',
                dest: 'dist/assets/scripts/app.min.js'
            },
        },

        // SASS
        sass: {
            options: {
                outputStyle: 'compressed',
                implementation: sass,
                sourceComments: false,
                sourceMap: false,
                includePaths: [
                    'node_modules'
                ]
            },
            front: {
                files: [{
                    src: 'src/assets/scss/styles-screen.scss',
                    dest: 'dist/assets/css/styles-screen.css'
                }]
            }
        },

        // PostCSS
        postcss: {
            options: {
                map: false,
                processors: [
                    require('autoprefixer')(),
                    require('postcss-flexbugs-fixes')(),
                    require('postcss-embed-svg')({
                        paths: ['assets/src/gfx/svg']
                    })
                ]
            },
            front: {
                src: 'dist/assets/css/styles-screen.css'
            }
        },

        // SVG min
        svgmin: {
            multiple: {
                files: [{
                    expand:true,
                    cwd: 'src/assets/gfx/',
                    src: ['*.svg'],
                    dest: 'dist/assets/gfx/'
                }]
            }
        },

        // PNG min
        pngmin: {
            multiple_test: {
                options: {
                    ext: '.png',
                    force: true
                },
                files: [{
                    src: 'src/assets/gfx/*.png',
                    dest: 'dist/assets/gfx/'
                }]
            }
        },

        // Copy
        copy: {
            gfx: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/gfx',
                    src: ['*.jpg', '*.gif'],
                    dest: 'dist/assets/gfx/'
                }]
            }
        },

        // Assemble
        assemble: {
            options: {
                production: true,
                ext: '.html',
                data: 'src/data/*.json',
                assets: 'dist/assets',
                helpers: 'src/helpers/*-helper.js',
                layoutdir: 'src/templates/layouts',
                partials: ['src/templates/partials/*.hbs'],
            },
            site: {
                options: {
                    layout: 'default.hbs',
                },
                files: [{
                    expand: true,
                    cwd: 'src/templates/pages',
                    src: ['*.hbs'],
                    dest: 'dist/'
                }]
            },
        },

        // Prettify
        prettify: {
            options: {
                config: 'prettify.json'
            },
            all: {
                expand: true,
                cwd: 'dist/',
                ext: '.html',
                src: ['**/*.html'],
                dest: 'dist'
            },
        },

        // Watch
        watch: {
            hbs: {
                files: ['src/templates/layouts/**/*.hbs', 'src/templates/pages/**/*.hbs', 'src/templates/partials/**/*.hbs'],
                tasks: ['assemble', 'newer:prettify']
            },
            sass: {
                files: ['src/assets/scss/**/*.scss'],
                tasks: ['sass', 'postcss']
            },
            js: {
                files: ['src/assets/scripts/**/*.js'],
                tasks: ['concat', 'terser']
            },
            svg: {
                files: ['src/assets/gfx/*.svg'],
                tasks: ['newer:svgmin']
            },
            jpg: {
                files: ['src/assets/gfx/*.jpg'],
                tasks: ['copy:gfx']
            },
            png: {
                files: ['src/assets/gfx/*.png'],
                tasks: ['newer:pngmin']
            }
        },

    });

    // Load Npm Tasks

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-terser');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-pngmin');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-prettify');
    grunt.loadNpmTasks('grunt-assemble');


    // Tasks
    grunt.registerTask('dev', ['watch']);
    grunt.registerTask('build', ['concat', 'terser', 'copy', 'assemble', 'prettify', 'sass', 'postcss', 'svgmin', 'pngmin']);
};
