const app = require('express')();
const puppeteer = require('puppeteer');
const firebase = require('firebase');

require('dotenv').config();

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);

const refTask = firebase.database().ref().child('tasks');
const refUser = firebase.database().ref().child('users');

async function createData() {
  const tasks = await refTask.once('value');
  const users = await refUser.once('value');

  let userLabel = [];
  let poinLabel = [];

  try {
    let allTasks = Object.values(tasks.val());
    let userContribs = Object.entries(users.val())
      .filter(([, user])=> user.role === 'programmer')
      .map(([key, user]) => {
        userLabel.push(`"${user.username}"`);
        let poin = allTasks.reduce((poins, task) => {
          if (typeof task.userAssigned !== 'undefined' && task.userAssigned === key && typeof task.poin !== 'undefined' && task.status === 'done') poins += parseInt(task.poin);
          else poins += 0;
          return poins;
        }, 0);
        poinLabel.push(poin);
        return `<tr><td>${user.username}</td><td>${poin}</td></tr>`;
      }).join('');


    const table = `
    <div class="container">
      <div class="notification">

        <table class="table is-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Poin</th>
            </tr>
          </thead>
          <tbody>
            ${userContribs}
          </tbody>
        </table>
      </div>
    </div>`;
    const html = `<html>
      <head>
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.css"/>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js"></script>

        <style>

          .table, .chart-container {
            margin-top: 30px;
            margin-left: auto;
            margin-right: auto;
          }
          .titleDiv {
            text-align: center;
          }
        </style>
      </head>
      <body>
          <div class="is-center">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
                <h2 class="titleDiv title is-2">User Poin</h2>
                ${table}
            <div class="chart-container" style="position: absolute; top: 60vh; left: 20vh; height:30vh; width:50vw; z-index:99">
              <canvas id="myChart"></canvas>
            </div>
            <div class="chart-container" style="position: absolute; top: 60vh; left: 20vh; height:30vh; width:50vw">
              <canvas id="myChart2"></canvas>
            </div>
            <script>
              var ctx = document.getElementById("myChart").getContext('2d');
              var myChart = new Chart(ctx, {
                  type: 'line',
                  data: {
                      labels: [${userLabel}],
                      datasets: [{
                          label: 'Poin',
                          data: [${poinLabel}],
                          backgroundColor: [
                              'rgba(255, 99, 132, 0.2)',
                              'rgba(54, 162, 235, 0.2)',
                              'rgba(255, 206, 86, 0.2)',
                              'rgba(75, 192, 192, 0.2)',
                              'rgba(153, 102, 255, 0.2)',
                              'rgba(255, 159, 64, 0.2)'
                          ],
                          borderColor: [
                              'rgba(255,99,132,1)',
                              'rgba(54, 162, 235, 1)',
                              'rgba(255, 206, 86, 1)',
                              'rgba(75, 192, 192, 1)',
                              'rgba(153, 102, 255, 1)',
                              'rgba(255, 159, 64, 1)'
                          ],
                          borderWidth: 1
                      }]
                  },
                  options: {
                      scales: {
                          yAxes: [{
                              ticks: {
                                  beginAtZero:true
                              }
                          }]
                      }
                  }
              });
            </script>
          </div>
      </body>
    </html>`;
    return html;
  } catch(ex) {
    console.log(ex);
  }
}

async function createPDF(report) {

  await createData();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3001/report', { waitUntil: 'networkidle2' });
  // await page.goto('https://scrumbar.herokuapp.com/report', { waitUntil: 'networkidle2' });
  console.log(report);
  await page.pdf({ path: report, format: 'A4' });

  await browser.close();
}

app.get('/report', (req, res) => {
  createData().then(data => {
    res.send(data);
  })
});

app.get('/rpt', (req, res) => {
  const currDate = new Date;
  const report = `report_${currDate.getFullYear()}${currDate.getMonth()}.pdf`;
  console.log(report);
  createPDF(report).then(() => {
    res.sendFile(report, { root: '.' });
  });
});

app.listen(3001, () => {
  console.log('Example app listening on port 3001!');
});

