

import unittest
from selenium.webdriver import Chrome
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

southCarolinaURL = 'file:///Users/B_Litwin/Desktop/WorkersCompCalculators/Calculators/Final/SouthCarolinaCalculators.html'
northCarolinaURL = 'file:///Users/B_Litwin/Desktop/WorkersCompCalculators/Calculators/Final/NorthCarolinaCalculators.html'

#configure browser
opts = Options()
opts.set_headless()
assert opts.headless
southCarolinaBrowser = Chrome(options=opts)
southCarolinaBrowser.get(southCarolinaURL)

northCarolinaBrowser = Chrome(options=opts)
northCarolinaBrowser.get(northCarolinaURL)


class Results:
    def __init__(self, label1, value1, label2 = None, value2 = None):
        self.label1 = label1
        self.label2 = label2
        self.value1 = value1
        self.value2 = value2

def getResults(parentClass):
    results = parentClass.find_element_by_class_name('result')
    label1 = results.find_element_by_id('result-label-1').get_attribute('innerHTML')
    value1 = results.find_element_by_id('result-value-1').get_attribute("innerHTML")
    oneGroupResults = Results(label1, value1)

    try:
        label2 = results.find_element_by_id('result-label-2').get_attribute('innerHTML')

    except:
        return oneGroupResults

    try:
        value2 = results.find_element_by_id('result-value-2').get_attribute('innerHTML')

    except:
        return oneGroupResults

    return Results(label1, value1, label2, value2)


def populatePPDForm(parentClass, compRate, impairementRating, bodypart):

    compRateElement = parentClass.find_element_by_id('compensation-rate')
    compRateElement.send_keys(compRate)
    impairementRatingElement = parentClass.find_element_by_id('impairement-rating')
    impairementRatingElement.send_keys(impairementRating)
    bodypartOptions = parentClass.find_element_by_id('bodypart-options')
    Select(bodypartOptions).select_by_visible_text(bodypart)
    return getResults(parentClass)

def populateSCLifeExpectancy(parentClass, currentAge, gender):
    currentAgeElement = parentClass.find_element_by_id('current-age')
    currentAgeElement.send_keys(currentAge)
    genderOptions = parentClass.find_element_by_id('gender-options')

    if gender == "male":
        Select(genderOptions).select_by_index(1)
    else:
        Select(genderOptions).select_by_index(2)

    print("****")
    print(genderOptions.get_attribute('selectedIndex'))

    return getResults(parentClass)

def populatePresentValueForm(parentClass, weeklyPayment, weeks, interestRate):
    weeklyPaymentElement = parentClass.find_element_by_id('weekly-payment')
    weeksElement = parentClass.find_element_by_id('weeks')
    interestRateElement = parentClass.find_element_by_id('interest-rate')
    weeklyPaymentElement.send_keys(weeklyPayment)
    weeksElement.send_keys(weeks)
    interestRateElement.send_keys(interestRate)
    return getResults(parentClass)

class SCCalulators:

    def __init__(self):
        self.ppd = southCarolinaBrowser.find_element_by_id('PPD-calculator')
        self.lifeExpectancy = southCarolinaBrowser.find_element_by_id('SC-Life-Expectancy-calculator')
        self.presentValue = southCarolinaBrowser.find_element_by_id('present-value-calculator')

class NCCalculators:
    def __init__(self):
        self.ppd = northCarolinaBrowser.find_element_by_id('PPD-calculator')
        self.lifeExpectancy = northCarolinaBrowser.find_element_by_id('NC-Life-Expectancy-calculator')
        self.presentValue = northCarolinaBrowser.find_element_by_id('present-value-calculator')

SCCalcs = SCCalulators()
NCCalcs = NCCalculators()

class TestSCCalculators(unittest.TestCase):

    def test_SC_PPD(self):
        results = populatePPDForm(SCCalcs.ppd, 67, 45, "Leg - 195 Weeks")
        self.assertEqual(results.label1, "PPD")
        self.assertEqual(results.value1, "$5,879.25")

    def test_NC_PPD(self):
        results = populatePPDForm(NCCalcs.ppd, 68, 98, "Middle Finger - 40 Weeks")
        self.assertEqual(results.label1, "PPD")
        self.assertEqual(results.value1, "$2,665.60")


    def test_SC_LifeExpectancy(self):
        results = populateSCLifeExpectancy(SCCalcs.lifeExpectancy, 28, 'male')
        self.assertEqual(results.label1, "Remaining Years")
        self.assertEqual(results.value1, "49.68")
        self.assertEqual(results.label2, "Life Expectancy")
        self.assertEqual(results.value2, "77.68")

    def testPresentValue(self):
        results = populatePresentValueForm(SCCalcs.presentValue, 4, 1198, 96)
        self.assertEqual(results.label1, "Total Payment")
        self.assertEqual(results.value1, "$4,792")
        self.assertEqual(results.label2, "Present Value")
        self.assertEqual(results.value2, "$216.67")

unittest.main()


#.close()
#browser.quit()
