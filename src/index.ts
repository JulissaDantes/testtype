const { Octokit, App } = require("octokit");
const  fs  = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const octokit = new Octokit({
    auth: process.env.GIgetAllPRCommentsB_TOKEN,
});
 async function getAllPRComments(){
    try {
        const response = await octokit.request(`GET /repos/${process.env.owner}/${process.env.repo}/pulls/6/comments`);
        const result = Array.from(response.data);
        console.log(result);
        const data = result.map((r: any) => {return {'id': r.id, 'body': r.body}} );
        await fs.promises.writeFile('results.json', JSON.stringify(data));
        console.table(data);
      
      } catch (error) {
        console.log(error)
      }

 }

 getAllPRComments();


/*
Benefits of using octokit instead of fetch
Authentication: Octokit provides built-in authentication support, making it easy to authenticate requests to the API.

Rate Limiting: Octokit handles rate limiting automatically, ensuring that your requests don't exceed the API rate limits.

Pagination: Octokit handles pagination automatically, allowing you to easily fetch all the results of a query, even if there are multiple pages of results.

Error Handling: Octokit provides useful error messages and information to help you troubleshoot issues with your requests.
*/ 