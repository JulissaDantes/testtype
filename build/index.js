"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { Octokit, App } = require("octokit");
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});
function thu() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield octokit.request(`GET /repos/OpenZeppelin/dependency-checker/pulls/6/comments`);
            const result = Array.from(response.data);
            console.log(result);
            const data = result.map((r) => { return { 'id': r.id, 'body': r.body }; });
            yield fs.promises.writeFile('results.json', JSON.stringify(data));
            console.table(data);
        }
        catch (error) {
            console.log(error);
        }
    });
}
thu();
/*
Benefits of using octokit instead of fetch
Authentication: Octokit provides built-in authentication support, making it easy to authenticate requests to the API.

Rate Limiting: Octokit handles rate limiting automatically, ensuring that your requests don't exceed the API rate limits.

Pagination: Octokit handles pagination automatically, allowing you to easily fetch all the results of a query, even if there are multiple pages of results.

Error Handling: Octokit provides useful error messages and information to help you troubleshoot issues with your requests.
*/ 
