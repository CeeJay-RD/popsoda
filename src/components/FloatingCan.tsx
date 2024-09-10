"use client";

import { Float } from "@react-three/drei";
import { SodaCan, SodaCanProps } from "@/components/SodaCan";
import { forwardRef, ReactNode } from "react";
import { Group } from "three";

type FloatingCanProps = {
  flavor?: SodaCanProps["flavor"];
  floatSpeed?: number;
  rotationIntensity?: number;
  floatingIntensity?: number;
  floatingRange?: [number, number];
  children?: ReactNode;
};

const FloatingCan = forwardRef<Group, FloatingCanProps>(({
  flavor = "blackCherry",
  floatSpeed = 1.5,
  rotationIntensity = 1,
  floatingIntensity = 1,
  floatingRange = [-0.1, 0.1],
  children,
  ...props
}, ref) => {
  return (
    <group ref={ref} {...props}>
      <Float
        speed={floatSpeed}
        rotationIntensity={rotationIntensity}
        floatIntensity={floatingIntensity}
        floatingRange={floatingRange}
      >
        <SodaCan flavor={flavor} />
        {children}
      </Float>
    </group>
  );
});

FloatingCan.displayName = "FloatingCan";

export default FloatingCan;
