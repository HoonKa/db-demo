import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, Relation } from 'typeorm';
import { Book } from './Book';

@Entity()
export class Author {
  @PrimaryGeneratedColumn('uuid')
  authorId: string;

  @Column()
  name: string;

  @Column({ default: 'unknown' })
  countryOfOrigin: string;

  @Column({ nullable: true })
  publishedYear: number; // year of first publication

  @Column({ default: false })
  public: boolean; // whether the book is the public domain.

  @ManyToMany(() => Book, (books) => books.authors)
  books: Relation<Book>;
}
