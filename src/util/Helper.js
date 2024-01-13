export function createToken() {
  return (
    Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)
  );
}

export function codeRandom() {
  return Math.random().toString(36).substr(2);
}

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export const avgStar = (arrComment) => {
  if (arrComment.length <= 0) {
    return 0;
  }
  const avg = Math.floor(
    arrComment.reduce((acc, cur) => acc + cur.numStar, 0) / arrComment.length
  );

  return avg;
};

export const avgRating = (arrComment) => {
  if (arrComment.length <= 0) {
    return 0;
  }
  const avg = (
    arrComment.reduce((acc, cur) => acc + cur.numStar, 0) / arrComment.length
  ).toFixed(1);

  return avg;
};
export const countTimer = (timeNum) => {
  const now = new Date().getTime();
  const time = Math.max(timeNum - now);

  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / 1000 / 60) % 60);

  return {
    seconds,
    minutes,
    time,
  };
};

export const getToday = function (options = {}) {
  const today = new Date();

  if (options?.end) {
    today.setUTCHours(23, 59, 59, 999);
  } else {
    today.setUTCHours(0, 0, 0, 0);
  }

  return today.toISOString();
};
