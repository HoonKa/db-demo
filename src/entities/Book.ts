import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Relation,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Review } from './Review';
import { Author } from './Author';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  bookId: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  publishedYear: number; // year of first publication

  @Column({ default: false })
  public: boolean; // whether the book is the public domain.

  @ManyToOne(() => Review, (review) => review.books)
  review: Relation<Review>[];

  @ManyToMany(() => Author, (authors) => authors.books)
  @JoinTable()
  authors: Relation<Author>[];
}
