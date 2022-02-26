import { createAnimation } from "@ionic/vue";

export const FadeInDown = (baseEl: any) => {
    console.log(baseEl)
    console.log(baseEl.getBoundingClientRect())
    baseEl = baseEl.shadowRoot
    
    const wrapperEle = baseEl.querySelector(".popover-content");
    console.log(wrapperEle)
    return createAnimation("FadeInDown")
        .addElement(wrapperEle)
       .duration(1000)
       .fromTo('opacity', '0', '1')
       .fromTo('transform', 'translate3d(0, -100%, 0)', 'translate3d(0, 0, 0)');

  };