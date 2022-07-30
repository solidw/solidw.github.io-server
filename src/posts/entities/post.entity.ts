import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryColumn()
  id: number;

  @Column()
  count: number;
}
