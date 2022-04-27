import moment from "moment"

export function formatToChinaDate(date) {
  return moment(date).format("DD-MM-YYYY");
}