require("../static/js/viewMenu");
describe("viewMeal",() => {
let fetchMock;
beforeEach(() => {
    document.body.innerHTML +=`
    <div id="menu_count"></div>
    <div id="food_items"></div>
    `
    fetchMock = jest.spyOn(global, "fetch")
    fetchMock.mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({Message: "Sorry, we have no menu availlable for the moment."})}))
})

/**Tear Down*/
afterEach(() => {
    fetchMock.mockRestore();
    jest.resetModules();
})

/**Test user can view availlable menu options*/
it("Add menu option", async()  =>  {
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchMock.mock.calls[0];
    expect(fetchArgs[0]).toBe("https://morning-springs-84037.herokuapp.com/https://pro-fast-food-fast-api.herokuapp.com/api/v2/menu");
    await Promise.resolve().then();
    expect(document.getElementById("menu_count").innerHTML).toBe("");
    expect(document.getElementById("food_items").innerHTML).toBe("");
})
})