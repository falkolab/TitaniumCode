module.exports = function (grunt) {
    grunt.initConfig({
        "titaniumifier": {
            "module": {
                src: ".",
                dest: "./dist"
            }
        }
    });
    grunt.loadNpmTasks('grunt-titaniumifier');

    // Default task.
    grunt.registerTask('default',  ['titaniumifier:module']);
};
