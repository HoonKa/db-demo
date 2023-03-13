import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation } from 'typeorm';
import { Review } from './Review';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  bookId: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  year: number; // year of first publication

  @Column({ default: false })
  public: boolean; // whether the book is the public domain.

  @ManyToOne(() => Review, (review) => review.books)
  review: Relation<Review>[];
}
