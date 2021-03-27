module.exports = function(config){

    config.addPassthroughCopy("src/js");
    config.addPassthroughCopy("src/asset");
    config.addPassthroughCopy("src/css");
    config.addPassthroughCopy({"node_modules/stripe/lib/":"js/stripe/"});
    
    return{
        dir:{
            input: "src",
            output: "dist",
            data: "_data"
        }
    };
};