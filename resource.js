function createResource (
  site = 'google.com',
  geometry = {
    pos: { x: 0, y: 0 },
    size: { w: 800, h: 600 }
  }
) {
  return {
    site: site,
    geometry: geometry
  };
}

// TODO: move to separate module
var topLeft = {
  x: 0,
  y: 0
}
var width = 2044;
var height = 1300;
var xMid = width/2;
var geometries = {
  left: {
    pos: topLeft,
    size: {
      w: xMid,
      h: height
    }
  },
  right: {
    pos: {
      x: xMid,
      y: 0
    },
    size: {
      w: xMid,
      h: height
    }
  },
  full: {
    pos: topLeft,
    size: {
      w: width,
      h: height
    }
  }
};

module.exports = { createResource, geometries };
