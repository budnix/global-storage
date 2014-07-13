/*global module:false */
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("dd-mm-yyyy") %>\n' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true
            },
            gruntfile: {
                src: 'gruntfile.js'
            }
        },
        jasmine: {
            src: 'global-storage.js',
            options: {
                specs:  'specs/globalStorageSpecs.js',
                keepRunner: true
            }
        },
        uglify: {
            globalStorage: {
                files: {
                    'global-storage.min.js': ['global-storage.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('test', 'specs');
    grunt.registerTask('specs', ['jshint', 'jasmine', 'uglify']);
};
