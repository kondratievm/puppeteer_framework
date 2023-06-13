import { Page, Browser } from "puppeteer";
import * as puppeteer from "puppeteer";
import { publishsubscribe, messagesList } from "./publishSubscribe";

const browserLaunchOptions = {
  defaultViewport: {
    width: 1200,
    height: 800,
  },
  headless: false,
};

class BrowserAdapter {
  private currentPage: Page;
  private browser: Browser;

  constructor() {}

  async initCurrentPage() {
    this.browser = await puppeteer.launch(browserLaunchOptions);
    this.currentPage = await this.browser.newPage();

    publishsubscribe.publish(messagesList.currentPage, this.currentPage);
  }

  async goto(url: string) {
    if (!this.currentPage) {
      await this.initCurrentPage();
    }

    await this.currentPage.goto(url);
  }

  async close() {
    await this.browser.close();

    publishsubscribe.publish(messagesList.closeBrowser, this.currentPage);
  }

  async sleep(time = 1000) {
    await (() => new Promise((res) => setTimeout(res, time)))();
  }
}

const browser = new BrowserAdapter();

export { browser };
