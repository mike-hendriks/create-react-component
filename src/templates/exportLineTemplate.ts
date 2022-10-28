export function exportLineTemplate(
  componentName: string,
) {
	return `
// ==== ${componentName} ====
export { default as ${componentName} } from './${componentName}/${componentName}';
export { ${componentName}Fragment } from './${componentName}/${componentName}.fragment';
export type { ${componentName}Type } from './${componentName}/${componentName}.types';
`;
}
