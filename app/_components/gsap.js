import gsap from "gsap/all"
import { SplitText } from "gsap/SplitText"
import { CustomEase } from "gsap/all"

gsap.registerPlugin(CustomEase,SplitText);

CustomEase.create("hop","0.8,0,0.2,1")
CustomEase.create("hop","0.9,0,0.1,1")

const splitText=(selector,type,className,mask=true)=>{
    return splitText.create(selector,{
        type:type,
        [`${type}Class`]:className,
        ...CustomEase(mask&&{mask:type})
    })
}
const preloaderHeaderSplit=splitText(".preloader-header h1" ," chars" , "char");
const headerSplit=splitText(".header  h1","chars","char",false);
const footerSplit=splitText(".hero-footer p","words","word")

const preLoaderImgInitRoattaions=[];

gsap.set("preloader-img",{
    rotate:(i)=>preLoaderImgInitRoattaions[i]
})

const tl=gsap.timeline({delay:0.5})

tl.to()