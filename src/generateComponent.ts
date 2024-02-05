import { window, Uri } from "vscode";

import {
  writeFile,
  getSetting,
  readFile,
  readDirectory,
  openFile,
} from "./utilities";
import {
  exportLineTemplate,
  reactFunctionComponentTemplate,
  stylesTemplate,
  typesTemplate,
} from "./templates";

import * as vscode from "vscode";

function directoryToAddComponent(uri: Uri) {
  return uri.path;
}

async function writeComponentsFolderIndexFile(
  directory: string,
  componentName: string
) {
  const componentsFolderIndexPath = `${directory}/index.ts`;
  const componentsFolderIndexContents = await readFile(
    componentsFolderIndexPath
  );

  if (componentsFolderIndexContents) {
    writeFile(
      componentsFolderIndexPath,
      componentsFolderIndexContents.concat(exportLineTemplate(componentName))
    );
  } else {
    writeFile(componentsFolderIndexPath, exportLineTemplate(componentName));
  }
}

async function writeComponentFiles(directory: string, componentName: string) {
  const useIndexFile = getSetting<boolean>("useIndexFile", true);

  // Write component file
  const componentPath = `${directory}/${componentName}/${componentName}.tsx`;
  const componentPromise = writeFile(
    componentPath,
    reactFunctionComponentTemplate(componentName)
  );

  // Write style file
  writeFile(
    `${directory}/${componentName}/${componentName}.module.scss`,
    stylesTemplate(componentName)
  );

  // Write fragment file
  // writeFile(
  // 	`${directory}/${componentName}/${componentName}.fragment.ts`,
  // 	fragmentTemplate(componentName)
  // );

  // Write types file
  writeFile(
    `${directory}/${componentName}/${componentName}.types.ts`,
    typesTemplate(componentName)
  );

  // Write components folder index file
  if (useIndexFile && !directory.endsWith("/components")) {
    writeComponentsFolderIndexFile(directory, componentName);
  }

  await componentPromise;
  openFile(componentPath);
}

// This is the function that gets registered to our command
export async function generateComponent(uri?: Uri) {
  const projectFolder = vscode.workspace.workspaceFolders[0].uri.path;

  // vscode.window.showInformationMessage(projectFolder);

  let finalUrl: Uri = uri;

  if (!uri) {
    if (readDirectory(`${projectFolder}/components`)) {
      // make string uri
      finalUrl = await Uri.parse(`${projectFolder}/components`);
      vscode.window.showInformationMessage(finalUrl.toString());
      // console.log('if');
      // console.log(uri);
    } else {
      vscode.window.showInformationMessage("else");
      return window.showErrorMessage("No file path found.");
    }
  }

  const componentName = await window.showInputBox({
    prompt: "Component name",
  });

  if (!componentName) {
    return window.showErrorMessage("No component name passed");
  }

  const directory = directoryToAddComponent(finalUrl);

  // vscode.window.showInformationMessage(directory);

  writeComponentFiles(directory, componentName);
}
