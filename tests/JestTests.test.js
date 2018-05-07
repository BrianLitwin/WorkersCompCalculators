
const functions = require('../Calculators/JS');


test("add commas to numbers", ()=> {

  expect(functions.commaSeparateNumber(91412)).toBe("91,412")

});

test("a number with 1 digit after the decimal gets a 0 added", ()=> {

  expect(functions.formatDecimalForMoney("1.1")).toBe("1.10")

});


test("Calculate PPD", ()=> {

  expect(functions.calculatePPD(25, 55, 10)).toBe(137.5)

  expect(functions.calculatePPD(75, 25, 150)).toBe(2812.5)

});


test("in PPD, imapirement rating cannot go over 100", ()=> {

  const irAt100 = functions.calculatePPD(25, 100, 10)
  const irOver100 = functions.calculatePPD(25, 101, 10)

  expect(irAt100).toEqual(irOver100)


});


test("converting total days to weeks and days", ()=> {

  expect(functions.convertTotalDaysToWeeksAndDays(6)).toEqual(
    {weeks: 0, days: 6}
  )

  expect(functions.convertTotalDaysToWeeksAndDays(10)).toEqual(
    {weeks: 1, days: 3}
  )

  expect(functions.convertTotalDaysToWeeksAndDays(7)).toEqual(
    {weeks: 1, days: 0}
  )

  expect(functions.convertTotalDaysToWeeksAndDays(10)).toEqual(
    {weeks: 1, days: 3}
  )

});

test("convert days and weeks to string", ()=> {

  expect(functions.convertsWeeksAndDaysToString({
    weeks: 1, days: 1
  })).toBe("1 week and 1 day")

  expect(functions.convertsWeeksAndDaysToString({
    weeks: 2, days: 2
  })).toBe("2 weeks and 2 days")

  expect(functions.convertsWeeksAndDaysToString({
    weeks: 0, days: 6
  })).toBe("6 days")

  expect(functions.convertsWeeksAndDaysToString({
    weeks: 2, days: 0
  })).toBe("2 weeks")

  expect(functions.convertsWeeksAndDaysToString({
    weeks: 0, days: 0
  })).toBe("0 days")

});


test("calculate present value", ()=> {

  expect(functions.calculatePresentValue(51, 49, 45)).toEqual({
     presentValue: 2029.70, totalPayment: 2499
  })

});


test("calculate end date", ()=> {

  // startDate: March 2nd
  const startDate = new Date(2018, 2, 2)
  //endDate: April 14th
  const endDate = new Date(2018, 3, 14)

  expect(functions.calculateEndDate(startDate, 5, 9)).toEqual(endDate)

});

test("sc life expectancy", () => {

  expect(functions.scLifeExpectancy(45, "male")).toEqual({
    remainingYears: 33.69, lifeExpectancy: 78.69
  })

  expect(functions.scLifeExpectancy(39, "female")).toEqual({
    remainingYears: 42.94, lifeExpectancy: 81.94
  })

})

test("nc life expectancy", () => {

  expect(functions.ncLifeExpectancy(45)).toEqual({
    remainingYears: 33.8, lifeExpectancy: 78.8
  })

  expect(functions.ncLifeExpectancy(4)).toEqual({
    remainingYears: 72.5, lifeExpectancy: 76.5
  })

});


test("nc life expectancy for age over max age", () => {

  expect(functions.ncLifeExpectancy(95)).toEqual({
    remainingYears: 6.6, lifeExpectancy: 101.6
  })

});


test("converting number into dollars", ()=> {
  expect(functions.formatNumberIntoDollars(9055.0943)).toBe("$9,055.09")
});
