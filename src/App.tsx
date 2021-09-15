import { Toaster } from "react-hot-toast";

import Routes from "./Routes";

const App: React.FC = () => (<>
  <Routes />
  <Toaster
  containerClassName=""
  containerStyle={{}}
  gutter={8}
  position="top-center"
  reverseOrder={false}
  toastOptions={{
    // Define default options
    className: '',
    duration: 14000,
    style: {
      background: '#363636',
      color: '#fff',
    },
    // Default options for specific types
    success: {
      icon: "👍"
    },
    error: {
      icon: "😰"
    }
  }}
/>
</>);

export default App;
