module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: ['src/Math.js', 'src/Inputs.js', 'src/CanvasRender.js', 'src/OpenGlRender.js',
       'src/SoundEffects.js', 'src/Collision.js', 'src/Floor.js', 'src/Door.js', 'src/Player.js', 'src/Key.js',
        'src/Levels.js', 'src/TrainingLevels.js', 'src/FireLevels.js', 'src/Entity.js',
        'src/Audio.js', 'src/Game.js', 'src/RenderElements.js', 'src/Camera.js'],
        dest: 'release/<%= pkg.name %>.min.js'
      }
    },
    copy: {
		production: {
			files: [{
				expand: true,
				cwd: 'src/sounds/',
				src: ['*'],
				dest: 'release/sounds/',
				rename: function (dest, src) {          // The `dest` and `src` values can be passed into the function
				  return dest + src.replace('beta',''); // The `src` is being renamed; the `dest` remains the same
				}
			}]
		}
	 }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'copy']);


};

