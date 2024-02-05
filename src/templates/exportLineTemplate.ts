export function exportLineTemplate(componentName: string) {
  return `
// ==== ${componentName} ====
export { ${componentName} } from './${componentName}/${componentName}';
export type { ${componentName}Type } from './${componentName}/${componentName}.types';
`;
}
