let json = require("../data/portfolio.json");

/**
 * A helper to expediate the use of portfolio data, and help with
 * orderting, and next/prev buttons.
 *
 * @author Bradley Baysinger
 * @since  x.x.x
 * @version N/A
 */
const keys = Object.keys(json);

const activeKeys = [];
const activePieces = [];
const listedPieces = [];
const listedKeys = [];
const activePiecesMap = {};
let activeIndex = 0;

keys.forEach((key) => {
  if (json[key].active === "1") {
    if (json[key].omitFromList !== "1") {
      listedPieces.push(json[key]);
      listedKeys.push(key);
    }
    activeKeys[activeIndex] = key;
    activePieces[activeIndex] = json[key];
    activePiecesMap[key] = json[key];
    activeIndex++;
  }
});

const pieceIndex = (key) => {
  return activeKeys.indexOf(key);
};

const prevKey = (key) => {
  let retVal;
  const pI = pieceIndex(key);

  if (pI > 0) {
    retVal = activeKeys[pI - 1];
  } else {
    retVal = activeKeys[activeKeys.length - 1];
  }

  return retVal;
};

const nextKey = (key) => {
  let retVal;
  const pI = pieceIndex(key);

  if (pI < activeKeys.length - 1) {
    retVal = activeKeys[pI + 1];
  } else {
    retVal = activeKeys[0];
  }

  return retVal;
};

exports.nextKey = nextKey;
exports.prevKey = prevKey;
exports.getPieceIndex = pieceIndex;
exports.listedKeys = listedKeys;
exports.activeKeys = activeKeys;
exports.listedPieces = listedPieces;
exports.activePieces = activePieces;
exports.activePiecesMap = activePiecesMap;
