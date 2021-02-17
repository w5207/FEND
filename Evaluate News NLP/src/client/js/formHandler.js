function handleSubmit(event) {
  event.preventDefault()

  // check what text was put into the form field
  let formText = document.getElementById('name').value

  // TODO: Add the Client to the below JS function
  if (Client.checkForURL(formText)) {
    console.log("::: Form Submitted :::")

    fetch('http://localhost:3000/analyze', {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: formText })
    }) 
      .then(res => res.json())
      .then(function (res) {
        console.log("response from /analyze", res);
        document.getElementById('polarity').innerHTML = 'Polarity: ' + polarityChecker(res.score_tag);
        document.getElementById("agreement").innerHTML = `Agreement: ${res.agreement}`;
        document.getElementById("subjectivity").innerHTML = `Subjectivity: ${res.subjectivity}`;
        document.getElementById("confidence").innerHTML = `Confidence: ${res.confidence}`;
      })
  } else {
    alert("The URL is invalid");
  }
}

// API response output (https://www.meaningcloud.com/developer/sentiment-analysis/doc/2.1/response)
const polarityChecker = (score) => {
  let display;
  switch (score) {
    case 'P+':
      display = 'strong positive';
      break;
    case 'P':
      display = 'positive';
      break;
    case 'NEW':
      display = 'neutral';
      break;
    case 'N':
      display = 'negative';
      break;
    case 'N+':
      display = 'strong negative';
      break;
    case 'NONE':
      display = 'no sentiment';
  }
  return display.toUpperCase();
}

export {
  handleSubmit,
  polarityChecker
}
