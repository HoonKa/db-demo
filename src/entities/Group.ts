import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, Relation } from 'typeorm';
import { Artist } from './Artist';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  groupId: string;

  @Column()
  name: string;

  @Column()
  albumsSold: number;

  @ManyToMany(() => Artist, (artist) => artist.groups, { cascade: true })
  members: Relation<Artist>[];
}

// const newArtist = new Artist();
// const newGroup = new Group();
// new Group name = "";
// newArtistGroup = [new Group];
