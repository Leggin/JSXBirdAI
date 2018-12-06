class Utilities {
    static limit(vec, val) {
        return Math.min(Math.max(vec, -val), val);
    }
    static rand(min, max) {
        return (Math.random() * (max - min)) + min;
    }

    static map(n, start1, stop1, start2, stop2, withinBounds) {
        var newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
        if (!withinBounds) {
            return newval;
        }
        if (start2 < stop2) {
            return this.constrain(newval, start2, stop2);
        } else {
            return this.constrain(newval, stop2, start2);
        }
    };

}