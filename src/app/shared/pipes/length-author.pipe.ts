import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lengthAuthor'
})
export class LengthAuthorPipe implements PipeTransform {

  transform(author) {
    return author.length> 40 ? author.slice(0,40)+'...' : author;
  }

}
