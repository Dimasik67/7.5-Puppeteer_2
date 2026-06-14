const { clickElement, getText } = require("./lib/commands");

let page;


beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(10000);
  await page.goto('https://qamid.tmweb.ru/client/index.php');
  
});  

afterEach(() => {
page.close();
});

describe("Booking cinema tickets test", () => {
  beforeEach(async () => {
    await clickElement(page, "body > nav > a:nth-child(3)");
    await page.waitForSelector("body > main > section:nth-child(3)");  
    await clickElement(page, "section:nth-child(3) > div:nth-child(3) > ul > li > a");
    await page.goto("https://qamid.tmweb.ru/client/hall.php");
  });
  
  test("Successful selection of seats in the hall", async () => {
              
    await clickElement(page, "div:nth-child(6) span:nth-child(6)");
    await clickElement(page, "div:nth-child(6) > span:nth-child(7)");
    await page.waitForSelector("div:nth-child(6) > span.buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_selected");
    await clickElement(page, ".acceptin-button");
    await page.goto("https://qamid.tmweb.ru/client/payment.php");
    const actual = await getText(page, ".ticket__check-title");
    expect(actual).toContain("Вы выбрали билеты:");

    });

    test("Successful reserved of vip-seats in the hall", async () => {
      
      await clickElement(page, "div:nth-child(10) > span:nth-child(2)");
      await page.waitForSelector ("div:nth-child(10) > span.buying-scheme__chair.buying-scheme__chair_vip.buying-scheme__chair_selected");
      await clickElement(page, ".acceptin-button");
      await page.goto("https://qamid.tmweb.ru/client/payment.php");
      await page.waitForSelector ("h2");
      await clickElement(page, ".acceptin-button");

      const actual = await getText(page, "section:nth-child(1) > div:nth-child(2) > p:nth-child(7)");
      const expected = "Покажите QR-код нашему контроллеру для подтверждения бронирования."
      expect(actual).toContain(expected);
    });

    test("Should not reserved occupied seats", async () => {
      
      await clickElement(page, "div:nth-child(10) > span:nth-child(2)")
      await page.waitForSelector(".buying-scheme__chair.buying-scheme__chair_vip.buying-scheme__chair_taken");
      
      const bookingButton = {
        selector: await page.waitForSelector('button'),
        disabled: true};

      expect(bookingButton).toHaveProperty("disabled");    
            
    });
});