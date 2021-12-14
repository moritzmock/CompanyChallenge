import http from "http";

export default async function urlExist(url) {
    if (typeof url !== "string") {
        return `Expected a string, got ${typeof url}`;
    }

    const valid_url = new URL(url.trim());

    const { host, pathname } = valid_url;
    const opt = {
        method: "HEAD",
        host: host,
        path: pathname,
    };

    return await new Promise((resolve) => {
        const req = http.request(opt, (res) => {
            //console.log(res.statusCode);
            resolve(!/4\d\d/.test(`${res.statusCode}`));
        });

        req.on("error", () => resolve(false));
        req.end();
    });
}
