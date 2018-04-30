module.exports = { commaSeparateNumber, formatNumberIntoDollars, calculatePPD, convertTotalDaysToWeeksAndDays, convertsWeeksAndDaysToString, calculatePresentValue, calculateEndDate, ncLifeExpectancy, scLifeExpectancy, formatDecimalForMoney }

//todo:
//create a ribbon at the top to scroll down to different calculators


//
//Mark: Present Value Calculator Methods
//


function postPresentValue() {

	const presentValueCalculator = $("#present-value-calculator")
	const weeklyPayment = presentValueCalculator.find("#weekly-payment").val()
	const weeks = presentValueCalculator.find("#weeks").val()
	const interestRate = presentValueCalculator.find("#interest-rate").val()

	const data = calculatePresentValue(weeklyPayment, weeks, interestRate)

	const label1 = presentValueCalculator.find("#result-label-1")
	const label2 = presentValueCalculator.find("#result-label-2")
	const value1 = presentValueCalculator.find("#result-value-1")
	const value2 = presentValueCalculator.find("#result-value-2")

	const numIsValid = !isNaN(data.presentValue) && data.totalPayment != 0

	label1.html(numIsValid ? "Total Payment" : "")
	value1.html(numIsValid ? formatNumberIntoDollars(data.totalPayment) : "")
	label2.html(numIsValid ? "Present Value" : "")
	value2.html(numIsValid ? formatNumberIntoDollars(data.presentValue) : "")

}

function calculatePresentValue(weeklyPayment, weeks, interestRate) {
	const totalPayment = weeklyPayment * weeks;
	const weeklyRate = ( interestRate/100 ) / 52;
	const presentValue = (weeklyPayment/weeklyRate) * ( 1- Math.pow( (1+weeklyRate), -weeks ));
	const totalPaymentRounded = round(totalPayment, 2);
	const presentValueRounded = round(presentValue, 2)
	return { totalPayment: totalPaymentRounded, presentValue: presentValueRounded }
}

//
//PPD Calculator
//

function postPPD() {
	const ppdCalculator = $("#PPD-calculator")
	const bodypartOptions = ppdCalculator.find("#bodypart-options")[0]
	const weeks = bodypartOptions[bodypartOptions.selectedIndex].getAttribute("data-weeks")
	const compRate = ppdCalculator.find("#compensation-rate").val()
	const impairmentRating = ppdCalculator.find("#impairement-rating").val()
	const ppd = calculatePPD(compRate, impairmentRating, weeks)

	const label1 = ppdCalculator.find("#result-label-1")
	const value1 = ppdCalculator.find("#result-value-1")

	const numIsValid = (!isNaN(ppd)) && ppd != 0

	label1.html(numIsValid ? "PPD" : "")
	value1.html(numIsValid ? formatNumberIntoDollars(ppd) : "")

}


function calculatePPD(compRate, impairementRating, weeks) {
	const ir = Math.min(100, impairementRating)
  return compRate * weeks * (ir/100)
}


//
//NC LIfe Expectancy
//

function postNCLifeExpectancy() {

	const lifeExpectancyCalculator = $("#NC-Life-Expectancy-calculator")
	const currentAge = lifeExpectancyCalculator.find("#current-age").val()

	const data = ncLifeExpectancy(currentAge)
	const numsAreValid = (!isNaN(data.remainingYears) && !(isNaN(data.lifeExpectancy)))

	const label1 = lifeExpectancyCalculator.find("#result-label-1")
	const label2 = lifeExpectancyCalculator.find("#result-label-2")
	const value1 = lifeExpectancyCalculator.find("#result-value-1")
	const value2 = lifeExpectancyCalculator.find("#result-value-2")

	label1.html(numsAreValid ? "Remaing Years" : "")
	label2.html(numsAreValid ? "Life Expectancy" : "")
	value1.html(numsAreValid ? data.remainingYears : "")
	value2.html(numsAreValid ? data.lifeExpectancy : "")

}

