module.exports = function(config){

    config.addPassthroughCopy("src/js");
    config.addPassthroughCopy("src/asset");
    return{
        dir:{
            input: "src",
            output: "dist"
        }
    };
};