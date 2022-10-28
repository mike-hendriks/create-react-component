export function reactFunctionComponentTemplate(
  componentName: string,
) {
  let template = `
import { Image } from 'react-datocms';
import classNames from 'classnames';
import styles from './${componentName}.module.scss';
import { ${componentName}Type } from './${componentName}.types';

const ${componentName} = ({  }: ${componentName}Type) => {

	return (
		<div className={styles.wrapper}>

		</div>
	);
};

export default ${componentName};
`;

  return template.trimStart();
}
