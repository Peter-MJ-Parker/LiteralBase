import { LiteralClient, ComponentFile } from "../types";
import { logs, ReadFolder } from "#utilities";

const components: string[] = ["Buttons", "Menus", "Modals"];

export default async function (client: LiteralClient) {
  for (const component of components) {
    let componentCount = 0;
    const componentFiles = ReadFolder(`${component}`);

    for (const file of componentFiles) {
      const comp = await import(file);
      const component: ComponentFile = comp.default;
      if (!component) {
        logs.warn(
          `The file at ${file} does not export a valid component.`
        );
        continue;
      }

      if (!component.customID || typeof component.customID !== "string") {
        logs.warn(`Component ${file} has an invalid customID`);
        continue;
      }

      if (!component.execute || typeof component.execute !== "function") {
        logs.warn(`Component ${file} has an invalid execute function`);
        continue;
      }

      client.components.set(component.customID, component);
      componentCount++;
    }

    logs.info(`Loaded ${componentCount} ${component.toLowerCase()}`);
  }
}
