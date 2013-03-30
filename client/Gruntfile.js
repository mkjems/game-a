module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        mybrowserify: {
            options: {
                replace: '/src/www'
            },
            files: {
                src: './src/www/**/index.js',
                dest: './build/'
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/www/',
                    src: ['**/**.html', '**/**.css'],
                    dest: 'build/'
                },{
                    src: 'node_modules/socket.io-client/dist/socket.io.js',
                    dest: 'build/page2/scripts/socket.io.js'
                },{
                    expand: true,
                    cwd: 'src/sounds/',
                    src: ['**.wav', '**.WAV'],
                    dest: 'build/sounds/'
                }]
            }
        },
        concat : {
            main:{
                src: ['src/vendors/*.js'],
                dest: 'build/vendors/vendors.js'
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'src/www/**/*.js']
        },
        watch: {
          scripts: {
            files: ['src/www/**/*.js', 'src/www/*.js', 'src/www/**/**/*.js'],
            tasks: ['scripts'],
            options: {
              nospawn: true
            }
          },
          htmlcss: {
            files: ['src/www/**/*.html', 'src/www/**/*.css', 'src/www/*.html', 'src/www/*.css'],
            tasks: ['htmlcss'],
            options: {
              nospawn: true
            }
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.loadTasks('tasks');

    grunt.registerTask('clean', function() {
        grunt.log.writeln('deleting build');
        grunt.file['delete']('./build');
    });

    grunt.registerTask('default', ['clean', 'jshint:all', 'copy', 'concat', 'mybrowserify']);
    grunt.registerTask('scripts', ['mybrowserify']);
    grunt.registerTask('htmlcss', ['copy']);
};
