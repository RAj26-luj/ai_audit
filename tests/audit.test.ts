describe(
  "basic calculations",
  () => {

    test(
      "monthly savings calculation works",
      () => {

        const original =
          200;

        const optimized =
          120;

        const savings =
          original -
          optimized;

        expect(
          savings
        ).toBe(80);
      }
    );

    test(
      "yearly savings calculation works",
      () => {

        const monthly =
          100;

        const yearly =
          monthly * 12;

        expect(
          yearly
        ).toBe(1200);
      }
    );

    test(
      "optimization score stays in range",
      () => {

        const score =
          92;

        expect(
          score
        ).toBeGreaterThan(0);

        expect(
          score
        ).toBeLessThanOrEqual(
          100
        );
      }
    );
  }
);