const languages = require("./supportedLanguages.json");
async function getText(language) {
	try {
		const file = require(`./${language}.json`);
		return {
            "language":language,
            "traductionFile":file
        };
	} catch (error) {
		console.log(error);
	}
}

module.exports = async function () {
	var promises = languages.map(getText);
	return Promise.all(promises).then((nobbject) => {
		console.log("nobject:", nobbject);
		return [].concat.apply([], nobbject);
	});
};
