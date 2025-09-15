import { Test, TestingModule } from '@nestjs/testing';
import { CreateTokensProvider } from './create-tokens.provider';

describe('CreateTokensProvider', () => {
  let provider: CreateTokensProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateTokensProvider],
    }).compile();

    provider = module.get<CreateTokensProvider>(CreateTokensProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
