module.exports = (grunt) ->

    # prepare stuff
    require('time-grunt')(grunt)
    require('load-grunt-config')(grunt)

    # configuration
    grunt.initConfig(
        pkg: grunt.file.readJSON('package.json')
        cssnext:
            options:
                sourcemap: false
                import: true
                # compress: true # DEV
            dist:
                files:
                    "public/styles/main.css": "_assets/styles/main.css"
        coffee:
            default:
                options:
                    sourcemap: false
                expand: true
                cwd: '_assets/scripts'
                src: ['**/*.coffee']
                dest: 'public/scripts'
                ext: '.js'
        svgstore:
            default:
                options:
                    prefix: 'icon-'
                    svg:
                        style: 'width: 0; height: 0; overflow: hidden; position: fixed; visibility: hidden;'
                    formatting:
                        indent_size: 4
                files:
                    '_includes/icons.svg': ['_assets/icons/*.svg']
        watch:
            icons:
                options:
                    spawn: false
                    debounceDelay: 250
                files: ['_assets/icons/*.svg']
                tasks: ['svgstore']
            styles:
                files: ['_assets/styles/**/*.css']
                tasks: ['cssnext']
            scripts:
                files: ['_assets/scripts/**/*.coffee']
                tasks: ['coffee']
        copy:
            scripts:
                expand: true
                cwd: '_assets/scripts/thirdparty'
                src: '**/*.js'
                dest: 'public/scripts/thirdparty'
        clean:
            generativeAssets:
                src: ['public/scripts', 'public/styles']
    )

    # register tasks
    grunt.registerTask('default', [
        'build_assets'
        'watch'
    ])
    grunt.registerTask('build', [
        'build_assets'
    ])
    grunt.registerTask('build_assets', [
        'clean:generativeAssets'
        'svgstore'
        'coffee'
        'cssnext'
        'copy:scripts'
    ])
