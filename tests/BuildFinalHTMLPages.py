

filepath = "./../"

ncHTML = open(filepath + "Calculators/NorthCarolinaCalculators.html", "r")

scHTML = open(filepath + "Calculators/SouthCarolinaCalculators.html", "r")

cssStyle = open(filepath + "Calculators/MainCSS.css", "r")

NCFinalPage = open(filepath + "Calculators/Final/NorthCarolinaCalculators.html", "w+")
SCFinalPage = open(filepath + "Calculators/Final/SouthCarolinaCalculators.html", "w+")

mainCSSLink = "./MainCSS.css"
mainJavascriptLink = "JS.js"

def containsCSSorJSLink(line):
    if mainCSSLink in line:
        return True

    if mainJavascriptLink in line:
        return True


def insertCSS(line, docToWrite):

    headEnd = "</head>"
    begStyleTag = "<style>"
    endStyleTag = "</style>"

    if headEnd in line:

        with open(filepath + "Calculators/MainCSS.css", "r") as cssStyle:

            docToWrite.write(begStyleTag)

            for line in cssStyle:
                docToWrite.write(line)

            docToWrite.write(endStyleTag)

def appendJavascript(line, docToWrite):

    jsId = "formatDatePickers"

    if jsId in line:

        with open(filepath + "Calculators/JS.js", "r") as javascript:

            for line in javascript:

                if "module.exports" in line:
                    continue

                docToWrite.write(line)


def makeFinalHTMLPage(fromPage, finalPage):

    for line in fromPage:

        if containsCSSorJSLink(line):
            continue

        insertCSS(line, finalPage)

        appendJavascript(line, finalPage)

        finalPage.write(line)


def buildFinalPages():
    makeFinalHTMLPage(ncHTML, NCFinalPage)
    makeFinalHTMLPage(scHTML, SCFinalPage)
