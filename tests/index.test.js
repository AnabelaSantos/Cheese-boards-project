const { sequelize } = require("../src/db/connection");
const { Band, Musician, Song, Board, Cheese, User } = require("../src/index");
const { seedBoard, seedCheese, seedUser } = require("./SeedData");
// const { db } = require("../src/db/connection");

describe("Board, Cheese and User Models", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await sequelize.sync({ force: true });
  });

  test("can create a Board", async () => {
    let board = await Board.create({
      type: "Soft and Creamy",
      description: "Serra, Brie, Burrata",
      rating: 10,
    });
    expect(typeof Board).toBe("function");
    expect(board).toHaveProperty("type", "Soft and Creamy");
    expect(board).toHaveProperty("description", "Serra, Brie, Burrata");
    expect(board.rating).toBe(10);
  });

  test("can create a Cheese", async () => {
    let cheese = await Cheese.create({
      title: "Serra",
      description: "Soft and Creamy",
    });
    expect(typeof Cheese).toBe("function");
    expect(cheese).toHaveProperty("title", "Serra");
    expect(cheese).toHaveProperty("description", "Soft and Creamy");
  });

  test("can create a User", async () => {
    let user = await User.create({
      name: "Dede",
      email: "dede@mail.com",
    });
    expect(typeof User).toBe("function");
    expect(user).toHaveProperty("name", "Dede");
    expect(user).toHaveProperty("email", "dede@mail.com");
  });

  test("can insert a board in the table", async () => {
    let board1 = await Board.create(seedBoard[1]);
    expect(board1).toHaveProperty("type", "crumbly");
    expect(board1).toHaveProperty("description", "Fresco, Requeijao");
    expect(board1).toHaveProperty("rating", 10);
  });

  test("can insert a cheese in the table", async () => {
    let cheese1 = await Cheese.create(seedCheese[3]);
    expect(cheese1).toHaveProperty("title", "Fresco");
    expect(cheese1).toHaveProperty("description", "Crumbly");
  });

  test("can insert a user in the table", async () => {
    let user1 = await User.create(seedUser[1]);
    expect(user1).toHaveProperty("name", "Maria");
    expect(user1).toHaveProperty("email", "maria@mail.com");
  });
});

// //PART 2

// describe("Band and Musician Models Association", () => {
//   /**
//    * Runs the code prior to all tests
//    */
//   beforeAll(async () => {
//     // the 'sync' method will create tables based on the model class
//     // by setting 'force:true' the tables are recreated each time the
//     // test suite is run
//     await sequelize.sync({ force: true });
//   });

//   test("If a Band can have many Musicians", async () => {
//     // create Musicians and bands
//     //Populate the DB with a a band and some musicians
//     let band1 = await Band.create({
//       name: "Big Band",
//       genre: "Jazz",
//       showCount: 5,
//     });
//     let musician1 = await Musician.create({
//       name: "Maria",
//       instrument: "Saxophone",
//     });
//     let musician2 = await Musician.create({
//       name: "Francisca",
//       instrument: "Guitar",
//     });
//     // create some associations - put musicians in bands
//     await band1.addMusician(musician1);
//     await band1.addMusician(musician2);

//     // test the association
//     const band1musicians = await band1.getMusicians();
//     expect(band1musicians.length).toBe(2);
//     expect(band1musicians[0] instanceof Musician).toBeTruthy;
//     expect(band1musicians[0].name).toBe("Maria");
//   });
// });

// //PART 3

// describe("Band and Song Models Association", () => {
//   /**
//    * Runs the code prior to all tests
//    */
//   beforeAll(async () => {
//     // the 'sync' method will create tables based on the model class
//     // by setting 'force:true' the tables are recreated each time the
//     // test suite is run
//     await sequelize.sync({ force: true });
//   });

//   test("can create a Song", async () => {
//     let song = await Song.create({
//       title: "Great Hit",
//       year: 1978,
//     });
//     expect(typeof Song).toBe("function");
//     expect(song).toHaveProperty("title", "Great Hit");
//     expect(song).toHaveProperty("year", 1978);
//   });

