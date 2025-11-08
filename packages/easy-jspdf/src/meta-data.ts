export class Metadata {
  constructor() {}

  protected author: string = "";
  protected title: string = "";
  protected subject: string = "";
  protected keywords: string = "";

  setAuthor(author: string) {
    this.author = author;
    return this;
  }

  setTitle(title: string) {
    this.title = title;
    return this;
  }

  setSubject(subject: string) {
    this.subject = subject;
    return this;
  }

  setKeywords(keywords: string) {
    this.keywords = keywords;
    return this;
  }
}
