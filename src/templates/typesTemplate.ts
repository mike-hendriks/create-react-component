export function typesTemplate(componentName: string) {
  return `
export type ${componentName}Type = {
	title: string;
};

export default ${componentName}Type;
`.trimStart();
}
