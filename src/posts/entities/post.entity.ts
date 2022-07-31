import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: false, default: 0 })
  views: number;
}
