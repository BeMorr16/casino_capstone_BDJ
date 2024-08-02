import anime from "animejs";

export const getRouletteIndexFromNumber = (number, rouletteData) => {
  return rouletteData?.numbers.indexOf(parseInt(number));
};

export const getRotationFromNumber = (
  number,
  rouletteData,
  singleRotationDegree
) => {
  const index = getRouletteIndexFromNumber(number, rouletteData);
  return singleRotationDegree * index;
};

export const getRandomEndRotation = (
  minNumberOfSpins,
  maxNumberOfSpins,
  totalNumbers,
  singleRotationDegree
) => {
  const rotateTo = anime.random(
    minNumberOfSpins * totalNumbers,
    maxNumberOfSpins * totalNumbers
  );
  return singleRotationDegree * rotateTo;
};

export const getZeroEndRotation = (totalRotation) => {
  return 360 - Math.abs(totalRotation % 360);
};

export const getBallEndRotation = (
  zeroEndRotation,
  currentNumber,
  rouletteData,
  singleRotationDegree
) => {
  return (
    Math.abs(zeroEndRotation) +
    getRotationFromNumber(currentNumber, rouletteData, singleRotationDegree)
  );
};

export const getBallNumberOfRotations = (
  minNumberOfSpins,
  maxNumberOfSpins
) => {
  const numberOfSpins = anime.random(minNumberOfSpins, maxNumberOfSpins);
  return 360 * numberOfSpins;
};

export const spinWheelAnimation = (
  lastNumberRotation,
  endRotation,
  ballEndRotation,
  singleSpinDuration,
  bezier
) => {
  anime.set([".layer-2", ".layer-4"], {
    rotate: lastNumberRotation,
  });
  anime.set(".ball-container", {
    rotate: 0,
  });

  anime({
    targets: [".layer-2", ".layer-4"],
    rotate: endRotation,
    duration: singleSpinDuration,
    easing: `cubicBezier(${bezier.join(",")})`,
  });

  anime({
    targets: ".ball-container",
    translateY: [
      { value: 0, duration: 1000 },
      { value: 20, duration: 1500 },
      { value: 50, duration: 2000 },
      { value: 90, duration: 2000 },
    ],
    rotate: ballEndRotation,
    duration: singleSpinDuration,
    easing: `cubicBezier(${bezier.join(",")})`,
  });
};
