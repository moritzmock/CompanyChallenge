import pkg from "follow-redirects";
import urlExist from "./URLExists.js";
const { http, https } = pkg;

export async function isValidHttpUrl(url) {
    if (url === null || url === undefined) {
        return "not a url";
    }

    if (url.slice(0, 4) !== "http") {
        return "not a url";
    }

    if ((await urlExist(url)) === false) {
        return "broken url";
    }

    if (!(await verifyURL(url))) {
        return "broken url";
    }

    return "valid url";
}

const getHTTP = (func, resolve, url) =>
    func
        .get(url, (response) => {
            resolve(!/(4|5)\d\d/.test(`${response.statusCode}`));
        })
        .on("error", (err) => {
            console.error(err);
        });

async function verifyURL(url) {
    return await new Promise((resolve) => {
        if (url.startsWith("https")) {
            getHTTP(https, resolve, url);
        } else {
            getHTTP(http, resolve, url);
        }
    });
}
