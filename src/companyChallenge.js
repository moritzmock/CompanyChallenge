import { By, Builder } from "selenium-webdriver";
import { saveAsCSV } from "./exportCSV.js";
import { isValidHttpUrl } from "./URLVerifier.js";
import importProperties from "./propertiesImport.js";

async function getTags(driver, tag, attributes) {
    const results = [];

    const URLs = await driver.findElements(By.tagName(tag));

    for (let i = 0; i < URLs.length; ++i) {
        const URL = URLs[i];

        results.push({
            text: await URL.getText(),
            URL: await URL.getAttribute(attributes),
        });
    }

    return results;
}

export async function getURLs(path) {
    let results = [];

    const driver = await new Builder().forBrowser("chrome").build();

    await driver.get(path);

    const tags = importProperties("settings/HTMLTags.properties");

    for (let key in tags) {
        results.push(await getTags(driver, tags[key].key, tags[key].value));
    }

    await driver.quit();

    return results.flat();
}

export async function verifyURLs(
    path,
    allURLs,
    saveCSV = true,
    enableLogs = true
) {
    let countFalse = 0;
    let errors = [];
    if (enableLogs) console.log(allURLs.length);

    for (let i = 0; i < allURLs.length; ++i) {
        const URL = allURLs[i];
        const URLString = URL.URL;

        if ((await isValidHttpUrl(URLString)) === "broken url") {
            countFalse++;
            errors.push({
                URLText: URL.text,
                type: await isValidHttpUrl(URLString),
                URL: URLString,
            });
        }

        if (enableLogs)
            console.log(
                i + 1,
                "/",
                allURLs.length,
                (countFalse / allURLs.length) * 100,
                "%",
                URL.text,
                "--->",
                await isValidHttpUrl(URLString),
                "<---",
                URLString
            );
    }

    if (errors.length > 0 && saveCSV) {
        saveAsCSV(path, errors);
    }

    return errors;
}
