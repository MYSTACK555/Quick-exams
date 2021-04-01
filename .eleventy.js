const CleanCSS = require("clean-css");
const { minify } = require("terser");

module.exports = function (config) {
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
	config.addPassthroughCopy({ "node_modules/stripe/lib/": "js/stripe/" });
	config.addPassthroughCopy({
		"node_modules/@fortawesome/fontawesome-free/js/": "js/fontawesome/",
	});

	return {
		dir: {
			input: "src",
			output: "dist",
			data: "_data",
		},
	};
};
