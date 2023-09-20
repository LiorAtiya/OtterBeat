const { postgresConnect } = require("./connections");

const createTables = async () => {
  //Create tables and Insert artists & songs rows

  await postgresConnect.query(
    `
    CREATE TABLE artists (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      image VARCHAR(255)
 );
  
CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    artist_id INTEGER REFERENCES artists(id),
    title VARCHAR(255) NOT NULL,
    duration DOUBLE PRECISION,
    release_year INTEGER,
    path VARCHAR(255)
  );
  
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_premium BOOLEAN DEFAULT false
  );
  
  CREATE TABLE favorite_songs (
    user_id INTEGER NOT NULL REFERENCES users(id),
    song_id INTEGER NOT NULL REFERENCES songs(id),
    PRIMARY KEY (user_id, song_id)
  );

  INSERT INTO artists (id, name, image) VALUES (1, 'CHVRCHES', 'https://res.cloudinary.com/dk5mqzgcv/image/upload/v1684777526/Otterbeat/Images/artists/CHVRCHES_xvzray.jpg');
  INSERT INTO artists (id, name, image) VALUES (2, 'Weezer', 'https://res.cloudinary.com/dk5mqzgcv/image/upload/v1684777526/Otterbeat/Images/artists/Weezer_kwferb.jpg');
  INSERT INTO artists (id, name, image) VALUES (3, 'R.E.M.', 'https://res.cloudinary.com/dk5mqzgcv/image/upload/v1684777526/Otterbeat/Images/artists/R.E.M_qkupi4.jpg');
    
  INSERT INTO songs (id, artist_id ,title, duration, release_year, path) VALUES (1, 1,'Science/Visions', 3.58, 2013 , 'https://res.cloudinary.com/dk5mqzgcv/video/upload/v1684777416/Otterbeat/Songs/CHVRCHES_-_Science_Visions_hah6va.mp3');
  INSERT INTO songs (id, artist_id ,title, duration, release_year, path) VALUES (2, 1,'Mothers We Share', 3.54, 2015 , 'https://res.cloudinary.com/dk5mqzgcv/video/upload/v1684777415/Otterbeat/Songs/CHVRCHES_-_The_Mother_We_Share_w2mzeq.mp3');
  INSERT INTO songs (id, artist_id ,title, duration, release_year, path) VALUES (3, 1,'We Sink', 3.34, 2013, 'https://res.cloudinary.com/dk5mqzgcv/video/upload/v1684777415/Otterbeat/Songs/CHVRCHES_-_We_Sink_kdpmxz.mp3');
  INSERT INTO songs (id, artist_id ,title, duration, release_year, path) VALUES (4, 2,'Buddy Holly', 2.40, 1994, 'https://res.cloudinary.com/dk5mqzgcv/video/upload/v1684777415/Otterbeat/Songs/Weezer_-_Buddy_Holly_tlkguy.mp3');
  INSERT INTO songs (id, artist_id ,title, duration, release_year, path) VALUES (5, 2,'Dont Let Go', 3.00, 2001, 'https://res.cloudinary.com/dk5mqzgcv/video/upload/v1684777415/Otterbeat/Songs/Weezer_-_Don_t_Let_Go_uv8eyj.mp3');
  INSERT INTO songs (id, artist_id ,title, duration, release_year, path) VALUES (6, 2,'Beverly Hills', 3.17, 2005, 'https://res.cloudinary.com/dk5mqzgcv/video/upload/v1684777415/Otterbeat/Songs/Weezer_-_Beverly_Hills_pdhyn9.mp3');
  INSERT INTO songs (id, artist_id ,title, duration, release_year, path) VALUES (7, 3,'Losing My Religion', 4.28, 1991, 'https://res.cloudinary.com/dk5mqzgcv/video/upload/v1684777419/Otterbeat/Songs/R.E.M._-_Losing_my_religion_vum94c.mp3');
  INSERT INTO songs (id, artist_id ,title, duration, release_year, path) VALUES (8, 3,'Everybody Hurts', 5.20, 1992, 'https://res.cloudinary.com/dk5mqzgcv/video/upload/v1684777418/Otterbeat/Songs/R.E.M._-_Everybody_Hurts_sfzqs3.mp3');
  INSERT INTO songs (id, artist_id ,title, duration, release_year, path) VALUES (9, 3,'Orange Crush', 3.51, 1988, 'https://res.cloudinary.com/dk5mqzgcv/video/upload/v1684777418/Otterbeat/Songs/R.E.M._-_Orange_Crush_with_s4n8hl.mp3');
  `
  );

  // await postgresConnect.query(
  //     `CREATE TABLE artists (
  //     id SERIAL PRIMARY KEY,
  //     name VARCHAR(255) NOT NULL,
  //     image VARCHAR(255)
  //     );
  //     `
  //   );

  // await postgresConnect.query(
  //   `
  //   CREATE TABLE songs (
  //     id SERIAL PRIMARY KEY,
  //     artist_id INTEGER REFERENCES artists(id),
  //     title VARCHAR(255) NOT NULL,
  //     duration DOUBLE PRECISION,
  //     release_year INTEGER,
  //     path VARCHAR(255)
  //   );
  //   `
  // );

  // await postgresConnect.query(
  //   `
  //     CREATE TABLE users (
  //     id SERIAL PRIMARY KEY,
  //     name VARCHAR(255) NOT NULL,
  //     email VARCHAR(255) NOT NULL UNIQUE,
  //     password VARCHAR(255) NOT NULL,
  //     is_premium BOOLEAN DEFAULT false
  //   );
  //    `
  // );

  // await postgresConnect.query(
  //   `
  //     CREATE TABLE favorite_songs (
  //     user_id INTEGER NOT NULL REFERENCES users(id),
  //     song_id INTEGER NOT NULL REFERENCES songs(id),
  //     PRIMARY KEY (user_id, song_id)
  //     );
  //    `
  // );

  // await postgresConnect.query(
  //   `
  //   INSERT INTO artists (id, name, image) VALUES (1, 'CHVRCHES', 'https://res.cloudinary.com/dk5mqzgcv/image/upload/v1684777526/Otterbeat/Images/artists/CHVRCHES_xvzray.jpg');
  //   INSERT INTO artists (id, name, image) VALUES (2, 'Weezer', 'https://res.cloudinary.com/dk5mqzgcv/image/upload/v1684777526/Otterbeat/Images/artists/Weezer_kwferb.jpg');
  //   INSERT INTO artists (id, name, image) VALUES (3, 'R.E.M.', 'https://res.cloudinary.com/dk5mqzgcv/image/upload/v1684777526/Otterbeat/Images/artists/R.E.M_qkupi4.jpg');
  //   `
  // );

  // await postgresConnect.query(
  //   `
  //   INSERT INTO songs (id, artist_id ,title, duration, release_year, path) VALUES (1, 1,'Science/Visions', 3.58, 2013 , 'https://res.cloudinary.com/dk5mqzgcv/video/upload/v1684777416/Otterbeat/Songs/CHVRCHES_-_Science_Visions_hah6va.mp3');
  //   INSERT INTO songs (id, artist_id ,title, duration, release_year, path) VALUES (2, 1,'Mothers We Share', 3.54, 2015 , 'https://res.cloudinary.com/dk5mqzgcv/video/upload/v1684777415/Otterbeat/Songs/CHVRCHES_-_The_Mother_We_Share_w2mzeq.mp3');
  //   INSERT INTO songs (id, artist_id ,title, duration, release_year, path) VALUES (3, 1,'We Sink', 3.34, 2013, 'https://res.cloudinary.com/dk5mqzgcv/video/upload/v1684777415/Otterbeat/Songs/CHVRCHES_-_We_Sink_kdpmxz.mp3');
  //   INSERT INTO songs (id, artist_id ,title, duration, release_year, path) VALUES (4, 2,'Buddy Holly', 2.40, 1994, 'https://res.cloudinary.com/dk5mqzgcv/video/upload/v1684777415/Otterbeat/Songs/Weezer_-_Buddy_Holly_tlkguy.mp3');
  //   INSERT INTO songs (id, artist_id ,title, duration, release_year, path) VALUES (5, 2,'Don't Let Go', 3.00, 2001, 'https://res.cloudinary.com/dk5mqzgcv/video/upload/v1684777415/Otterbeat/Songs/Weezer_-_Don_t_Let_Go_uv8eyj.mp3');
  //   INSERT INTO songs (id, artist_id ,title, duration, release_year, path) VALUES (6, 2,'Beverly Hills', 3.17, 2005, 'https://res.cloudinary.com/dk5mqzgcv/video/upload/v1684777415/Otterbeat/Songs/Weezer_-_Beverly_Hills_pdhyn9.mp3');
  //   INSERT INTO songs (id, artist_id ,title, duration, release_year, path) VALUES (7, 3,'Losing My Religion', 4.28, 1991, 'https://res.cloudinary.com/dk5mqzgcv/video/upload/v1684777419/Otterbeat/Songs/R.E.M._-_Losing_my_religion_vum94c.mp3');
  //   INSERT INTO songs (id, artist_id ,title, duration, release_year, path) VALUES (8, 3,'Everybody Hurts', 5.20, 1992, 'https://res.cloudinary.com/dk5mqzgcv/video/upload/v1684777418/Otterbeat/Songs/R.E.M._-_Everybody_Hurts_sfzqs3.mp3');
  //   INSERT INTO songs (id, artist_id ,title, duration, release_year, path) VALUES (9, 3,'Orange Crush', 3.51, 1988, 'https://res.cloudinary.com/dk5mqzgcv/video/upload/v1684777418/Otterbeat/Songs/R.E.M._-_Orange_Crush_with_s4n8hl.mp3');
  //   `
  // );
};

module.exports = createTables;
