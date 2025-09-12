import { Test, TestingModule } from '@nestjs/testing';
import { FindOneByEmailProvider } from './find-one-by-email.provider';

describe('FindOneByEmailProvider', () => {
  let provider: FindOneByEmailProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindOneByEmailProvider],
    }).compile();

    provider = module.get<FindOneByEmailProvider>(FindOneByEmailProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
