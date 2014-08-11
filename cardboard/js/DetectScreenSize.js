var detectScreenHeight = (function(navigator) {
  var info = [
    ['HTC One 801e', 59],
    ['HTC One VX', 57],
    ['Motorola Electrify', 54],
    ['Motorola MOT-XT681', 50],
    ['Nexus 5', 62],
    ['Optimus_Madrid', 57],
    ['SAMSUNG EK-GN120', 60],
    ['SAMSUNG GT-B7810/B7810BUALG1', 55],
    ['SAMSUNG GT-I9070/I9070BULD1', 53],
    ['SAMSUNG GT-I9210/I9210XXLC2', 59],
    ['SAMSUNG GT-S5839i/S5839iBULC1', 50],
    ['SAMSUNG GT-S7500/S7500BULB1', 52],
    ['SAMSUNG GT-S7580', 53],
    ['SAMSUNG SCH-I545', 63],
    ['SAMSUNG-GT-B9388_TD/1.0', 49],
    ['SAMSUNG-SGH-I437', 59],
    ['SAMSUNG-SGH-I537', 63],
    ['SAMSUNG-SGH-I547', 53],
    ['SAMSUNG-SGH-I577', 53],
    ['SAMSUNG-SGH-I727', 60],
    ['SAMSUNG-SGH-I777', 57],
    ['SAMSUNG-SGH-I827', 46],
    ['SAMSUNG-SGH-I847', 49],
    ['SAMSUNG-SGH-I857', 46],
    ['SAMSUNG-SGH-I927', 53],
    ['SAMSUNG-SM-G730A', 53],
    ['SonyEricssonX10i', 50]
  ];

  /**
   * detectScreenHeight returns a device's screen height in millimeters while
   * in landscape orientation based on its user agent string. Its database
   * contains heights for the top Android phones as of June 2014.
   *
   * @param  {String} [userAgent] - phone's user agent string
   * @return {Number} the screen height in millimeters while in landscape, or 53
   * if the device is not in the database.
   */
  return function detectScreenHeight(userAgent) {
    userAgent = userAgent || navigator.userAgent;

    for (var i = 0; i < info.length; i++) {
      var name = info[i][0];
      var height = info[i][1];

      if (userAgent.indexOf(name) > 0) {
        return height;
      }
    }

    return null;
  };

})(navigator);

/**
 * detectScreenSize detects the size of the current window in millimeters and
 * pixels using user agent detection. All measurements are in landscape
 * orientation.
 *
 * @param  {Window} win - the window to measure
 * @return {Object} object containing the screen size in millimeters and pixels
 * or null if the screen size could not be detected
 */


 function detectScreenSize(win) {
  win = win || window;

  var screenHeight = detectScreenHeight();
  if (!screenHeight) {
    return null;
  }

  var resolutionX = win.innerWidth;
  var resolutionY = win.innerHeight;

  var orientation = getOrientation();

  // swap width and height in portrait orientation
  if (orientation === 0 || orientation === 180) {
    var temp = resolutionX;
    resolutionX = resolutionY;
    resolutionY = temp;
  }

  var ratio = resolutionX / resolutionY;
  var screenWidth = screenHeight * ratio;

  return {
    mm: {
      x: screenWidth,
      y: screenHeight
    },
    px: {
      x: resolutionX,
      y: resolutionY
    }
  };
}

/**
 * Get the orientation
 * @return {Number} screen orientation
 */
var getOrientation = function() {
  switch (window.screen.orientation || window.screen.mozOrientation) {
    case 'landscape-primary':
      return 90;
    case 'landscape-secondary':
      return -90;
    case 'portrait-secondary':
      return 180;
    case 'portrait-primary':
      return 0;
  }
  // if (!window.orientation && window.innerWidth > window.innerHeight)
  //   return 90;
  return window.orientation || 0;
};

