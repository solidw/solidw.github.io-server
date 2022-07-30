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
    return this.postRepository.find();
  }

  async findOne(id: number) {
    return this.postRepository.findOne({
      select: ['id', 'count'],
      where: { id },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const updated = await this.postRepository.update(id, updatePostDto);
    return updated.raw;
  }

  async remove(id: number) {
    const found = await this.findOne(id);
    return this.postRepository.remove(found);
  }
}
