async function callGreenAPI(endpoint, method, body = null) {
    const idInstance = document.getElementById('idInstance').value;
    const apiTokenInstance = document.getElementById('apiTokenInstance').value;
    const url = `https://api.green-api.com/waInstance${idInstance}/${endpoint}/${apiTokenInstance}`;

    let options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        document.getElementById('responseField').value = JSON.stringify(data, null, 2);
    } catch (error) {
        document.getElementById('responseField').value = `Error: ${error.message}`;
    }
}

function getSettings() {
    callGreenAPI('getSettings', 'GET');
}

function getStateInstance() {
    callGreenAPI('getStateInstance', 'GET');
}

function sendMessage() {
    const phoneNumber = document.getElementById('phoneNumber').value;
    const messageText = document.getElementById('messageText').value;
    const body = {
        chatId: `${phoneNumber}@c.us`,
        message: messageText
    };
    callGreenAPI('sendMessage', 'POST', body);
}

function sendFileByUrl() {
    const phoneNumber = document.getElementById('phoneNumber').value;
    const fileUrl = document.getElementById('fileUrl').value;
    const fileName = document.getElementById('fileName').value;

    // Validate URL format
    if (!fileUrl.startsWith('http://') && !fileUrl.startsWith('https://')) {
        document.getElementById('responseField').value = "Error: URL has incorrect format. It should start with http(s)://";
        return;
    }

    const body = {
        chatId: `${phoneNumber}@c.us`,
        urlFile: fileUrl,
        fileName: fileName
    };
    callGreenAPI('sendFileByUrl', 'POST', body);
}
