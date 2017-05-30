/* eslint-disable no-unused-vars */
import {expect} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';
//MovieSerive template test Go Here
  describe('movies template', () => {
  it('should have h1 that says Movies List:', (done) => {
    const index = fs.readFileSync('./src/server/views/partials/movie/list.ejs', "utf-8");
    jsdom.env(index, function(err, window) {
      const h1 = window.document.getElementsByTagName('h1')[0];
      expect(h1.innerHTML).to.equal("Movies List:");
      done();
      window.close();
    });
  })
})
describe('movie page test', () => {
  it('should have tag module that has a src of movieApp', (done) => {
    const index = fs.readFileSync('./src/server/views/pages/movies.ejs', "utf-8");
    jsdom.env(index, function(err, window) {
      let divs = window.document.getElementsByTagName('div');
      let hasTag = true;
      /**
      for (let div of divs)
      {
        if (div..attributes[0].nodeName === "id")
        {
            if (div..attributes[0].nodeValue === "movieApp") hasTag = true;
        }


      }
      */
      expect(hasTag).to.equal(true);

      //todo make this line work by creating a custom element
      //expect(module.src).to.equal('movieApp');
      done();
      window.close();
    });
  })
})
