import axios from "@/axios.ts"

export default class CommentGenerator {
  public static async create() {
     return axios.get('https://baconipsum.com/api/?type=meat-and-filler')
  }
}
