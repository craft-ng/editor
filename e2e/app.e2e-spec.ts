import { EditorPage } from './app.po';

describe('Craft-Ng Editor App', () => {
  let page: EditorPage;

  beforeEach(() => {
    page = new EditorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
