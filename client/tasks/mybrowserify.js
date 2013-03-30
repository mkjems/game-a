/*
 * mybrowserify
 *
 * Copyright (c) 2013 Martin Kjems
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    grunt.registerMultiTask('mybrowserify', function() {

        function browserify(from, to, done) {
            var cmd = 'browserify src -o target'.replace(/src/g, from).replace(/target/g, to);
            var exec = require('child_process').exec;

            var child = exec(cmd, {
                encoding: 'utf8'
            }, function callback (error, stdout, stderr) {
                if (error !== null) {
                    grunt.log.writeln('browserify exec error: ' + error);
                    done(false);
                } else {
                    grunt.log.writeln('Copyed: ' + from.cyan + ' -> ' + to.cyan);
                    setTimeout(function(){
                        done();
                    },100);

                }
            });
        }

        var done = this.async(),
            path = require('path'),
            replace = this.options().replace;
        grunt.log.writeln('browserify files: ',  grunt.file.expand(this.data.src).length );
        this.files.forEach(function(filePair) {
            filePair.src.forEach(function(src) {
                var dest = path.normalize('./' + filePair.dest + src.replace(replace, ''));
                var destDir = path.dirname(dest);
                if(!grunt.file.isDir(destDir)){
                    grunt.file.mkdir(destDir);
                }
                browserify(path.resolve(src), path.resolve(dest), done);
            });
        });
    });
};