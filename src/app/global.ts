//'use strict';

export const sep = '/';
export const version: String = "1.0.2";

// export const debugApp: boolean = false;
// export const debugApp: boolean = true;



// export const serverpath: string ="http://localhost:8080/";
// export const serverpath: string ="http://54.179.173.143/";
export class Utils {
  public static round(number, precision) {
    const factor = Math.pow(10, precision);
    const tempNumber = number * factor;
    const roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
  }
  public static isDuplicate(arr,fields) {
    const valueArr = arr.map(function(item) {
      let obj;
      for (let i = 0 ; i < fields.length; i++){
        obj = obj + item[fields[i]].toUpperCase();
      }
      return obj;
    });
    const isDupli = valueArr.some(function(item, idx) {
      return valueArr.indexOf(item) !== idx;
    });
    return isDupli;
  }
  public static IsDate(dt) {
    const dtsplit = dt.split(/[-,/,.]+/);
    // console.log(dtsplit)
    if (dtsplit.length > 2) {
      if (dtsplit[2].length === 2 || dtsplit[2].length === 4) {
        const yyyy = +((dtsplit[2].length > 2 ? '' : (dtsplit[2] > '50' ? '19' : '20'))+ dtsplit[2]);
        const dd  = +dtsplit[0] ; const mm  = +dtsplit[1]; const yy  = yyyy as number;
        // console.log(dd, mm, yy);
        if (yy >= 1900 && yy <= 9999) {
          if (mm >= 1 && mm <= 12) {
              if ((dd >= 1 && dd<=31) && (mm===1 || mm===3 || mm===5 || mm===7 || mm===8 || mm===10 || mm===12)){
                return true;
              } else if ((dd >= 1  && dd <= 30) && (mm === 4 || mm === 6 || mm === 9 || mm === 11)) {
                return true;
              } else if ((dd>=1 && dd<=28) && (mm===2)){
                return true;
              } else if (dd===29 && mm===2 && (yy % 400 === 0 || (yy % 4 === 0 && yy % 100 !== 0))){
                return true;
              }
          }
        }
      }
    }
    return false ;
  }
//   public static getValidClass(relTex: string ){
//     let validTxt ='';
//     // switch (relTex.toUpperCase()){
//     //   case 'MU': case 'MUS': case 'MUSLIM': case 'ISLAM':
//     //       validTxt = 'MU'; break;
//     //   case 'CR': case 'CRISTIAN': case 'X': case 'CHR': case 'CHRISTIAN':
//     //       validTxt  = 'CR'; break;
//     //   case 'HD': case 'HINDU':  case 'HIN': case 'HIND':
//     //       validTxt = 'HD'; break;
//     //   default:
//     //     validTxt =  'invalid';
//     // }
//     return validTxt;
// }
  public static getValidReligion(relTex: string ){
    let validTxt ;
    switch (relTex.toUpperCase()){
      case 'MU': case 'MUS': case 'MUSLIM': case 'ISLAM':
          validTxt = 'MU'; break;
      case 'CR': case 'CRISTIAN': case 'X': case 'CHR': case 'CHRISTIAN':
          validTxt  = 'CR'; break;
      case 'HD': case 'HINDU':  case 'HIN': case 'HIND':
          validTxt = 'HD'; break;
      default:
        validTxt =  'invalid';
    }
    return validTxt;
  }
  public static getValidCast(txt: string){
    let validTxt ;
    switch (txt.toUpperCase()) {
      case 'CR': case 'CHRISTIAN': case 'X': case 'CRI': case 'XI\'\'AN': case 'CRISTIAN':
        validTxt =  'CR'; break;
      case 'HD': case 'HINDU': case 'HIN': case 'HIND':
        validTxt =  'HD'; break;
      case 'MU': case 'MUS': case 'MUSLIM': case 'ISLAM':
        validTxt =  'MU'; break;
      case 'CON': case 'CONVERTED': case 'CONVERT': case 'CONV':
        validTxt =  'CON'; break;
      case 'EZ': case 'EZHAVA': case 'EZH': case 'EZHAV': case 'EZHAVE':
        validTxt =  'EZ'; break;
      case 'MUK': case 'MUKKUVA': case 'MUKUVA': case 'MUKKU': case 'MUKKUVE':
        validTxt =  'MUK'; break;
      case 'NAIR': case 'NAYAR':
        validTxt =  'NAIR'; break;
      case 'NAM': case 'NAMBIAR': case 'NAMBIYAR':
        validTxt =  'NAM'; break;
      case 'PL': case 'PULAYA':
        validTxt =  'PL'; break;
      case 'RCSC': case 'RC SC':
        validTxt =  'RCSC'; break;
      case 'SAL': case 'SALIYA':
        validTxt =  'SAL'; break;
      case 'TH': case 'THIYA': case 'THIYYA':
        validTxt =  'TH'; break;
      case 'BH': case 'OTHER BACKWARD HINDU': case 'OTHER BACKWARD': case 'OTHER HINDU': case 'BACKWARD HINDU':
        validTxt =  'BH'; break;
      case 'LA': case 'LATIN CATHOLIC AND  ANGLO INDIANS':
      case 'LATIN CATHOLIC AND  ANGLO INDIAN': case 'LATIN': case 'ANGLO INDIAN':
        validTxt =  'LA'; break;
      case 'DV': case 'DHEEVARA': case 'DHEEVERA': case 'DHEEVARE': case 'DEEVARA': case 'DEEVARE':
        validTxt =  'DV'; break;
      case 'VK': case 'VISWAKARMA': case 'VISHWAKARMA': case 'VISHVAKARMA':
        validTxt =  'VK'; break;
      case 'KN': case 'KUSAVAN':
        validTxt =  'KN'; break;
      case 'BX': case 'OTHER BACKWARD CHRISTIAN': case 'OTHER BACKWARD CHRISTIANS':
      case 'BACKWARD CHRISTIAN':
        validTxt =  'BX'; break;
      case 'KU': case 'KUDUMBI':
        validTxt =  'KU'; break;
      default:
        validTxt =  'invalid';
    }
    return validTxt;
  }
}
