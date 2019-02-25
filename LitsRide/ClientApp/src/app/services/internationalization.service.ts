import { Injectable } from '@angular/core';

@Injectable()
export class InternationalizationService {
  public static lang = 'en';
  constructor() {

  }
  setLang(lang) {
    InternationalizationService.lang = lang;
  }
}
