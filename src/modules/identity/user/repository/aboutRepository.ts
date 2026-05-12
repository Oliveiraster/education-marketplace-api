import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AboutUpdateDto } from '../../profile/dto/updates/about-update.dto';
import { About } from '../entities/about.entity';
import { User } from '../entities/user.entity';

export class AboutRepository {
  constructor(
    @InjectRepository(About)
    private readonly aboutRepository: Repository<About>,
  ) {}

  async upsertAbout(user: User, dto: AboutUpdateDto) {
    const about = await this.aboutRepository.findOne({
      where: {
        user: { id: user.id },
      },
    });

    if (!about) {
      const newAbout = this.aboutRepository.create({
        ...dto,
        user,
      });

      return this.aboutRepository.save(newAbout);
    }

    this.aboutRepository.merge(about, dto);

    return this.aboutRepository.save(about);
  }
}
