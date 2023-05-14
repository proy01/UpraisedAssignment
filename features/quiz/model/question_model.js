export class Question {
    constructor(id, question, options, answer, showImage, imageLink) {
      this.id = id;
      this.question = question;
      this.options = options;
      this.answer = answer;
      this.showImage = showImage;
      this.imageLink = imageLink;
    }
  }