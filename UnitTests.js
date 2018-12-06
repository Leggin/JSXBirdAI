class UnitTests {
    static TestUtilities() {
        console.assert(Utilities.limit(20, 10) == 10);

        console.assert(Utilities.limit(-20, 10) == -10);
        console.assert(Utilities.limit(10, 20) == 10);
        console.assert(Utilities.limit(-10, 20) == -10);
    }
}

UnitTests.TestUtilities();