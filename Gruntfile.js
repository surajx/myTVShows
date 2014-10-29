var colors = require('colors');

// Configure Grunt
var configureGrunt = function(grunt){

  //Required for jshint
  colors.setTheme({silly:'rainbow'});

  //Load all grunt tasks
  //Rather than explicitely mentioning all taks, load from devDependencies in package.json
  require('matchdep').filterDev(['grunt-*', ['!grunt-cli']]).forEach(grunt.loadNpmTasks);

  var gruntConfig = {
    watch:{
      lint:{
        files:['Gruntfile.js', 'index.js'],
        tasks:['jshint']
      },
      livereload:{
        files:['*.js'],
        options:{livereload:true}
      },
    },
    jshint:{
      options:{
        jshintrc:'.jshintrc'
      },
      all:['Gruntfile.js', 'index.js']
    },
    mochacli:{
      options:{
        ui:'bdd',
        reporter: 'spec',
        timeout:15000
      },
      unit:{
        src:['test/unit/**/*_spec.js']
      },
      routes:{
        src:['test/routes/**/*_test.js']
      }
    }
  };

  //Load the configuration
  grunt.initConfig(gruntConfig);

  grunt.registerTask('validate', "run test and lint",
    ['jshint','mochacli:unit','mochacli:routes']);

};

//Export the configuration
module.exports = configureGrunt;
