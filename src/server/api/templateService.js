/* eslint-disable no-unused-vars */
/** Namespace for Movie App
/* Here is where you build the MovieApp module */
import ejs from 'ejs';

export default class TemplateService
{
   static say(){
    return "hi";
  }
  /** @string: template ,@Object: data  */
  static load(template,data)
  {

    return ejs.render(template, data);
  }
}
