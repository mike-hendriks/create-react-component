export function typesTemplate(componentName: string) {
  return `
import { ISbRichtext } from "@storyblok/react";

export type ${componentName}Type = {
	blok: {
		_uid: string;
		_editable: string;
	};
};

export default ${componentName}Type;
`.trimStart();
}
