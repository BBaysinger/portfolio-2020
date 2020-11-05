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
const activePiecesMap = {};
let j = 0;

keys.forEach((key, index) => {
  if (json[key].active === "1") {
    activeKeys[j] = key;
    activePieces[j] = json[activeKeys[j]];
    activePiecesMap[key] = json[activeKeys[j]];
    j++;
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
exports.activeKeys = activeKeys;
exports.activePieces = activePieces;
exports.activePiecesMap = activePiecesMap;
