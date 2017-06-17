import { ImmoAngularPage } from './app.po';

describe('immo-angular App', function() {
  let page: ImmoAngularPage;

  beforeEach(() => {
    page = new ImmoAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
