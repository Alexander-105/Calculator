function test(counter) {
    counter--;
    console.log("part 1 - " + counter);

    if (counter != 0) {
        test(counter);
    }

    console.log("part 2 - " + counter);
}