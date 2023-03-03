const { Octokit, App } = require("octokit");
const dotenv = require('dotenv');
dotenv.config();

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});
/*
interface Identifier {
    type: string;
    value: string;
  }
  
  interface Reference {
    url: string;
  }
  
  interface Advisory {
    description: string;
    identifiers: Identifier[];
    references: Reference[];
    severity: string;
    summary: string;
    updatedAt: string;
  }
  
  interface AdvisoryNode {
    advisory: Advisory;
  }
  
  interface SecurityVulnerabilities {
    nodes: AdvisoryNode[];
  }
  
  interface Repository {
    securityVulnerabilities: SecurityVulnerabilities;
  }
  
  interface Response {
    repository: Repository;
  }*/

async function getAdvisories () {
    const query = `query {repository(owner: "JulissaDantes", name: "contracts-playground") {
        packages(first: 10) {
          edges {
            node {
              name
            }
          }
        }}
      }`;

    const variables = {
    owner: "JulissaDantes",
    repo: "contracts-playground"
    };

    try {
       const advisories = await octokit.graphql(query, variables).then((response: any) => {
        console.log("respondio esto", response.repository.packages);
        return response.repository.vulnerabilityAlerts.nodes.map((node: any) => {
          return node.advisory;
        })});
         
        console.log("result", advisories);
      } catch (error) {
        console.error(error);
        console.error('Failed to retrieve vulnerability alerts.');
      }
}

getAdvisories();

/*
Benefits of using octokit instead of fetch
Authentication: Octokit provides built-in authentication support, making it easy to authenticate requests to the API.

Rate Limiting: Octokit handles rate limiting automatically, ensuring that your requests don't exceed the API rate limits.

Pagination: Octokit handles pagination automatically, allowing you to easily fetch all the results of a query, even if there are multiple pages of results.

Error Handling: Octokit provides useful error messages and information to help you troubleshoot issues with your requests.
*/ 