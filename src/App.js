import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import FiltersControl from './FiltersControl';
import GamesList from './GamesList';
import fetchData from './fetchData';

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [filters, setFilters] = useState({
    platform: "0",
    multiplayerType: "0",
    players: "2",
    textLanguage: "0",
    voiceLanguage: "0"
  });

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    fetchData().then(result => {
      if (!ignore)
      {
        setData(result);
        setIsLoading(false);
      }
    })
    .catch((reason) => {
      setIsLoading(false);
      setLoadError(reason);
    });

    return () => {
      ignore = true;
    }
  }, []);

  function handleUpdateFilters(e)
  {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  }
  
  let gamesFiltered;
  if (data !=null && loadError === null && !isLoading)
  {
    gamesFiltered = [...data.games];
    if (filters.platform != "0")
    {
      gamesFiltered = gamesFiltered.filter(game => {
        let platformIds = game.platform.map(val => val.id);
        if (platformIds.find(id => id == filters.platform))
        {
          return true;
        }
        return false;
      });
    }

    if (filters.multiplayerType != "0")
    {
      gamesFiltered = gamesFiltered.filter(game => {
        switch(filters.multiplayerType)
        {
          case "1":
            return !game.offlineMultiplayer && !game.onlineMultiplayer;
          case "2":
            return game.offlineMultiplayer && game.players >= filters.players;
          case "3":
            return game.onlineMultiplayer;
          default:
            return true;
        }
      });
    }

    if (filters.textLanguage != "0")
    {
      gamesFiltered = gamesFiltered.filter(game => {
        let languageIds = game.textLanguage.map(val => val.id);
        if (languageIds.find(id => id == filters.textLanguage))
        {
          return true;
        }
        return false;
      });
    }

    if (filters.voiceLanguage != "0")
    {
      gamesFiltered = gamesFiltered.filter(game => {
        let languageIds = game.voiceLanguage.map(val => val.id);
        if (languageIds.find(id => id == filters.voiceLanguage))
        {
          return true;
        }
        return false;
      });
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>ТОП-500 игр на igdb.com</h1>
      </header>
      {
        data !=null && loadError === null && !isLoading && 
          <Container>
            <Row>
              <FiltersControl
                filters={filters}
                platforms={data.platforms}
                multiplayerTypes={data.multiplayerTypes}
                languages={data.languages}
                onUpdateFilters={handleUpdateFilters}
              />
            </Row>
            <GamesList games={gamesFiltered} />
          </Container>
      }
      {
        isLoading && loadError === null &&
        <div className='fullScreenCenterer'>
          <Spinner /> <div className='m-3'>Загрузка</div>
        </div>
      }
      {
        loadError &&
        <div className='fullScreenCenterer'>
          <div>Ошибка! {loadError}</div>
        </div>
      }
    </div>
  );
}

export default App;
