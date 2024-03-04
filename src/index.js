import "./style.css";

function $(selector) {
  return document.querySelector(selector);
}

function createTeamRequest(team) {
  fetch("http://localhost:3000/teams-json/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(team)
  });
}

//console.warn("app ready");

function getTeamAsHTML(team) {
  return ` <tr>
   <td>${team.promotion}</td>
   <td>${team.members}</td>
   <td>${team.name}</td>
   <td>${team.url}</td>
   <td>x</td>
  </tr>`;
}

function renderTeams(teams) {
  //console.warn("render", teams);
  const teamsHTML = teams.map(getTeamAsHTML);
  //console.info(teamsHTML);

  $("#teamsTable tbody").innerHTML = teamsHTML.join("");
}

function loadTeams() {
  const promise = fetch("http://localhost:3000/teams-json")
    .then(r => r.json())
    .then(teams => {
      renderTeams(teams);
      return teams;
    });
  // console.warn("loadTeams", promise);
}

function getFormValues() {
  return {
    promotion: $("input[name=promotion]").value,
    members: $("input[name=members]").value,
    name: $("input[name=name]").value,
    url: $("input[name=url]").value
  };
}

function onSubmit(e) {
  e.preventDefault();
  let team = getFormValues();
  createTeamRequest(team);
  window.location.reload();
}

function initEvents() {
  $("#teamsForm").addEventListener("submit", onSubmit);
}
initEvents();
loadTeams();
