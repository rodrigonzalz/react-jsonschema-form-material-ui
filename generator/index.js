/* eslint-disable import/no-extraneous-dependencies */
/**
 * Todo: 
 * This file will generate all custom components and integrate within react-json-schema project
 * - It should pick up the component name and versions
 * - It should add the component to the current react-json-schema library
 * - It should be able to generate and push this to a npm package manager (This part can be used for unimod as well)
 * */

/**
  * Things to complete
  * Step 1: Download the dependency by doing npm install for the package
  * Step 2: Copy the dependancy in generator folder
  * Step 3: Generate code in following files 
  *         - app-config          [Should generate the component name 'slug' and the location to the library]
  *         - component.config    [Should generate the actual logic of rendering the component]
  *         - package.json        [Should be able to generate package.json with giving name and version]
  *         - ** Tests ***        [Should eventually generate tests as well]
  * Step 4: Should be able to run the tests and compile the project 
  * Step 5: Should be able to publish the newly defined name to npm.
  */

const ejs = require('ejs');
const shelljs = require('shelljs');

const componentSettings = require('./components.json');

const templateFile = require('./templates/app-config.template.js');
const templateUtilFile = require('./templates/utils-config.template.js');

const template = ejs.compile(templateFile, {});
const finalString = template({ ...componentSettings });
const shellFileString = new shelljs.ShellString(finalString);

const templateUtil = ejs.compile(templateUtilFile, {});
const finalUtilString = templateUtil({ ...componentSettings });
const shellUtilFileString = new shelljs.ShellString(finalUtilString);

// Folder Variables
const generatedLocation = `${shelljs.pwd()}/src/generated`;
const generatorLocation = `${shelljs.pwd()}/generator`;

shelljs.rm('-rf', `${generatedLocation}/components`);
shelljs.rm('-rf', `${generatedLocation}/utils`);
shelljs.rm('-rf', `${generatorLocation}/node_modules`);
shelljs.rm('-rf', `${generatorLocation}/package-lock.json`);
shelljs.rm('-rf', `${generatorLocation}/package.json`);

console.log('generating app config file');

shellFileString.to(`${generatedLocation}/app.config.js`);

console.log('app config file generated');

console.log('Downloading component dependencies');

shelljs.cd(generatorLocation);
shelljs.exec('npm init --yes');
Object.keys(componentSettings.components)
  .filter((c) => !componentSettings.components[c].notAvailable)
  .forEach((compName) => {
    shelljs.exec(
      `npm install ${compName}@${componentSettings.components[compName].version} --save-exact`,
    );
  });
shelljs.cp(
  '-R',
  'node_modules/@react-jsonschema-form-components/',
  `${generatedLocation}/components`,
);

console.log('Components downloaded successfully');

console.log('Downloading utils dependencies');

Object.keys(componentSettings.utils)
  .filter((c) => !componentSettings.utils[c].notAvailable)
  .forEach((utilName) => {
    shelljs.exec(
      `npm install ${utilName}@${componentSettings.utils[utilName].version} --save-exact`,
    );
  });
shelljs.cp(
  '-R',
  'node_modules/@react-jsonschema-form-utils/',
  `${generatedLocation}/utils`,
);

shellUtilFileString.to(`${generatedLocation}/utils/index.js`);

console.log('Utils downloaded successfully');
