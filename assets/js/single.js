var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");

var getRepoIssues = function (repo) {
  var apiUrl = "https://api.github.com/repos/" + repo + "/issues?diretion=asc";

  fetch(apiUrl).then(function (response) {
    //request was succesful
    if (response.ok) {
      response.json().then(function (data) {
        displayIssues(data);
      });
    }
    //if api has paginated issues
    if (response.headers.get("link")) {
      displayWarning();
    } else {
      alert("There was a problem with your request");
    }
  });
};

var displayIssues = function (issues) {
  if (issues.length === 0) {
    issueContainerEl.textContent = "This repo has no issueds!";
    return;
  }
  for (var i = 0; i < issues.length; i++) {
    //create a link element to take users to the isse on github
    var issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target", "_blank");

    //create span to hold issue title
    var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;

    //append to container
    issueEl.appendChild(titleEl);

    //create a type of element
    var typeEl = document.createElement("span");

    //check if issue is an actual issue or a pull request
    if (issues[i].pull_request) {
      typeEl.textContent = "(pull request)";
    } else {
      typeEl.textContent = "(Issue)";
    }
    //append to container
    issueEl.appendChild(typeEl);
    issueContainerEl.append(issueEl);
  }
};

var displayWarning = function (repo) {
  //add text to warning container
  limitWarningEl.textContent = "To See More Than 30 Issues, Visit";

  var LinkEl = document.createElement("a");
  LinkEl.textContent = "see more issues on GitHub.com";
  LinkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
  LinkEl.setAttribute("target", "_blank");

  limitWarningEl.appendChild(LinkEl);
};

getRepoIssues("facebook/react");
