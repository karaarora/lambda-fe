import { Font } from "../store/types/toolbar";

export const fontSizes = [8,9,10,11,12,14,18,24,30,36,48,60,72,96];
export const fontsLoaded = (("fonts" in document) && (document.fonts.size > 0));
export const loadFonts = (fonts:Font[]):Promise<unknown[]> => 
Promise.all(fonts.map((font:Font) => new Promise((res:any, rej:any) => {
    const fontData = {
      weight: 400,
      src: `url('${font.file.replace('http','https')}')`,
    };
    const ff = new FontFace(font.family, fontData.src);
    ff.load()
      .then(f => {
        document.fonts.add(f);
        res();
      })
      .catch((error:any) => {
        rej(error);
      });
  })));

export const clearFonts = ():void => {
  if("fonts" in document){
    document.fonts.clear();
  }
};

export const formatFonts = (fonts:any[]):Font[] => fonts.reduce((acc:Font[],font:any) => (
    [...acc,{
        kind: font.kind,
        family: font.family,
        variant: font.variants[0],
        file: font.files[font.variants[0]]
      }
    ]
  ),[]);