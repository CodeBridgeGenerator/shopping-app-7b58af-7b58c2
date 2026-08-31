const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("customerManagement service", async () => {
  let thisService;
  let customerManagementCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("customerManagement");

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
    assert.ok(thisService, "Registered the service (customerManagement)");
  });

  describe("#create", () => {
    const options = {"name":"new value","description":"new value"};

    beforeEach(async () => {
      customerManagementCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new customerManagement", () => {
      assert.strictEqual(customerManagementCreated.name, options.name);
assert.strictEqual(customerManagementCreated.description, options.description);
    });
  });

  describe("#get", () => {
    it("should retrieve a customerManagement by ID", async () => {
      const retrieved = await thisService.Model.findById(customerManagementCreated._id);
      assert.strictEqual(retrieved._id.toString(), customerManagementCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value","description":"updated value"};

    it("should update an existing customerManagement ", async () => {
      const customerManagementUpdated = await thisService.Model.findByIdAndUpdate(
        customerManagementCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(customerManagementUpdated.name, options.name);
assert.strictEqual(customerManagementUpdated.description, options.description);
    });
  });

  describe("#delete", async () => {
    it("should delete a customerManagement", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const customerManagementDeleted = await thisService.Model.findByIdAndDelete(customerManagementCreated._id);
      assert.strictEqual(customerManagementDeleted._id.toString(), customerManagementCreated._id.toString());
    });
  });
});