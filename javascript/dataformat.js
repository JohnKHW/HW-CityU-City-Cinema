const datas = getMovies();
const allCinemas = getCinemas();
function dataFormat(index) {
  let cinemas = allCinemas[index];
  const movies = cinemas.movies;
  var data = [];
  for (let i = 0; i < movies.length; ++i) {
    let movieData = datas.find((e) => e.id === movies[i].id);
    let subdata = {
      id: i,
      branchName: cinemas.branchName,
      name: movieData.name,
      thumbnail: movieData.thumbnail,
      sessions: [],
    };
    let sessions = [];
    for (let j = 0; j < movies[i].shows.length; ++j) {
      let show = movies[i].shows[j];
      if (sessions.find((h) => h.house == show.house)) {
        let temp = sessions.find((h) => h.house == show.house);
        temp.times.push({
          datetime: show.datetime,
          index: show.index,
        });
      } else {
        sessions.push({
          house: show.house,
          times: [
            {
              datetime: show.datetime,
              index: show.index,
            },
          ],
        });
      }
    }
    subdata.sessions = sessions;
    data.push(subdata);
  }
  return data;
}

function getResult(index) {
  for (let j = 0; j < getCinemas().length; j++) {
    let cinema = getCinemas()[j];
    let result = { branchName: cinema.branchName };

    for (let i = 0; i < cinema.movies.length; i++) {
      if (cinema.movies[i].shows.find((h) => h.index == index) != undefined) {
        let movie = cinema.movies[i].shows.find((h) => h.index == index);
        result.datetime = movie.datetime;
        result.house = movie.house;
        result.name = datas.find((d) => d.id == cinema.movies[i].id).name;

        return result;
      }
    }
  }

  return undefined;
}
