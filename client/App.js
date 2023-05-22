import { Provider } from 'react-redux';
import store from './store/configStore';
import RootComponent from './RootComponent';


const App = () => {
  return (
    <Provider store={store}>
      <RootComponent />
    </Provider>
  );
};

export default App

