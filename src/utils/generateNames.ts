import {adjectives, animals, colors, uniqueNamesGenerator} from "unique-names-generator";

export function genRandomName (): string {
  return uniqueNamesGenerator({
    dictionaries: [colors, adjectives, animals]
  })
}
