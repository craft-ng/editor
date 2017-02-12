import { EditorNgPage } from './app.po';

describe('editor-ng App', function() {
  let page: EditorNgPage;

  beforeEach(() => {
    page = new EditorNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
