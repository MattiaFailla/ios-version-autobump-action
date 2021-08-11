const semver = require('semver')
const fs = require('fs');
const semver2int = require('semver2int');

const PbxPath = "./project.pbxproj";

// Incrementing the version by version tag
// versionCode — A positive integer [...] -> https://developer.android.com/studio/publish/versioning
const versionCodeRegexPattern = /CURRENT_PROJECT_VERSION = ([0-9]+(\.[0-9]+)+);/;

let fileContent = fs.readFileSync(PbxPath);

let currentVersionName = semver.clean(versionCodeRegexPattern.exec(fileContent.toString())[1]);
console.log(`Current version: ${currentVersionName}`);

let newVersionName = semver.inc(currentVersionName, "minor");
console.log(`New version: ${newVersionName}`);
let newFileContent = fileContent.toString().replace(`CURRENT_PROJECT_VERSION = "${currentVersionName}"`, `CURRENT_PROJECT_VERSION = "${newVersionName}"`);
newFileContent = newFileContent.toString().replace(`MARKETING_VERSION = ${currentVersionName}`, `MARKETING_VERSION = ${newVersionName}`)