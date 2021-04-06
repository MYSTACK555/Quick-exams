const CleanCSS = require("clean-css");
const { minify } = require("terser");
const del = require('del');

module.exports = function (config) {
    const dirToClean = 'dist/*';
    del(dirToClean);

    //minify filter for css
	config.addFilter("cssmin", function (code) {
		return new CleanCSS({}).minify(code).styles;
	});

    //minify filter for js
	config.addNunjucksAsyncFilter("jsmin", async function (code, callback) {
		try {
			const minified = await minify(code);
			callback(null, minified.code);
		} catch (err) {
			console.error("Terser error: ", err);
			// Fail gracefully.
			callback(null, code);
		}
	});

    // 11ty config
    /*
    plus nécessaire considérant qu'il sont minifier
	config.addPassthroughCopy("src/js");
	config.addPassthroughCopy("src/css");
	*/
    config.addPassthroughCopy("src/asset");
    config.addPassthroughCopy("src/sitemap.xml");

	return {
		dir: {
			input: "src",
			output: "dist",
			data: "_data",
		},
	};
};
