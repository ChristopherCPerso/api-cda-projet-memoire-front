import filter from "./filter.svg?react";
import searchIcon from "./search.svg?react";
import cook from "./cook.svg?react";
import creditCard from "./creditCard.svg?react";
import add from "./add.svg?react";
import star from "./star.svg?react";
import starFull from "./star_full.svg?react";
import location from "./location.svg?react";
import phone from "./phone.svg?react";

export default {
  "filter": filter,
  "searchIcon": searchIcon,
  "cook": cook,
  "creditCard": creditCard,
  "add": add,
  "star": star,
  "starFull": starFull,
  "location": location,
  "phone": phone,
};

export type IconName =
  | "filter"
  | "searchIcon"
  | "cook"
  | "creditCard"
  | "add"
  | "star"
  | "starFull"
  | "location"
  | "phone";
