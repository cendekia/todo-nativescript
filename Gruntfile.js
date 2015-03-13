module.exports = function(grunt) {
  grunt.initConfig({
    build_dir: {
    	all: {
	      options: {
	        create: [
	        	'app/app/lib',
	        	'app/app/images',
	        	'app/app/shared/css',
	        	'app/app/shared/models',
	        	'app/app/shared/utils',
	        	'app/app/views',
	        ]
	      },
	      mode: 655
	    },
	    test: {
	      options: {
	        create: [
	        	'app/app/lib',
	        	'app/app/images',
	        	'app/app/shared/css',
	        	'app/app/shared/models',
	        	'app/app/shared/utils',
	        	'app/app/views',
	        ],
	        mode: 755
	      }
	    }
	  },
  });

  grunt.loadNpmTasks('grunt-build-dir');

 	grunt.registerTask('default',['build_dir']);
};