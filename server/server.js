const app = require ('../app')
const authenticateToken = require('../middlewares/authenticateToken');

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});