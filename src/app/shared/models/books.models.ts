export class Book{
  constructor(
    public author: string,
    public title: string,
    public date: Date,
    public id?: number
  ){}
}
