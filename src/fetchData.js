// Данные получены через API: api.igdb.com
/*
fetch(
  "https://api.igdb.com/v4/games",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': CLIENT ID,
      'Authorization': 'Bearer access_token',
    },
    body: "fields total_rating,language_supports.*,language_supports.language.*,
        game_modes.*,multiplayer_modes.*,name,platforms.*,screenshots.*,cover.*; limit 10;
        sort total_rating desc; where total_rating_count > 250;"
});
*/

async function fetchData() {
    let rawData = await fetch("data/data.json");
    let arrayData = await rawData.json()
    let data = {
        games: [],
        platforms: [{id: 0, text: "Без предпочтения"}],
        multiplayerTypes: [{id: 0, text: "Без предпочтения"}, {id: 1, text: "Нет"}, {id: 2, text: "Оффлайн"}, {id: 3, text: "Онлайн"}],
        languages: [{id: 0, text: "Без предпочтения"}]
    }

    for (let i = 0; i < arrayData.length; i++)
    {
        let item = arrayData[i];
        let game = {
            id: item.id,
            title: item.name,
            coverUrl: "https:" + item.cover.url,
            screenshots: [],
            textLanguage: [],
            voiceLanguage: [],
            platform: [],
            onlineMultiplayer: false,
            offlineMultiplayer: false,
            players: 0
        }

        if (item.screenshots)
        {
            item.screenshots.map(screen => { game.screenshots.push({id: screen.id, url: "https:" + screen.url}) });
        }

        if (item.language_supports)
        {
            item.language_supports.map(ls => {
                let lang = {id: ls.language.id, text: ls.language.name}
                if (!data.languages.find(val=>val.id == lang.id))
                {
                    data.languages.push(lang);
                }
                if (ls.language_support_type == 1 && !game.voiceLanguage.find(val=>val.id == lang.id))
                {
                    game.voiceLanguage.push(lang);
                }
                else if (!game.textLanguage.find(val=>val.id == lang.id))
                {
                    game.textLanguage.push(lang);
                }
            });
        }

        if (item.platforms)
        {
            item.platforms.map(pl => {
                let platform = {id: pl.id, text: pl.name};
                if (!data.platforms.find(val=>val.id == platform.id))
                {
                    data.platforms.push(platform);
                }
                if (!game.platform.find(val=>val.id == platform.id))
                {
                    game.platform.push(platform);
                }
            });
        }

        if (item.multiplayer_modes)
        {
            item.multiplayer_modes.map(mm => {
                if (!game.offlineMultiplayer)
                {
                    game.offlineMultiplayer = mm.offlinecoop || mm.offlinecoopmax > 1 || mm.offlinemax > 1;
                }
                if (!game.onlineMultiplayer)
                {
                    game.onlineMultiplayer = mm.onlinecoop || mm.onlinecoopmax > 1 || mm.onlinemax > 1
                }

                game.players = Math.max(game.players, mm.offlinecoopmax || 0, mm.offlinemax || 0);
            });
        }

        data.games.push(game);
    }

    return data;
}

export default fetchData;