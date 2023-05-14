//This is a class object in JS so that when this is stored in questionsList, 
// one can directly call the properties of the instances in the list.
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