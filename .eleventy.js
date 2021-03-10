module.exports = function(config){

    config.addPassthroughCopy("src/js");
    config.addPassthroughCopy("src/asset");
    config.addPassthroughCopy("src/admin");
    config.addPassthroughCopy("src/css");
    return{
        dir:{
            input: "src",
            output: "dist",
            data: "_data"
        }
    };
};