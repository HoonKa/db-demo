import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, Relation, JoinTable } from 'typeorm';
import { Book } from './Book';

@Entity()
export class Author {
  @PrimaryGeneratedColumn('uuid')
  authorId: string;

  @Column()
  name: string;

  @Column({ default: 'unknown' })
  countryOfOrigin: string;

  @ManyToMany(() => Book, (books) => books.authors)
  @JoinTable()
  books: Relation<Book>;
}
