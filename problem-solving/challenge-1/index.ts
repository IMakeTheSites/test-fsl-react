export const numbersFractionCalculator = (numbers: number[]) => {

    let positives = 0;
    let negatives = 0;
    let zeros = 0;

    numbers.forEach(num => {
        if (num > 0) {
            positives += 1;
        } else if (num < 0) {
            negatives += 1;
        } else {
            zeros += 1;
        }
    });

    const total = positives + negatives + zeros;

    return {
        positives: (positives / total).toFixed(6),
        negative: (negatives / total).toFixed(6),
        zeros: (zeros / total).toFixed(6),
    }
};