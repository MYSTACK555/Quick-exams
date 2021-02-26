module.exports = function(config){

    config.addPassthroughCopy("src/js");
    config.addPassthroughCopy("src/css");
    config.addPassthroughCopy("node_modules/@fortawesome/fontawesome-free");
    return{
        dir:{
            input: "src",
            output: "dist",
            data: "_data"
        }
    };
};