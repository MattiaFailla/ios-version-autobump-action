const semver = require('semver')
const fs = require('fs');
const semver2int = require('semver2int');

// Incrementing the version by version tag
// versionCode — A positive integer [...] -> https://developer.android.com/studio/publish/versioning
const versionCodeRegexPattern = /versionCode [0-9]+/;
// versionName — A string used as the version number shown to users [...] -> https://developer.android.com/studio/publish/versioning
const versionNameRegexPattern = /versionName "[^"]*"/;

let fileContent = fs.readFileSync(PbxPath);

console.log(versionNameRegexPattern.exec(fileContent)[0].replace("versionName ", "").replace("\"", "").replace("\"", ""));
console.log(versionCodeRegexPattern.exec(fileContent)[0].replace("versionCode ", ""));

let currentVersionName = semver.clean(versionNameRegexPattern.exec(fileContent)[0].replace("versionName ", "").replace("\"", "").replace("\"", ""))
let currentVersionCode = versionCodeRegexPattern.exec(fileContent)[0].replace("versionCode ", "");
console.log(`Current version: ${currentVersionName}`);
let newVersionName = semver.inc(currentVersionName, version);
let newVersionCode = semver2int(newVersionName);
console.log(newVersionName);
console.log(`New version: ${newVersionName}`);
let newFileContent = fileContent.toString().replace(`versionName "${currentVersionName}"`, `versionName "${newVersionName}"`);
newFileContent = newFileContent.toString().replace(`versionCode ${currentVersionCode}`, `versionCode ${newVersionCode}`)