//   test("If a Band can have many Songs and if a Song can have many Bands", async () => {
//     // create Bands and Songs
//     //Populate the DB with a a band and some musicians
//     let band1 = await Band.create({
//       name: "Big Band",
//       genre: "Jazz",
//       showCount: 5,
//     });
//     let band2 = await Band.create({
//       name: "Small Band",
//       genre: "Classic",
//       showCount: 7,
//     });
//     let song1 = await Song.create({
//       title: "Great Hit",
//       year: 1978,
//     });
//     let song2 = await Song.create({
//       title: "Small Hit",
//       year: 1984,
//     });
//     // create some associations - put songs in band
//     await band1.addSongs([song1, song2]);
//     await band2.addSongs([song1, song2]);
//     // create some associations - put band in songs
//     await song1.addBands([band1, band2]);
//     await song2.addBands([band1, band2]);

//     // test the association
//     const band1Songs = await band1.getSongs();
//     expect(band1Songs.length).toBe(2);
//     expect(band1Songs[0] instanceof Song).toBeTruthy;
//     expect(band1Songs[0]).toHaveProperty("title", "Great Hit");

//     const band2Songs = await band2.getSongs();
//     expect(band2Songs.length).toBe(2);
//     expect(band2Songs[0] instanceof Song).toBeTruthy;
//     expect(band2Songs[1]).toHaveProperty("year", 1984);

//     const song1Bands = await song1.getBands();
//     expect(song1Bands.length).toBe(2);
//     expect(song1Bands[0] instanceof Band).toBeTruthy;
//     expect(song1Bands[0]).toHaveProperty("name", "Big Band");

//     const song2Bands = await song2.getBands();
//     expect(song2Bands.length).toBe(2);
//     expect(song2Bands[0] instanceof Band).toBeTruthy;
//     expect(song2Bands[1]).toHaveProperty("genre", "Classic");
//   });
// });

// //PART 4

// describe("Eager load", () => {
//   /**
//    * Runs the code prior to all tests
//    */
//   beforeAll(async () => {
//     // the 'sync' method will create tables based on the model class
//     // by setting 'force:true' the tables are recreated each time the
//     // test suite is run
//     await sequelize.sync({ force: true });
//   });

//   test("Songs can be eager loaded with Musicians", async () => {
//     // create Bands, Songs and Musicians
//     //Populate the DB with a a band and some musicians
//     let band1 = await Band.create({
//       name: "Big Band",
//       genre: "Jazz",
//       showCount: 5,
//     });
//     let band2 = await Band.create({
//       name: "Small Band",
//       genre: "Classic",
//       showCount: 7,
//     });
//     let song1 = await Song.create({
//       title: "Great Hit",
//       year: 1978,
//     });
//     let song2 = await Song.create({
//       title: "Small Hit",
//       year: 1984,
//     });

//     let musician1 = await Musician.create({
//       name: "Maria",
//       instrument: "Saxophone",
//     });
//     let musician2 = await Musician.create({
//       name: "Francisca",
//       instrument: "Guitar",
//     });

//     let musician3 = await Musician.create({
//       name: "Cecil",
//       instrument: "Piano",
//     });
//     let musician4 = await Musician.create({
//       name: "Cece",
//       instrument: "Violin",
//     });
//     let musician5 = await Musician.create({
//       name: "Bebas",
//       instrument: "Clarinet",
//     });

//     // create some associations - put songs in band
//     await band1.addSongs([song1, song2]);
//     await band2.addSongs([song1, song2]);
//     // create some associations - put band in songs
//     await song1.addBands([band1, band2]);
//     await song2.addBands([band1, band2]);

//     // create some associations - put musicians in bands
//     await band1.addMusician(musician1);
//     await band1.addMusician(musician2);
//     await band2.addMusician(musician3);
//     await band2.addMusician(musician4);
//     await band2.addMusician(musician5);

//     //test eager loading all musicians in bands

//     const bands = await Band.findAll({ include: Musician });
//     // console.log(bands[0].Musicians.length);

//     expect(bands[0].Musicians.length).toBe(2);
//     expect(bands[1].Musicians.length).toBe(3);

//     // test eager loading all bands that play a song

//     const fetchedSong = await Song.findOne({ include: Band });
//     // console.log(fetchedSong.Bands);
//     expect(fetchedSong.Bands.length).toBe(2);

//     //test eager all songs and all bands
//     const fetchedBand = await Band.findAll({ include: Song });
//     console.log(fetchedBand[0].Songs);
//     expect(fetchedBand[0].Songs.length).toBe(2);
//     expect(fetchedBand[1].Songs.length).toBe(2);
//   });
