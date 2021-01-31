const dayjs = require("dayjs");
var relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);

const now = dayjs();
const someday = dayjs("2020-05-05T09:12:57.848Z");
const tomorrow = dayjs().add(1, "day").format("DD/MM/YYYY");
const diff = dayjs(someday).from(now);
console.log(diff);
console.log(someday.format("DD/MM/YYYY"));
console.log(dayjs().subtract(7, "year").format("DD/MM/YYYY"));

var duration = someday.diff(now, "month");
console.log(duration);
console.log("tomorrow", tomorrow);
