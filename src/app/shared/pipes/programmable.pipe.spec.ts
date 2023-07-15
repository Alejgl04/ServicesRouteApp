import { ProgrammablePipe } from './programmable.pipe';

describe('ProgrammablePipe', () => {
  it('create an instance', () => {
    const pipe = new ProgrammablePipe();
    expect(pipe).toBeTruthy();
  });
});
