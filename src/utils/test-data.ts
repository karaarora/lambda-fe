import { Meme, Options } from "../store/types/meme";

export const likeClass = "text-blue-400";
export const disLikeClass = "text-red-400";
export const testUser = {
    id: "2",
    username: "test"
};
// eslint-disable-next-line max-len
export const testFabricState = "{\"version\":\"4.6.0\",\"objects\":[{\"type\":\"textbox\",\"version\":\"4.6.0\",\"originX\":\"left\",\"originY\":\"top\",\"left\":92,\"top\":56.7,\"width\":32.99,\"height\":26.85,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":1,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":2,\"scaleY\":2,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":\"\",\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"fontFamily\":\"\",\"fontWeight\":\"normal\",\"fontSize\":11,\"text\":\"Sample Text\",\"underline\":false,\"overline\":false,\"linethrough\":false,\"textAlign\":\"left\",\"fontStyle\":\"normal\",\"lineHeight\":1.16,\"textBackgroundColor\":\"\",\"charSpacing\":0,\"styles\":{},\"direction\":\"ltr\",\"path\":null,\"pathStartOffset\":0,\"pathSide\":\"left\",\"minWidth\":20,\"splitByGrapheme\":false}]}";

export const getTestMeme = (type:string,state?:boolean):Meme => ({
    id: "1",
    heading: "Test Meme",
    likes: ["1","2"],
    dislikes: ["3","4"],
    user: {
        _id: "2",
        username: "test"
    },
    thumbnail_url: "test.jpg",
    image_url: "test.png",
    view_count: 12,
    state: state ? testFabricState: "",
    type,
    status: "SAVED"
});

export const getTestOptions = (numberOfOptions:number):{
    title: string;
    options: Options[];
} => ({
    title: "Option Title",
    options: [...new Array(numberOfOptions)]
        .fill({})
        .map((item:any,index:number) => ({...item,...{ 
            displayText: `Options${index}`,
            key: `${index}`,
            isSelected: index === 2 
        }}
    ))
});

export const testFilters = {
    sort: "TRENDING",
    type: "MEME",
    query: "water"
};

export const MemeLoadableCard = {
    isLoading: true
};

export const testFontSize = "14";
export const testActiveFont = { family: "Monstrat" };
export const testfontsList = [{kind: "webfonts#webfont", family: "ABeeZee", 
variant: "regular", file: "http://fonts.gstatic.com/s/abeezee/v14/esDR31xSG-6AGleN6tKukbcHCpE.ttf"}
,{kind: "webfonts#webfont", family: "Abel", 
variant: "regular", file: "http://fonts.gstatic.com/s/abel/v12/MwQ5bhbm2POE6VhLPJp6qGI.ttf"}
,{kind: "webfonts#webfont", family: "Abhaya Libre", 
variant: "regular", file: "http://fonts.gstatic.com/s/abhayalibre/v6/e3tmeuGtX-Co5MNzeAOqinEge0PWovdU4w.ttf"}];