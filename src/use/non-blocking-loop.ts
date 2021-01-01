type INonBlockingLoop = (
  iterations: number,
  callback: (i: number) => void,
  done: () => void,
  isRevert?: boolean,
) => void;

export const useNonBlockingLoop = () => {
  const nonBlockingLoop: INonBlockingLoop = (iterations, callback, done, isRevert) => {
    let i = isRevert ? iterations - 1 : 0;
    const step = isRevert ? -1 : 1;
    const loop = () => {
      const isNeedLoop = isRevert ? i >= 0 : i < iterations;
      if (isNeedLoop) {
        callback(i);
        i += step;
        (window.requestAnimationFrame || window.setTimeout)(loop);
      } else {
        done();
      }
    };
    loop();
  };

  return {
    nonBlockingLoop,
  };
};
