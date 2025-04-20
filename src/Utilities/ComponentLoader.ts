import { LiteralClient, ComponentFile } from '../types';
import ReadFolder from './ReadFolder';

const components: string[] = ['Buttons', 'Menus', 'Modals'];

export default function (client: LiteralClient) {
  for (const component of components) {
    let componentCount = 0;
    const componentFiles = ReadFolder(`${__dirname}/../${component}`);

    for (const file of componentFiles) {
      const component: ComponentFile = require(file).default;
      if (!component) {
        client.logs.warn(
          `The file at ${file} does not export a valid component.`
        );
        continue;
      }

      if (!component.customID || typeof component.customID !== 'string') {
        client.logs.warn(`Component ${file} has an invalid customID`);
        continue;
      }

      if (!component.execute || typeof component.execute !== 'function') {
        client.logs.warn(`Component ${file} has an invalid execute function`);
        continue;
      }

      client.components.set(component.customID, component);
      componentCount++;
    }

    client.logs.info(`Loaded ${componentCount} ${component.toLowerCase()}`);
  }
}
