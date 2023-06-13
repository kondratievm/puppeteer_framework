import { browser } from "../lib/browser";
import { _$ } from "../lib/element";
import { MainPage } from "../framework/pages/main.page";

describe("Login to system", function () {
  const mainPage = new MainPage();

  beforeEach(async () => {
    await browser.goto("https://demo.applitools.com/");
  });

  it("login", async function () {
    await mainPage.loginToSystem("admin", "123456");

    await browser.sleep(3000);
  });

  afterEach(async () => {
    await browser.close();
  });
});
