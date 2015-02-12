module.exports = function(grunt){
    grunt.initConfig({
        concurrent: {
            tasks: ['shell:mongodb', 'nodemon'],
            options: {
                logConcurrentOutput: true
            }
        },
        shell: {
            mongodb: {
                command: 'mongod --dbpath /home/ubuntu/workspace/db --nojournal',
                options: {
                    async: true,
                    stdout: false,
                    stderr: true,
                    failOnError: true,
                    execOptions: {
                        cwd: '.'
                    }
                }
            }
        },
        nodemon: {
            all: {
               script: 'server.js',
               options: {
                   watchedExtensions : ['js']
               }
            }
       }
    });
    
    
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-nodemon');
    
    grunt.registerTask('default', ['concurrent']);
    
    /*
     *this will do samething as above because without specifying an individual task inside concurrent, grunt will execute all tasks
     * grunt.registerTask('default', ['concurrent:tasks'])
     */
};