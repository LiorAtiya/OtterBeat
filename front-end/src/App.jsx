import { Route, Routes } from 'react-router-dom';

import { Sidebar } from './components';
import { ArtistsList, SongsList, FavoriteList, LoginPage, RegisterPage, Dashboard, Error } from './pages';

const App = () => {

  return (
    <div className="relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#e22929]">

        <div className="flex h-screen px-6 overflow-y-scroll hide-scrollbar xl:flex-row">
          <div className="flex-1 pb-40 h-fit">

            <Routes>
              <Route path="/" element={<ArtistsList />} />
              <Route path="/:id/:name/songs" element={<SongsList />} />
              <Route path="/my-favorite" element={<FavoriteList />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/top-charts" element={<Dashboard />} />
              <Route path="/*" element={<Error />} />
            </Routes>
          </div>

        </div>
      </div>

    </div>
  );
};

export default App;
