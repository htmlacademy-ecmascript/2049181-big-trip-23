const getRandomInteger = (min, max) => {
  min = Math.floor(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const makeGetRandomIntegerNoRepeat = () => {
  const usedIntegers = [];

  return (min, max) => {
    let randomInteger = getRandomInteger(min, max);

    if (usedIntegers.length === max - min + 1) {
      return null;
    }

    while (usedIntegers.includes(randomInteger)) {
      randomInteger = getRandomInteger(min, max);
    }

    usedIntegers.push(randomInteger);
    return randomInteger;
  };
};

const getRandomArrayElement = (elements) => {
  if (elements.length > 0) {
    return elements[getRandomInteger(0, elements.length - 1)];
  }
};

export {
  getRandomInteger,
  makeGetRandomIntegerNoRepeat,
  getRandomArrayElement,
};
