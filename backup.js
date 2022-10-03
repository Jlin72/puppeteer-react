const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage();
    await page.goto("https://dcc-upload.s3.ca-central-1.amazonaws.com/fsf1d_html/lessons/fsf1d_u2la5.html")
    await page.screenshot({path: "d2l.png"})
    await page.pdf({path: "new.pdf"})
    // const grabParagraph = await page.evaluate(() => {
    //     const pgTag = document.querySelector(".ilc-row-callout p");
    //     return pgTag.innerHTML
    // })

    const callouts = ["portfolio", "réfléchis"]
    const grabAllPortfolios = await page.evaluate(() => {
        const portfolios = Array.from(document.querySelectorAll(".ilc-row-callout h3"));
        let calloutContenrArr = Array.from(document.querySelectorAll(".ilc-row-callout .callout_content"));
        let results = [];
        portfolios.forEach((e, index) => {
            if(e.innerHTML === "Portfolio") {
                // console.log(e);
                // console.log(index);
                calloutContenrArr.forEach((element, i) => {
                    if (i === index) {
                        results.push(element.innerHTML.replace(/(\r\n|\n|\r|\t)/gm, ""));
                    }
                })
                // results.push(e.innerHTML)
            }
        })
        return results;
        

        // const pEl = portfolios.map(element => {
        //     return element.innerHTML.replace(/(\r\n|\n|\r|\t)/gm, "")
        // })
        // return pEl;        
    })
    console.log(grabAllPortfolios);
    await browser.close();
})()