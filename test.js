const {
    selectDateTime,
    orderTickets,
    checkSeatIsTaken,
  } = require("./lib/util.js");
  const { getText } = require("./lib/commands");

  let page;
  let tomorrow          =  "nav.page-nav > a:nth-child(2)"; // на завтра
  let oneWeek           =  "nav.page-nav > a:nth-child(7)"; // на неделю
  let movieTime         =  "[data-seance-id='94']"; // 14:00, Hercules
  let ticketHint        =  "p.ticket__hint";
  let confirmingText    =  "Покажите QR-код нашему контроллеру для подтверждения бронирования.";

    describe("Service for Movie tickets order", () => {





    });