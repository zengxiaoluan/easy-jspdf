export class Metadata {
  constructor() {}

  protected author: string = "";
  protected title: string = "";
  protected subject: string = "";

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
}
