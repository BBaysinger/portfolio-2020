({
    appDir: "../",
    baseUrl: "js/",
    dir: "../build-minified",
    //Comment out the optimize line if you want
    //the code minified by UglifyJS
    //optimize: "none",

    modules: [

        //Optimize the application files.
        {
            name: "main",
        }
    ]
})
