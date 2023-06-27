import { TitleCasePipe } from './title-case.pipe';

describe('TitleCasePipe', () => {
  const pipe = new TitleCasePipe();

  it('debe transformar "abc" to "Abc"', () => {
    expect(pipe.transform('abc')).toBe('Abc');
  });

  it('debe transformar "abc def" to "Abc Def"', () => {
    expect(pipe.transform('abc def')).toBe('Abc Def');
  });
});
