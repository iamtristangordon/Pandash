import { PandashPage } from './app.po';

describe('pandash App', () => {
  let page: PandashPage;

  beforeEach(() => {
    page = new PandashPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
