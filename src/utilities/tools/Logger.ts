import { RENDER_MESSAGE } from "@utilities/constants/messages";

class Logger {
  static COMPONENT_RENDER_MESSAGE = RENDER_MESSAGE;

  static logComponentRender = (componentName: string) => {
    console.log(`${componentName}: ${this.COMPONENT_RENDER_MESSAGE}`);
  };
}

export default Logger;
