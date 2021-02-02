const dayjs = require("dayjs");

// const someday = dayjs("2020-05-05T09:12:57.848Z"); //parse expirty date
// const tomorrow = dayjs().add(1, "day"); //top up date
// const extradays = tomorrow.add(3, "day").toISOString();

// const diff = now.diff(tomorrow); //find diff between dates

// console.log("tomorrow", tomorrow);
// console.log("diff", diff);
// console.log("extradays", extradays);

export default class DateService {
    constructor() {
        this.dayjs = dayjs;
    }

    static async iExpired(expiry_date) {
        /**
         * @TODO
         */

        const diff = this.dayjs().diff(this.parseISOstirng(expiry_date)); //find diff between dates
        // return boolean true or false
        return diff > 1 ? true : false;
    }

    static parseISOstirng(date) {
        return this.dayjs(date);
    }

    static overwriteDate(number_of_days) {
        const newDate = this.dayjs().add(number_of_days, "day").toISOString();
        return newDate;
    }

    async topUpDate(curr_date, number_of_days) {
        let newDate = this.parseISOstirng(curr_date);
        newDate.add(number_of_days, "day").toISOString();

        return newDate;
    }

    async updateExpiryDate() {}
}

module.exports = DateService;
