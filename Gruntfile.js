module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ts: {
            default: {
                tsconfig: true,
                options: {
                    removeComments: false,
                    sourceMap: false
                }
            }
        },
        'string-replace': {
            'dev': {
                files: {
                    'target/NodeCreationObserver-debug.js': ['target/NodeCreationObserver.js']
                },
                options: {
                    replacements: [
                        {
                            pattern: /\/\/\/[^\r\n]*[\r\n]+/ig,
                            replacement: ''
                        },
                        {
                            pattern: /\s*module\.exports[^\r\n]*/ig,
                            replacement: ''
                        }, {
                            pattern: /\/\/\sDev[\s\S]+?(?=\/\/)\/\/\s+/ig,
                            replacement: ''
                        }
                    ]
                }
            },
            'debug': {
                files: {
                    'target/NodeCreationObserver.js': ['target/NodeCreationObserver-debug.js']
                },
                options: {
                    replacements: [{
                        pattern: /\s*console\.log[^\r\n]*/ig,
                        replacement: ''
                    }]
                }
            }
        },
        copy: {
            'release': {
                files: [{
                    expand: true,
                    cwd: 'target/',
                    src: ['NodeCreationObserver.js'],
                    dest: 'release/',
                    rename: function (dest, src) {
                        return dest + '<%= pkg.name %>-<%= pkg.version %>.js';
                    }
                },{
                    expand: true,
                    cwd: 'target/',
                    src: ['NodeCreationObserver.js'],
                    dest: 'release/',
                    rename: function (dest, src) {
                        return dest + '<%= pkg.name %>-latest.js';
                    }
                },{
                    expand: true,
                    cwd: 'src/',
                    src: ['NodeCreationObserver.d.ts'],
                    dest: 'release/',
                    rename: function (dest, src) {
                        return dest + '<%= pkg.name %>-latest.d.ts';
                    }
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['ts', 'string-replace:dev', 'string-replace:debug']);
    grunt.registerTask('release', ['ts', 'string-replace:dev', 'string-replace:debug', 'copy:release']);
};