function ncLifeExpectancy(currentAge) {

	currentAge = parseFloat(currentAge)

	const data = ["75.8","75.4","74.5","73.5","72.5","71.6","70.6","69.6","68.6","67.6","66.6","65.6","64.6","63.7","62.7","61.7","60.7","59.8","58.8","57.9","56.9","56.0","55.1","54.1","53.2","52.2","51.3","50.4","49.4","48.5","47.5","46.6","45.7","44.7","43.8","42.9","42.0","41.0","40.1","39.2","38.3","37.4","36.5","35.6","34.7","33.8","32.9","32.0","31.1","30.2","29.3","28.5","27.6","26.8","25.9","25.1","24.3","23.5","22.7","21.9","21.1","20.4","19.7","18.9","18.2","17.5","16.8","16.1","15.5","14.8","14.2","13.5","12.9","12.3","11.7","11.2","10.6","10.0","9.5","9.0","8.5","8.0","7.5","7.1","6.6","6.6"]

	const lastItem = () => { return parseFloat( data[data.length - 1] ) }

	const remainingYears = currentAge > data.length - 1 ? parseFloat(lastItem()) : parseFloat(data[currentAge])

	const lifeExpectancy = currentAge + remainingYears

	return {remainingYears: round(remainingYears, 2), lifeExpectancy: round(lifeExpectancy, 2)}

}

//
//SC Life Expectancy
//


function postSCLifeExpectancy() {

	const lifeExpectancyCalculator = $("#SC-Life-Expectancy-calculator")
	const currentAge = lifeExpectancyCalculator.find("#current-age").val()
	const genderOptions = lifeExpectancyCalculator.find("#gender-options")[0]
	const gender = genderOptions[genderOptions.selectedIndex].getAttribute("data-gender")

	const data = scLifeExpectancy(currentAge, gender)
	console.log(data)
	const numsAreValid = (!isNaN(data.remainingYears) && !(isNaN(data.lifeExpectancy)))

	const label1 = lifeExpectancyCalculator.find("#result-label-1")
	const label2 = lifeExpectancyCalculator.find("#result-label-2")
	const value1 = lifeExpectancyCalculator.find("#result-value-1")
	const value2 = lifeExpectancyCalculator.find("#result-value-2")

	label1.html(numsAreValid ? "Remaing Years" : "")
	label2.html(numsAreValid ? "Life Expectancy" : "")
	value1.html(numsAreValid ? data.remainingYears : "")
	value2.html(numsAreValid ? data.lifeExpectancy : "")

}




