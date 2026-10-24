import React, { ElementType } from 'react';
import { motion, MotionProps } from 'motion/react';

export interface FadeInProps extends MotionProps {
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: ElementType;
  children?: React.ReactNode;
}

export const FadeIn: React.FC<FadeInProps> = ({
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
  style = {},
  as = 'div',
  children,
  ...props
}) => {
  // Use motion.create if present, or dynamic tag from motion
  const Component = (motion.create ? motion.create(as as any) : (motion as any)[as as string]) || motion.div;

  const variants = {
    hidden: {
      opacity: 0,
      x,
      y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '50px', amount: 0 }}
      variants={variants}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
};
