export function fragmentTemplate(componentName: string) {
	return `
import { ResponsiveImageFragment } from '@/lib/fragments';

export const ${componentName}Fragment = \`
	${componentName.toLowerCase()} {

	}
\`;

export default ${componentName}Fragment;
`.trimStart();
}

