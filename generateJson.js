const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const newIndex = async () => {
    let unit = 1;
    let la = 1;
    let failedChecks = 0;
    let unitIncrease = false;
    let laIncrease = false;
    let obj = {};
    let allItems = [];
    let coursesArr = ['bat4m', 'fsf1d', 'bbi2o', 'mct4c']

    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    for(let x = 0; x< coursesArr.length; x++) {
        while (failedChecks < 4) {
            await page.goto(`https://dcc-upload.s3.ca-central-1.amazonaws.com/${coursesArr[x]}_html/lessons/${coursesArr[x]}_u${unit}la${la}.html`, {
                waitUntil: "networkidle0"
            });
            const mindsOnSection = await page.evaluate(() => {
                let checkMindsOn = document.querySelector('section#mindsOn');
                if(checkMindsOn === null){
                    return 'it is null';
                } else {
                    return checkMindsOn.innerHTML;
                }
            });
            const calloutH3Arr = await page.evaluate(() => {
                let getAllCalloutH3 = Array.from(document.querySelectorAll(".ilc-row-callout h3"));
                let calloutContentArr = [];
                if(getAllCalloutH3 === null) {
                    return;
                } else {
                    let calloutContent = Array.from(document.querySelectorAll(".ilc-row-callout .callout_content"));
                    getAllCalloutH3.forEach((e, index) => {
                        if(e.innerHTML === "Definition") {
                            calloutContent.forEach((element, i) => {
                                if (i === index) {
                                    calloutContentArr.push(element.innerHTML.trim().replace(/(\r\n|\n|\r|\t)/gm, ""));
                                }
                            })
                        }
                    })
                }
                // Check for colored callouts
                for(let y = 1; y<5;y ++) {
                    let getAllColoredCallouts = Array.from(document.querySelectorAll(`.color-safe-bg_light-brand-${y}`));
                    if(getAllColoredCallouts === null) {
                        return;
                    } else {
                        getAllColoredCallouts.forEach((color) => {
                            calloutContentArr.push(color.innerHTML.trim().replace(/(\r\n|\n|\r|\t)/gm, ""));
                        })
                    }
                }
                return calloutContentArr;
            });
            if (mindsOnSection === "it is null") {
                failedChecks +=1;
                if(unitIncrease) {
                    laIncrease = true;
                    unitIncrease = false;
                    la += 1;
                } else if (laIncrease) {
                    unitIncrease = true;
                    laIncrease = false;
                    la = 0;
                    unit +=1;
                    console.log(unit + 'la' + la)
                } else {
                    laIncrease = true;
                    la += 1;
                }
                continue;
            } else {
                if(calloutH3Arr.length !== 0) {
                    let results = {
                        course: coursesArr[x],
                        unit: unit,
                        la: la,
                        content: calloutH3Arr
                    }
                    // obj[`${unit}.${la}`] = calloutH3Arr
                    allItems.push(results);
                }
                laIncrease = true;
                la +=1;
                failedChecks = 0;
                console.log(`Found a mindsOn section`);
            }
        }
        allItems[coursesArr[x]] = obj
        failedChecks = 0;
        unit = 0;
        la = 0;
        console.log(allItems);
    }
    fs.writeFile('./data.json', JSON.stringify(allItems), 'utf-8', (err) => {
        console.log(err);
    });
    await browser.close();
} 

newIndex()