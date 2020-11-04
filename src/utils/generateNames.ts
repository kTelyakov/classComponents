import {adjectives, animals, colors, uniqueNamesGenerator} from "unique-names-generator";

export function genRandomName (): string {
  return uniqueNamesGenerator({
    dictionaries: [colors, adjectives, animals]
  })
}

export function genDate () {
  const formatter = new Intl.DateTimeFormat("ru", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  });
  return formatter.format(new Date())
}
