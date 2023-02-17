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

  //PART 2

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
      console.log(user1boards[1]);
      expect(user1boards.length).toBe(2);
      expect(user1boards[0] instanceof Board).toBeTruthy;
      expect(user1boards[0].type).toBe("crumbly");
      expect(user1boards[0].description).toBe("Fresco, Requeijao");
      expect(user1boards[0].rating).toBe(10);
      expect(user1boards[1] instanceof Board).toBeTruthy;
      expect(user1boards[1].type).toBe("Aged");
      expect(user1boards[1].description).toBe("Ilha, Gruyere");
      expect(user1boards[1].rating).toBe(7);
    });
  });
});
