import { publishsubscribe, messagesList } from "./publishSubscribe";
import { step } from "./reporter/index";

class BaseElement {
  private page: any;
  private selector: string;
  private currentElement: any;
  private name: string;

  constructor({
    page,
    selector,
    name,
  }: {
    page?: any;
    selector: string;
    name?: string;
  }) {
    this.page = page;
    this.selector = selector;
    this.name = name || BaseElement.name;

    publishsubscribe.subscribe(
      messagesList.currentPage,
      this.initPage.bind(this)
    );
  }

  get id() {
    return this.name;
  }

  // Инициализация страницы
  initPage(page) {
    this.page = page;
  }

  // Инициализация элемента со страницы
  private async initElement() {
    this.currentElement = await this.page.$(this.selector);
  }

  // Заполение строк в полях
  @step((name) => `${name} call send keys`)
  async sendKeys(value: string) {
    if (!this.currentElement) {
      await this.initElement();
    }

    await this.currentElement.type(value);
  }

  // Клик по элементу
  @step((name) => `${name} call click`)
  async click() {
    if (!this.currentElement) {
      await this.initElement();
    }

    await this.currentElement.click();
  }
}

// Получение селектора элемента
function _$(selector: string, name?: string): BaseElement {
  return new BaseElement({ selector, name });
}

export { _$, BaseElement };