function scLifeExpectancy(currentAge, gender) {

var data = [{"male":"76.62","female":"80.84"},{"male":"75.69","female":"79.88"},{"male":"74.74","female":"78.91"},{"male":"73.76","female":"77.93"},{"male":"72.78","female":"76.95"},{"male":"71.8","female":"75.96"},{"male":"70.81","female":"74.97"},{"male":"69.83","female":"73.99"},{"male":"68.84","female":"73"},{"male":"67.86","female":"72.02"},{"male":"66.88","female":"71.03"},{"male":"65.89","female":"70.05"},{"male":"64.91","female":"69.07"},{"male":"63.93","female":"68.08"},{"male":"62.95","female":"67.1"},{"male":"61.98","female":"66.13"},{"male":"61.02","female":"65.15"},{"male":"60.07","female":"64.17"},{"male":"59.12","female":"63.2"},{"male":"58.17","female":"62.23"},{"male":"57.23","female":"61.26"},{"male":"56.29","female":"60.28"},{"male":"55.34","female":"59.31"},{"male":"54.4","female":"58.34"},{"male":"53.45","female":"57.37"},{"male":"52.51","female":"56.4"},{"male":"51.57","female":"55.43"},{"male":"50.62","female":"54.46"},{"male":"49.68","female":"53.49"},{"male":"48.74","female":"52.53"},{"male":"47.79","female":"51.56"},{"male":"46.85","female":"50.6"},{"male":"45.9","female":"49.63"},{"male":"44.95","female":"48.67"},{"male":"44","female":"47.71"},{"male":"43.05","female":"46.75"},{"male":"42.11","female":"45.8"},{"male":"41.16","female":"44.84"},{"male":"40.21","female":"43.89"},{"male":"39.27","female":"42.94"},{"male":"38.33","female":"42"},{"male":"37.39","female":"41.05"},{"male":"36.46","female":"40.11"},{"male":"35.53","female":"39.17"},{"male":"34.61","female":"38.23"},{"male":"33.69","female":"37.29"},{"male":"32.78","female":"36.36"},{"male":"31.87","female":"35.43"},{"male":"30.97","female":"34.51"},{"male":"30.07","female":"33.6"},{"male":"29.18","female":"32.69"},{"male":"28.28","female":"31.79"},{"male":"27.4","female":"30.9"},{"male":"26.52","female":"30.01"},{"male":"25.65","female":"29.14"},{"male":"24.79","female":"28.27"},{"male":"23.94","female":"27.41"},{"male":"23.1","female":"26.57"},{"male":"22.27","female":"25.73"},{"male":"21.45","female":"24.9"},{"male":"20.64","female":"24.08"},{"male":"19.85","female":"23.27"},{"male":"19.06","female":"22.47"},{"male":"18.29","female":"21.68"},{"male":"17.54","female":"20.9"},{"male":"16.8","female":"20.12"},{"male":"16.08","female":"19.36"},{"male":"15.37","female":"18.6"},{"male":"14.68","female":"17.86"},{"male":"13.99","female":"17.12"},{"male":"13.32","female":"16.4"},{"male":"12.66","female":"15.69"},{"male":"12.01","female":"14.99"},{"male":"11.39","female":"14.31"},{"male":"10.78","female":"13.64"},{"male":"10.18","female":"12.98"},{"male":"9.61","female":"12.34"},{"male":"9.05","female":"11.71"},{"male":"8.5","female":"11.1"},{"male":"7.98","female":"10.5"},{"male":"7.49","female":"9.92"},{"male":"7.01","female":"9.35"},{"male":"6.57","female":"8.81"},{"male":"6.14","female":"8.29"},{"male":"5.74","female":"7.79"},{"male":"5.36","female":"7.32"},{"male":"5","female":"6.87"},{"male":"4.66","female":"6.43"},{"male":"4.35","female":"6.02"},{"male":"4.07","female":"5.64"},{"male":"3.81","female":"5.29"},{"male":"3.57","female":"4.96"},{"male":"3.35","female":"4.61"},{"male":"3.15","female":"4.26"},{"male":"2.96","female":"3.93"},{"male":"2.78","female":"3.63"},{"male":"2.62","female":"3.38"},{"male":"2.47","female":"3.18"},{"male":"2.32","female":"3.02"},{"male":"2.19","female":"2.82"},{"male":"2.07","female":"2.61"},{"male":"1.96","female":"2.42"},{"male":"1.86","female":"2.23"},{"male":"1.76","female":"2.06"},{"male":"1.66","female":"1.89"},{"male":"1.57","female":"1.74"},{"male":"1.48","female":"1.6"},{"male":"1.39","female":"1.47"},{"male":"1.3","female":"1.36"},{"male":"1.22","female":"1.25"},{"male":"1.14","female":"1.16"},{"male":"1.07","female":"1.08"},{"male":"0.99","female":"1"},{"male":"0.92","female":"0.93"},{"male":"0.85","female":"0.86"},{"male":"0.79","female":"0.79"},{"male":"0.72","female":"0.73"},{"male":"0.66","female":"0.67"},{"male":"0.61","female":"0.61"},{"male":"0.55","female":"0.56"},{"male":"0.5","female":"0.5"},{"male":"","female":""}]

const remainingYears = currentAge > data.length - 1 ? 0.5 : parseFloat(data[currentAge][gender])

const lifeExpectancy = parseFloat(currentAge) + remainingYears

return {remainingYears: round(remainingYears, 2), lifeExpectancy: round(lifeExpectancy, 2)}

}



//
//Date Picker Functions
//

function formatDatePickers() {

	var d1;
	var d2;
	var d3;

	var t = new Date();
	var month = t.getMonth();
	var day = t.getDay();
	var date = t.getDate();
	var year = t.getFullYear();
	var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	var today = "0"+(month+1)+"/"+date+"/"+year;
	var dateStr = days[day]+', '+months[month]+' '+date+', '+year;

	var bb = today.split(' ');
	d1 = new Date(bb);


	$("#start-date-picker").datepicker({
		showOtherMonths: true,
		selectOtherMonths: true,
		changeMonth: true,
		changeYear: true,
		altField: "#alternate1",
		altFormat: "DD, MM d, yy",

		onSelect: function() {
			var a = $.datepicker.formatDate("yy mm dd", $(this).datepicker("getDate"));
			var b = a.split(' ');
			d1 = new Date(b);
			postTimeBetweenDates(d1, d2)
		}
	});


		$("#end-date-picker").datepicker({
		showOtherMonths: true,
		selectOtherMonths: true,
		changeMonth: true,
		changeYear: true,
		altField: "#alternate2",
		altFormat: "DD, MM d, yy",

		onSelect: function() {
			var c = $.datepicker.formatDate("yy mm dd", $(this).datepicker("getDate"));
			var g = c.split(' ');
			d2 = new Date(g);
			postTimeBetweenDates(d1, d2)
		}
	});

	$("#start-date-for-end-date-calc").datepicker({
	showOtherMonths: true,
	selectOtherMonths: true,
	changeMonth: true,
	changeYear: true,
	altField: "#alternate2",
	altFormat: "DD, MM d, yy",

	onSelect: function() {
		postEndDate()
	}

});

};

