module.exports = function (grunt) {
    grunt.initConfig({

        config: {
            dist: 'temp'
        },

        pkg: grunt.file.readJSON('package.json'),

        copy: {
            compile: {
                files: [
                    {
                        expand: true,
                        cwd: 'img/',
                        src: ['**'],
                        dest: '<%= config.dist %>/img/'
                    },
                    {
                        expand: true,
                        cwd: 'node_modules/bootstrap/fonts',
                        src: ['**'],
                        dest: '<%= config.dist %>/fonts/'
                    },
                    {
                        src: [
                            'src/template/index.html'
                        ],
                        dest: '<%= config.dist %>/index.html',
                        filter: 'isFile'
                    }
                ]
            }
        },
        clean: {
            compile: {
                src: ["<%= config.dist %>"]
            }
        },
        concat: {
            compile: {
                options: {},
                files: [
                    {
                        src: [
                            'src/css/app.css',
                            'node_modules/bootstrap/dist/css/bootstrap.css'
                        ],
                        dest: '<%= config.dist %>/css/app.css',
                        filter: 'isFile'
                    },
                    {
                        src: [
                            'node_modules/react/dist/react.js',
                            'node_modules/react-dom/dist/react-dom.js',
                            'node_modules/jquery/dist/jquery.js',
                            'node_modules/bootstrap/dist/js/bootstrap.js',
                            'src/sse/SsEventSource.js',
                            'dist/bundle.js'
                        ],
                        dest: '<%= config.dist %>/js/app.js',
                        filter: 'isFile'
                    }
                ]
            }
        },
        maven: {
            install: {
                options: {
                    injectDestFolder: false,
                    goal: 'install',
                    groupId: 'de.seven.fate'
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>/',
                    src: ['**/*'],
                    dest: ''
                }]
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        }
    });


    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-maven-tasks');

    grunt.registerTask('default', []);
    grunt.registerTask('test', ['karma']);
    grunt.registerTask('compile', ['clean', 'test', 'copy', 'concat']);
    grunt.registerTask('install', ['compile', 'maven:install']);
};