module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'string-replace': {
            'dev': {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**'],
                    dest: 'target/',
                    rename: function (dest, src) {
                        return dest + src.replace('.js', '-debug.js');
                    }
                }],
                options: {
                    replacements: [
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
                files: [{
                    expand: true,
                    cwd: 'target/',
                    src: ['**'],
                    dest: 'target/',
                    rename: function (dest, src) {
                        return dest + src.replace('-debug.js', '.js');
                    }
                }],
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
                    src: ['index.js'],
                    dest: 'release/',
                    rename: function (dest, src) {
                        return dest + '<%= pkg.name %>-<%= pkg.version %>.js';
                    }
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['string-replace:dev', 'string-replace:debug']);
    grunt.registerTask('release', ['string-replace:dev', 'string-replace:debug', 'copy:release']);
}; 