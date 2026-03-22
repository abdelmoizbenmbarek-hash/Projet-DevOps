const express = require('express');
const path = require('path');

const app = express();

// Serve Angular build files
app.use(express.static(path.join(__dirname, 'dist/my-angular-app/browser')));

// For Angular routing
app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, 'dist/my-angular-app/browser/index.html'));
});

const PORT = 80;

app.listen(PORT, () => {
console.log(`Angular app running on port ${PORT}`);
});