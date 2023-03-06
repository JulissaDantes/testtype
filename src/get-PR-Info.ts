const { Octokit } = require("@octokit/rest");//const { Octokit, App } = require("octokit");
const  fs  = require('fs');
const dotenv = require('dotenv');
dotenv.config();

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
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

async function getPRInfo(){
  try {
      const response = await octokit.request(`GET /repos/${process.env.owner}/${process.env.repo}/pulls/6`);
      const result = response.data.body;
      console.log(result);    
  } catch (error) {
    console.log(error)
  }
}
getPRInfo()
//node build/get-PR-Info.js 