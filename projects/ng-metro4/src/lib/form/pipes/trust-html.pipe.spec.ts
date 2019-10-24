import { TrustHtmlPipe } from './trust-html.pipe';

describe('TrustHtmlPipe', () => {
  it('create an instance', () => {
    const pipe = new TrustHtmlPipe();
    expect(pipe).toBeTruthy();
  });
});
