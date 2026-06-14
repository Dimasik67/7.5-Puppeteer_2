const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After, setDefaultTimeout } = require("cucumber");
const { clickElement, getText } = require("../../lib/commands.js");

setDefaultTimeout(70000);

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 300 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
  await this.page.goto('https://qamid.tmweb.ru/client/index.php');

});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user selects movie and session time and goes to the {string} page", async function (string) {
  await clickElement(this.page, "body > nav > a:nth-child(3)");
  await this.page.waitForSelector("body > main > section:nth-child(3)");  
  await clickElement(this.page, "section:nth-child(3) > div:nth-child(3) > ul > li > a");
  return await this.page.goto(`https://qamid.tmweb.ru${string}`);
  
});

When("user selects seats, clicks button and goes to the {string} page", async function (string) {
  await clickElement(this.page, "div:nth-child(6) span:nth-child(6)");
  await clickElement(this.page, "div:nth-child(6) > span:nth-child(7)");
  await this.page.waitForSelector("div:nth-child(6) > span.buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_selected");
  await clickElement(this.page, ".acceptin-button")
  return await this.page.goto(`https://qamid.tmweb.ru${string}`);
  
});

Then("user sees the title {string}", async function (string) {
  await this.page.goto("https://qamid.tmweb.ru/client/payment.php");
  const actual = await getText(this.page, ".ticket__check-title");
  const expected = await string;
  expect(actual).contains(expected);
});

When("user selects vip-seat, clicks button and goes to the {string} page", async function (string) {
  await clickElement(this.page, "div:nth-child(10) > span:nth-child(1)");
  await this.page.waitForSelector ("div:nth-child(10) > span.buying-scheme__chair.buying-scheme__chair_vip.buying-scheme__chair_selected");
  await clickElement(this.page, ".acceptin-button");
  return await this.page.goto(`https://qamid.tmweb.ru${string}`);
});

Then("user clicks button and sees the title {string}", async function (string) {
  await clickElement(this.page, ".acceptin-button");
  const actual = await getText(this.page, "section:nth-child(1) > div:nth-child(2) > p:nth-child(7)");
  const expected = await string;
  expect(actual).contains(string);
});

When("user selects occupied seats", async function () {
  await clickElement(this.page, "div:nth-child(10) > span:nth-child(1)");
  await this.page.waitForSelector('.buying-scheme__chair.buying-scheme__chair_vip.buying-scheme__chair_taken');
});

Then ("user cannot book seats because the button is {string}", async function (string) {
  const expected = {
    selector: await this.page.waitForSelector('button'),
    disabled: true
  };  
  expect(expected).to.have.property(string);
});