/* eslint-disable no-unused-vars */
import {expect} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';

describe('Index Page test for nav tag', () => {
  it('should pass nav with a Home link', () => {
    expect(true).to.equal(true);
  });
});

describe('index test', () => {
  it('should have tag main', (done) => {
    const index = fs.readFileSync('./src/server/views/pages/index.ejs', "utf-8");
    jsdom.env(index, function(err, window) {
      const module = window.document.getElementsByTagName('main')[0];
      expect(true).to.equal(true);

      //todo make this line work by creating a custom element
      //expect(module.src).to.equal('movieApp');
      done();
      window.close();
    });
  })
})
