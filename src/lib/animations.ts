// Animation variants for framer-motion
export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0
  }
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -40 },
  visible: { 
    opacity: 1, 
    y: 0
  }
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0
  }
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0
  }
};

// Dev mode specific animations
export const glitchEffect = {
  initial: { x: 0 },
  animate: {
    x: [0, -2, 2, -1, 1, 0],
    transition: {
      duration: 0.3,
      repeat: Infinity,
      repeatDelay: 3
    }
  }
};

export const typingCursor = {
  initial: { opacity: 0 },
  animate: {
    opacity: [0, 1, 1, 0],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatDelay: 0
    }
  }
};

export const scanlineEffect = {
  initial: { y: '-100%' },
  animate: {
    y: '100%',
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

// Button/interaction animations
export const buttonHover = {
  scale: 1.05
};

export const buttonTap = {
  scale: 0.95
};

export const cardHover = {
  y: -8,
  scale: 1.02
};

export const likeAnimation = {
  scale: [1, 1.3, 0.9, 1.1, 1],
  rotate: [0, -10, 10, -5, 0],
  transition: { duration: 0.6, ease: "easeInOut" }
};

export const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Rotation animations
export const rotateIn = {
  hidden: { opacity: 0, rotate: -180 },
  visible: { 
    opacity: 1, 
    rotate: 0
  }
};

export const flipIn = {
  hidden: { opacity: 0, rotateY: -90 },
  visible: { 
    opacity: 1, 
    rotateY: 0
  }
};

// Page transitions
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

