import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const post = this.postRepository.create(createPostDto);
    const created = await this.postRepository.save(post);
    return created;
  }

  async findAll() {
    const found = await this.postRepository.find();
    const sorted = found.sort(({ id: aId }, { id: bId }) => aId - bId);

    return sorted;
  }

  async findOne(id: number) {
    return this.postRepository.findOne({
      select: ['id', 'views'],
      where: { id },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const updated = await this.postRepository.update(id, updatePostDto);
    return updated.raw;
  }

  async increment(id: number) {
    const found = await this.postRepository.findOne({
      select: ['id', 'views'],
      where: { id },
    });

    if (found == null) {
      await this.create({ id, views: 0 });
    }

    const increased = await this.postRepository.increment({ id }, 'views', 1);
    return increased.affected != null;
  }

  async remove(id: number) {
    const found = await this.findOne(id);
    return this.postRepository.remove(found);
  }
}
