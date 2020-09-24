const keys = require('../../config/keys');

module.exports = (survey) => {
  return `
    <html>
      <body>
        <div style="text-align:center">
          <h3>We would love your feedback!</h3>
          <p>So shout it in our stupid face!</p>
          <p>${survey.body}</p>
            <div>
              <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">YES</a>
            </div>
            <div>
              <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">NOOOO</a>
            </div>
        </div>
      </body>
    </html>
  `;
};
