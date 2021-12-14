import importProperties from "./propertiesImport.js";
import urlExist from "./URLExists.js";
import {isValidHttpUrl} from "./URLVerifier.js";
import {getURLs, verifyURLs} from "./companyChallenge.js";
import settings from "../settings/settings.json"


//this can be adjusted manually, however it only affects this file and not the others
//default value from jest is 5000ms
jest.setTimeout(settings.jestTimeout)

describe("testing the setup", () => {

    const notExistingURL = "https://test.mmock.net";
    const existingAndValidURLHttps = "https://mmock.net";
    const existingAndValidURLHttp = "http://mmock.net";
    const existingButNotValidURL = "https://mmock.net/notValid"

    test("import data", () => {
        let data = importProperties("websites.properties");


        expect(3).toEqual(data.length)
    })

    test("URL does not exists", async () => {
        expect(false).toEqual(await urlExist(notExistingURL))
    })

    test("URL does exists", async () => {
        expect(true).toEqual(await urlExist(existingAndValidURLHttp))
    })

    test("URL is not a string", async () => {
        expect("Expected a string, got number").toEqual(await urlExist(3))
    })

    test("URL is not valid", async () => {
        expect("broken url").toEqual(await isValidHttpUrl(existingButNotValidURL))
    })

    test("URL is valid", async () => {
        expect("valid url").toEqual(await isValidHttpUrl(existingAndValidURLHttp))
    })

    test("URL is valid", async () => {
        expect("valid url").toEqual(await isValidHttpUrl(existingAndValidURLHttps))
    })

    test("URL is null", async () => {
        expect("not a url").toEqual(await isValidHttpUrl(null))
    })

    test("URL is valid", async () => {
        expect("broken url").toEqual(await isValidHttpUrl(notExistingURL))
    })

    test("URL is a (random) string", async () => {
        expect("not a url").toEqual(await isValidHttpUrl("mailto:momock@unibz.it"))
    })

    test("test selenium get URLs", async () => {
        const result = await getURLs(existingAndValidURLHttps)

        expect(1).toEqual(result.length)
        expect("contact me").toEqual(result[0].text)
        expect("mailto:mock.moritz@rolmail.net").toEqual(result[0].URL)
    })
    test("test selenium get URLs and verify them", async () => {
        const allURLs = await getURLs('https://companychallenge.mmock.net/')


        expect(9).toEqual(allURLs.length)
        expect("Google.de").toEqual(allURLs[0].text)
        expect("http://google.de/").toEqual(allURLs[0].URL)

        const result = await verifyURLs("example", allURLs, false,  false)

        expect(5).toEqual(result.length)
        expect("broken url").toEqual(result[0].type)
    })
})