import dayjs from "https://cdn.skypack.dev/dayjs";
import { deliveryOptions } from "../../data/delivery-options.js";

export function getDeliveryOptions(deliveryOptionId) {
  const matchingItem = deliveryOptions.find(
    (option) => option.id === deliveryOptionId,
  );

  return matchingItem;
}

function isWeekend(date) {
  const dayOfWeek = date.format("dddd");
  return dayOfWeek === "Saturday" || dayOfWeek === "Sunday";
}

export function calculateDeliveryDate(deliveryDays) {
  let date = dayjs();
  let remainingDays = deliveryDays;

  while (remainingDays > 0) {
    date = date.add(1, "day");

    if (!isWeekend(date)) remainingDays--;
  }

  return date.format("dddd, MMMM D");
}
