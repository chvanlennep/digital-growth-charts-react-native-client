function findNearestInt(age: number) {
  // returns the nearest value where months and weeks are integers
  let roundedAge = Math.round(age * 10) / 10;
  while ((roundedAge * 12) % 1 !== 0 && roundedAge * 52 !== 0) {
    roundedAge += 0.1;
  }
  return roundedAge;
}

function ageThresholds(measurementPairArray: any): [number, number] {
  // this is a helper function return minimum and maximum ages of child measurements to be plotted
  // This function supplies the domain of the axis and centiles to limit rendering to capture charts between the
  // child measurement values. If only one value is plotted, only that chart is rendered
  if (measurementPairArray.length < 1) {
    // there are no measurements yet - return a chart aged 0-20y
    return [0, 20];
  } else {
    let maxAge;
    const minAge = measurementPairArray[0][0].x;
    const maxAgeDecimalAge =
      measurementPairArray[measurementPairArray.length - 1][0].x;
    if (measurementPairArray[measurementPairArray.length - 1].length > 1) {
      maxAge = measurementPairArray[measurementPairArray.length - 1][1].x;
    } else {
      maxAge = measurementPairArray[measurementPairArray.length - 1][0].x;
    }
    if (minAge === maxAgeDecimalAge) {
      //there is only one measurement min=max
      if (minAge < 0.038) {
        // show 2 weeks either side
        let newMinAge = minAge - 0.0383;
        let newMaxAge = maxAge + 0.038;
        if (newMinAge <= -0.383) {
          // < 24 weeks
          newMinAge = -0.383;
        }
        return [-0.383, 0.0383];
      }
      if (minAge < 2) {
        // show 6 mths either side
        let newMinAge = minAge - 0.5;
        let newMaxAge = minAge + 0.5;
        newMinAge = findNearestInt(newMinAge);
        newMaxAge = findNearestInt(newMaxAge);
        return [newMinAge, newMaxAge];
      }
      if (minAge < 4) {
        // show 2 years either side
        let newMaxAge = minAge + 2;
        let newMinAge = minAge - 2;
        newMinAge = findNearestInt(newMinAge);
        newMaxAge = findNearestInt(newMaxAge);
        return [newMinAge, newMaxAge];
      } else {
        // show 4 years either side
        let newMaxAge = minAge + 4;
        let newMinAge = minAge - 4;
        newMinAge = findNearestInt(newMinAge);
        newMaxAge = findNearestInt(newMaxAge);
        return [newMinAge, newMaxAge];
      }
    } else {
      // more than one measurement
      let newMaxAge = maxAge;
      let newMinAge = minAge - 0.0383;
      if (newMinAge <= -0.383) {
        // < 24 weeks
        newMinAge = -0.383;
      }
      if (maxAge <= 2 && maxAge >= 0.0383) {
        newMaxAge += 0.5;
        newMinAge -= 0.5;
        newMaxAge = findNearestInt(newMaxAge);
        newMinAge = findNearestInt(newMinAge);
      }
      if (maxAge < 4 && maxAge >= 2) {
        newMaxAge += 2;
        newMaxAge = findNearestInt(newMaxAge);
        newMinAge = findNearestInt(newMinAge);
      }
      if (maxAge < 20 && maxAge >= 4) {
        newMaxAge += 4;
        if (newMaxAge > 20) {
          newMaxAge = 20;
        }
      }

      return [newMinAge, newMaxAge];
    }
  }
}

export default ageThresholds;
