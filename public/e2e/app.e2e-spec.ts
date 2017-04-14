import { PublicPage } from './app.po';

describe('public App', () => {
  let page: PublicPage;

  beforeEach(() => {
    page = new PublicPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
