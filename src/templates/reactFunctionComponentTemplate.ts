export function reactFunctionComponentTemplate(componentName: string) {
  let template = `
import classNames from 'classnames';
import { storyblokEditable } from "@storyblok/react";
import styles from './${componentName}.module.scss';
import { ${componentName}Type } from './${componentName}.types';

export const ${componentName} = ({ blok }: ${componentName}Type) => {

	return (
		<div className={styles.wrapper} {...storyblokEditable(blok)}>

		</div>
	);
};

export default ${componentName};
`;

  return template.trimStart();
}
