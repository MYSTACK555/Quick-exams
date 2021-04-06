const directories = require("./SecurityDirectory.json");
async function getText(dir) {
	try {
		return {
            "directory":dir
        };
	} catch (error) {
		console.log(error);
	}
}

module.exports = async function () {
	var promises = directories.map(getText);
	return Promise.all(promises).then((nobbject) => {
		console.log("Security: Loaded");
		return [].concat.apply([], nobbject);
	});
};