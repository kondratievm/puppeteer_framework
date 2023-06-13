import { BasePage, _$, step, BaseElement } from "../../lib/index";

const userNameSelector = "#username";
const userPasswordSelector = "#password";
const signInBtnSelector = "#log-in";

class MainPage extends BasePage {
  private userName: BaseElement;
  private password: BaseElement;
  private signInBtn: BaseElement;

  constructor() {
    super(".auth-wrapper", "Main Page");

    this.userName = _$(userNameSelector, "User name field");
    this.password = _$(userPasswordSelector, "User password field");
    this.signInBtn = _$(signInBtnSelector, "Sign In button");
  }

  @step((name) => `${name} execute login to system`)
  async loginToSystem(userName, password) {
    await this.userName.sendKeys(userName);
    await this.password.sendKeys(password);

    await this.signInBtn.click();
  }
}

export { MainPage };
