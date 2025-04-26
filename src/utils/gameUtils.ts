import { ObstacleType } from '../types/game';

// Check collision between bird and obstacles
export const checkCollision = (
  birdPosition: number,
  obstacles: ObstacleType[]
): boolean => {
  // Bird dimensions and position
  const birdLeft = 24; // left position
  const birdRight = birdLeft + 40; // width is 40px
  const birdTop = birdPosition;
  const birdBottom = birdPosition + 40; // height is 40px
  
  // Check each obstacle
  for (const obstacle of obstacles) {
    const obstacleLeft = obstacle.position;
    const obstacleRight = obstacle.position + 64; // pipe width is 64px
    
    // Only check collision if bird and obstacle overlap horizontally
    if (birdRight > obstacleLeft && birdLeft < obstacleRight) {
      // Check if bird hits top pipe
      if (birdTop < obstacle.height) {
        return true;
      }
      
      // Check if bird hits bottom pipe
      const bottomPipeTop = obstacle.height + obstacle.gap;
      if (birdBottom > bottomPipeTop) {
        return true;
      }
    }
  }
  
  return false;
};

// Generate a new obstacle with random height and gap
export const generateObstacle = (): ObstacleType => {
  // Calculate random height for the top pipe
  const minHeight = 50;
  const maxHeight = 250; // Reduced maximum height
  const height = Math.floor(Math.random() * (maxHeight - minHeight) + minHeight);
  
  // Set gap between pipes
  const gap = 180; // Increased gap size
  
  return {
    position: 800, // Increased starting position for more space between obstacles
    height,
    gap,
    passed: false,
  };
};