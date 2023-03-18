const { selectDateTime, orderTickets } = require("./lib/util.js");
const { getText } = require("./lib/commands");

let page;
let tomorrow = "nav.page-nav > a:nth-child(2)"; // на завтра (9 число)
let oneWeek = "nav.page-nav > a:nth-child(7)"; // на неделю (14 число)
let movieTime = "[data-seance-id='129']"; // 19:00, Логан
let ticketHint = "p.ticket__hint";
let confirmingText = "Покажите QR-код нашему контроллеру для подтверждения бронирования.";

describe("Booking tickets", () => {
  beforeEach(async () => {
    await page.goto("http://qamid.tmweb.ru/client/index.php");
  });

  afterEach(async () => {
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  //Задача 1
  test("Should order one ticket for Movie (Логан) tomorrow", async () => {
    let row = 1;
    let seat = 2;
    await selectDateTime(page, tomorrow, movieTime);
    await orderTickets(page, row, seat);
    const actual = await getText(page, ticketHint);
    expect(actual).toContain(confirmingText);
  });

  test("Should order three tickets for Movie (Логан)  in a week", async () => {
    let row = 1;
    let seat_1 = 8;
    let seat_2 = 9;
    let seat_3 = 10;
    await selectDateTime(page, oneWeek, movieTime);
    await orderTickets(page, row, seat_1, seat_2, seat_3);
    const actual = await getText(page, ticketHint);
    expect(actual).toContain(confirmingText);
  });

  test("Should try to order ticket for Movie (Логан) if seat is taken already", async () => {
    let row = 1;
    let seat = 2;
    await expect(async () => {
      await selectDateTime(page, tomorrow, movieTime);
      await orderTickets(page, row, seat);
    }).rejects.toThrowError("Seat(s) is taken");
  });

  //Задача 2
  test("Check if the place is taken after ordering ", async () => {
    let row = 3;
    let seat = 10;
    await selectDateTime(page, oneWeek, movieTime);
    await orderTickets(page, row, seat);
    await page.goto("http://qamid.tmweb.ru/client/index.php");
    await selectDateTime(page, oneWeek, movieTime);
    const classExist = await page.$eval(
      `div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${seat})`,
      (el) => el.classList.contains("buying-scheme__chair_taken")
    );
    expect(classExist).toEqual(true);
  });
});
