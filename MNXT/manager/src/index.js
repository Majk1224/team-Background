import dva from 'dva';
import './index.css';
import "@babel/polyfill"
// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/user').default);
app.model(require('./models/questionsAdd').default);
app.model(require('./models/questionsType').default);
app.model(require('./models/questionView').default);


// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
