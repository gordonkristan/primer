'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		qunit: {
			cli: ['tests.html'],

			development: {
				options: {
					urls: ['http://localhost:8000/tests.html']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-qunit');

	grunt.registerTask('test', ['qunit:cli']);
};
