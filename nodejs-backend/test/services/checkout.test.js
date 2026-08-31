const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("checkout service", async () => {
  let thisService;
  let checkoutCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("checkout");

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
    assert.ok(thisService, "Registered the service (checkout)");
  });

  describe("#create", () => {
    const options = {"name":"new value","description":"new value"};

    beforeEach(async () => {
      checkoutCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new checkout", () => {
      assert.strictEqual(checkoutCreated.name, options.name);
assert.strictEqual(checkoutCreated.description, options.description);
    });
  });

  describe("#get", () => {
    it("should retrieve a checkout by ID", async () => {
      const retrieved = await thisService.Model.findById(checkoutCreated._id);
      assert.strictEqual(retrieved._id.toString(), checkoutCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value","description":"updated value"};

    it("should update an existing checkout ", async () => {
      const checkoutUpdated = await thisService.Model.findByIdAndUpdate(
        checkoutCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(checkoutUpdated.name, options.name);
assert.strictEqual(checkoutUpdated.description, options.description);
    });
  });

  describe("#delete", async () => {
    it("should delete a checkout", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const checkoutDeleted = await thisService.Model.findByIdAndDelete(checkoutCreated._id);
      assert.strictEqual(checkoutDeleted._id.toString(), checkoutCreated._id.toString());
    });
  });
});