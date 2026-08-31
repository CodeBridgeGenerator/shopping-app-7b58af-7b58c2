const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("inventory service", async () => {
  let thisService;
  let inventoryCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("inventory");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (inventory)");
  });

  describe("#create", () => {
    const options = {"name":"new value","description":"new value"};

    beforeEach(async () => {
      inventoryCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new inventory", () => {
      assert.strictEqual(inventoryCreated.name, options.name);
assert.strictEqual(inventoryCreated.description, options.description);
    });
  });

  describe("#get", () => {
    it("should retrieve a inventory by ID", async () => {
      const retrieved = await thisService.Model.findById(inventoryCreated._id);
      assert.strictEqual(retrieved._id.toString(), inventoryCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value","description":"updated value"};

    it("should update an existing inventory ", async () => {
      const inventoryUpdated = await thisService.Model.findByIdAndUpdate(
        inventoryCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(inventoryUpdated.name, options.name);
assert.strictEqual(inventoryUpdated.description, options.description);
    });
  });

  describe("#delete", async () => {
    it("should delete a inventory", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const inventoryDeleted = await thisService.Model.findByIdAndDelete(inventoryCreated._id);
      assert.strictEqual(inventoryDeleted._id.toString(), inventoryCreated._id.toString());
    });
  });
});