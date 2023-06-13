declare const allure: any;

function stepAllure(stepName: string | Function) {
  return function (_target, propName, descriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args) {
      stepName = typeof stepName === "function" ? stepName(this.id) : stepName;

      return allure.step(stepName, () => originalMethod.call(this, ...args));
    };

    return descriptor;
  };
}

export { stepAllure };
