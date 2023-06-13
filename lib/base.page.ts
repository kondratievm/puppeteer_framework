import { publishsubscribe, messagesList } from "./publishSubscribe";
// import { step } from "./reporter/index";

class BasePage {
  private selector: string;
  private name: string;
  private page: any;

  constructor(selector, name) {
    this.selector = selector;
    this.name = name;

    publishsubscribe.subscribe(
      messagesList.currentPage,
      this.initPage.bind(this)
    );
  }

  initPage(page) {
    this.page = page;
  }

  get id() {
    return this.name;
  }
}

export { BasePage };
