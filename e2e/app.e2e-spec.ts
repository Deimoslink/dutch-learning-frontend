import { EPMWBCUIPage } from './app.po';

describe('epmwbc-ui App', () => {
  let page: EPMWBCUIPage;

  beforeEach(() => {
    page = new EPMWBCUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
