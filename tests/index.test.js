const { sequelize } = require("../src/db/connection");
const { Band, Musician, Song, Board, Cheese, User } = require("../src/index");
const { seedBoard, seedCheese, seedUser } = require("./SeedData");
// const { db } = require("../src/db/connection");

//Setup and teardown

beforeAll(async () => {
  // the 'sync' method will create tables based on the model class
  // by setting 'force:true' the tables are recreated each time the
  // test suite is run
  await sequelize.sync({ force: true });
});

afterEach(async () => {
  //drop and create tables afeter each test.
  await User.sync({ force: true });
  await Cheese.sync({ force: true });
  await Board.sync({ force: true });
});
afterAll(async () => {
  //drop tables at the end of the test suite.
  await sequelize.drop();
});

describe("Board, Cheese and User Models", () => {
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
    let board1 = await Board.create(seedBoard[4]);
    expect(board1).toHaveProperty("type", "Blue");
    expect(board1).toHaveProperty("description", "Gorgonzola, Roquefort");
    expect(board1).toHaveProperty("rating", 3);
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

  //One to Many

  describe("Board and User Models Association", () => {
    test("If a User can have many Boards", async () => {
      // create Musicians and bands
      //Populate the DB with a user and some musicians
      let user1 = await User.create(seedUser[2]);
      let board2 = await Board.create(seedBoard[1]);
      let board3 = await Board.create(seedBoard[2]);
      // create some associations - put musicians in bands
      await user1.addBoard(board2);
      await user1.addBoard(board3);

      // test the association
      const user1boards = await user1.getBoards();
      expect(user1boards.length).toBe(2);
      expect(user1boards[0] instanceof Board).toBeTruthy;
      expect(user1boards[0].type).toBe("crumbly");
      expect(user1boards[0].description).toBe("Fresco, Requeijao");
      expect(user1boards[0].rating).toBe(10);
      expect(user1boards[1] instanceof Board).toBeTruthy;
      expect(user1boards[1].type).toBe("Aged");
      expect(user1boards[1].description).toBe("Ilha, Gruyere, Nisa");
      expect(user1boards[1].rating).toBe(7);
    });
  });

  //Many to Many
  describe("Board and Cheese Models Association", () => {
    test("If a Board can have many Cheeses and if a Cheese can be in many Boards", async () => {
      //Populate the DB with a board and some cheeses
      let board1 = await Board.create(seedBoard[2]);
      let board2 = await Board.create(seedBoard[3]);
      let cheese1 = await Cheese.create(seedCheese[5]);
      let cheese2 = await Cheese.create(seedCheese[6]);
      let cheese3 = await Cheese.create(seedCheese[7]);
      let cheese4 = await Cheese.create(seedCheese[8]);

      // create some associations - create a board with cheeses
      await board1.addCheeses([cheese1, cheese2, cheese3]);
      await board2.addCheeses([cheese1, cheese3, cheese4]);
      // create some associations - put cheeses in boards
      await cheese1.addBoards([board1, board2]);
      await cheese3.addBoards([board1, board2]);
      // test the association
      const board1Cheeses = await board1.getCheeses();
      expect(board1Cheeses.length).toBe(3);
      expect(board1Cheeses[0] instanceof Cheese).toBeTruthy;
      expect(board1Cheeses[0]).toHaveProperty("title", "Ilha");
      const board2Cheeses = await board2.getCheeses();
      expect(board2Cheeses.length).toBe(3);
      expect(board2Cheeses[0] instanceof Cheese).toBeTruthy;
      expect(board2Cheeses[1]).toHaveProperty("description", "Firm");

      const cheese1Boards = await cheese1.getBoards();
      expect(cheese1Boards.length).toBe(2);
      expect(cheese1Boards[0] instanceof Board).toBeTruthy;
      expect(cheese1Boards[0]).toHaveProperty("type", "Aged");
      const cheese2Boards = await cheese2.getBoards();
      expect(cheese2Boards.length).toBe(1);
      expect(cheese2Boards[0] instanceof Board).toBeTruthy;
      expect(cheese2Boards[0]).toHaveProperty(
        "description",
        "Ilha, Gruyere, Nisa"
      );
    });
  });

  //Eager Load

  describe("Eager load", () => {
    test("eager load", async () => {
      //Populate the DB
      let board1 = await Board.create(seedBoard[2]);
      let board2 = await Board.create(seedBoard[3]);
      let board3 = await Board.create(seedBoard[0]);
      let board4 = await Board.create(seedBoard[1]);
      let cheese1 = await Cheese.create(seedCheese[5]);
      let cheese2 = await Cheese.create(seedCheese[6]);
      let cheese3 = await Cheese.create(seedCheese[7]);
      let cheese4 = await Cheese.create(seedCheese[8]);
      let user1 = await User.create(seedUser[1]);
      let user2 = await User.create(seedUser[2]);

      // create some associations - create boards with cheeses
      await board1.addCheeses([cheese1, cheese2, cheese3]);
      await board2.addCheeses([cheese1, cheese3, cheese4]);
      // create some associations - put cheeses in boards
      await cheese1.addBoards([board1, board2]);
      await cheese2.addBoards([board1]);
      await cheese3.addBoards([board1, board2]);
      await cheese4.addBoards([board2]);
      // create some associations - put Boards in Users
      await user1.addBoard(board1);
      await user1.addBoard(board2);
      await user2.addBoard(board3);
      await user2.addBoard(board4);

      //test eager loading - A user can be loaded with its boards
      const users = await User.findAll({ include: Board });
      // console.log(users[0].boards);
      expect(users[0].Boards.length).toBe(2);
      expect(users[1].Boards.length).toBe(2);

      // test eager loading - A cheese can be loaded with its board data
      const cheese = await Cheese.findOne({ include: Board });
      // console.log(cheese.Boards);
      expect(cheese.Boards.length).toBe(2);

      //test eager loading - A board can be loaded with its cheeses
      const board = await Board.findAll({ include: Cheese });
      // console.log(board[0].Cheeses.length);
      expect(board[0].Cheeses.length).toBe(3);
      expect(board[1].Cheeses.length).toBe(3);
    });
  });
});
