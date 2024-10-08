"use client";

import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";
import { asText, Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { TextSplitter } from "./TextSplitter";

import gsap, { random } from "gsap";
import { useGSAP } from "@gsap/react";

import ScrollTrigger from "gsap/ScrollTrigger";
import { View } from "@react-three/drei";
import Scene from "./Scene";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */

const Hero = ({ slice }: HeroProps): JSX.Element => {
  useGSAP(() => {
    const introTl = gsap.timeline();

    introTl
      .set(".hero", { opacity: 1 })
      .from(".hero-header-word", {
        scale: 3,
        opacity: 0,
        ease: "power4.in",
        delay: 0.3,
        stagger: 0.1,
      })
      .from(
        ".hero-subheading",
        {
          opacity: 0,
          y: 30,
        },
        "+=0.8",
      )
      .from(".hero-subheading", {
        opacity: 0,
        y: 10,
      })
      .from(
        ".hero-button",
        {
          opacity: 0,
          y: 100,
          duration: 0.3,
          ease: "bounce.out",
        },
        "-=1.8",
      );

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
   //   onComplete: () => { floatingTl.play(); },
    });

    scrollTl
      .fromTo(
        "body",
        {
          backgroundColor: "#FDE047",
        },
        {
          backgroundColor: "#D9F99D",
          overwrite: "auto",
        },
        0.5,
      )
      .from(".text-side-heading .split-char", {
        scale: 1.3,
        y: 40,
        rotate: -25,
        opacity: 0,
        stagger: 0.1,
        ease: "back.out(1.7)",
        duration: 0.5,
      })
      .from(".text-side-body", {
        y: 20,
        opacity: 0,
      })


 /******* Floating Text Animation **********/    
  // const floatingTl = gsap.timeline({
  //   paused: true
  // });

  //   floatingTl
  //   .to(".text-side-heading .split-char", {
  //     y: "-=20",
  //     x: "+=15",
  //     rotation: "-=5",
  //     ease: "power1.inOut",
  //     repeat: -1,
  //     yoyo: true,
  //     duration: 1,
  //   })
  //   .to(".text-side-heading .split-char", {
  //     y: "+=20",
  //     x: "-=15",
  //     rotation: "-=5",
  //     ease: "power1.inOut",
  //     repeat: -1,
  //     yoyo: true,
  //     duration: 1,
      
      
  //   })
  //   .to(".text-side-heading .split-char", {
  //     y: "-=6",
  //     rotation: "+=5",
  //     ease: "power1.inOut",
  //     repeat: -1,
  //     yoyo: true,

      
  //   })
  //   .to(".text-side-heading .split-char", {
  //     y: "+=10",
  //     rotation: "+=5",
  //     ease: "power1.inOut",
  //     repeat: -1,
  //     yoyo: true,
  //     duration: 1,
      
  //     });
});

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hero opacity-0"
    >
      <View className="hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block">
        <Scene />
      </View>
      <div className="grid">
        <div className="grid h-screen place-items-center">
          <div className="grid auto-rows-min place-items-center text-center">
            <h1 className="hero-header text-7xl font-black uppercase leading-[.8] text-orange-500 md:text-[9rem] lg:text-[13rem]">
              <TextSplitter
                className="hero-header-word"
                text={asText(slice.primary.heading)}
                wordDisplayStyle="block"
              />
            </h1>
            <div className="hero-subheading mt-12 text-5xl font-semibold text-sky-950 lg:text-6xl">
              <PrismicRichText field={slice.primary.subheading} />
            </div>
            <div className="hero-body text-2xl font-normal text-sky-950">
              <PrismicRichText field={slice.primary.body} />
            </div>
            <Button
              className="hero-button mt-12"
              buttonLink={slice.primary.button_link}
              buttonText={slice.primary.button_text}
            />
          </div>
        </div>

        <div className="text-side relative z-[80] grid h-screen items-center gap-4 md:grid-cols-2">
          <PrismicNextImage
            className="w-full md:hidden"
            field={slice.primary.cans_image}
          />

          <div>
            <h2 className="text-side-heading text-balance text-6xl font-black uppercase text-sky-950">
              <TextSplitter text={asText(slice.primary.second_heading)} />
            </h2>

            <div className="text-side-body mx-w-xl mt-4 text-balance text-xl font-normal text-sky-950">
              <PrismicRichText field={slice.primary.second_body} />
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