function postTimeBetweenDates(date1, date2) {

	var oneDay = 24*60*60*1000;	// hours*minutes*seconds*milliseconds
	var diffDays = Math.round((date2-date1)/oneDay);
	let numIsValid = (!isNaN(diffDays)) && (diffDays >= 0)

	let numOfWksCalculator = $("#number-of-weeks-calculator")

	const label1 = numOfWksCalculator.find("#result-label-1")
	const value1 = numOfWksCalculator.find("#result-value-1")

	label1.html(numIsValid ? "Number Of Weeks" : "")
	value1.html(numIsValid ?
		convertsWeeksAndDaysToString(convertTotalDaysToWeeksAndDays(diffDays))
		: "")

}

function postEndDate() {

	const endDateCalculator = $("#end-date-calculator")
	const datepicker = $("#start-date-for-end-date-calc")
	const a = $.datepicker.formatDate("yy mm dd", $(datepicker).datepicker("getDate"));
	const c = a.split(' ');
	const startDate = new Date(c);

	var weeks = endDateCalculator.find("#weeks").val()
	var days = endDateCalculator.find("#days").val()

	if (isNaN(weeks)) {
		weeks = 0
	}

	if (isNaN(days)) {
		days = 0
	}

	const endDate = calculateEndDate(startDate, parseFloat(weeks), parseFloat(days))
	console.log(endDate)
	const dateIsValid = (!isNaN(endDate.getTime())) && !(weeks == 0 && days == 0)

	const label1 = endDateCalculator.find("#result-label-1")
	const value1 = endDateCalculator.find("#result-value-1")

	label1.html(dateIsValid ? "End Date" : "")
	value1.html(dateIsValid ? formatDate(endDate) : "")


}



//scrolling functions

function scrollToSection() {

			const target = event.target
			const section = parseFloat(target.getAttribute("data"))
			const calculator = $(".calculator")[section]

			var time = section < 3 ? 300 : 500

	    $('html, body').animate({
	        scrollTop: calculator.offsetTop
	    }, time);

}





//helper methods

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function commaSeparateNumber(number) {
	    var n = number.toString().split(".");
	    n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	    return n.join(".");
}

function formatDate(date) {
	let month = date.getMonth() + 1
	let day = date.getDay()
	let year = date.getFullYear()
	return month + "/" + date.getDate() + "/" + year
}

function formatNumberIntoDollars(number) {
	let n = round(number, 2)
	let commaSeparated = commaSeparateNumber(n)
	let decimaleFormatted = formatDecimalForMoney(commaSeparated)
	return "$" + decimaleFormatted
}

function formatDecimalForMoney(value) {

	var val = value

	if ( val.indexOf( '.') === 0 ){
				val = 0 + val;
			}

			if ( val.match( /\.\d$/ ) ){
				val += '0';
			}

			val.replace( /(\..{2}).*/, '$1' )

			return val
}

function convertTotalDaysToWeeksAndDays(totalDays) {
  const weeks = Math.floor((totalDays)/7)
  const days = ((totalDays)%7)
  return {weeks: weeks, days: days}
}

function convertsWeeksAndDaysToString(data) {

  const weeks = () => { return data.weeks + " week" + (data.weeks !== 1 ? "s" : "") }
  const days = () => { return data.days + " day" + (data.days !== 1 ? "s" : "") }

  if (data.weeks > 0 && data.days > 0) {
    return weeks() + " and " + days()
  }

  if (data.weeks <= 0 && data.days > 0) {
    return days()
  }

  if (data.weeks > 0 && data.days <= 0) {
    return weeks()
  }

  if (data.weeks <= 0 && data.days <= 0) {
    return days()
  }

}



function calculateEndDate(startDate, weeks, days) {

	const totalDays = weeks * 7 + days - 1;
	console.log(totalDays)
	var date = new Date(startDate);
	date.setDate( startDate.getDate() + totalDays )
	return date
}
