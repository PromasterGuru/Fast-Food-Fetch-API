require("../static/js/addMenu");
describe("addMeal", () => {
let fetchMock;
beforeEach(() => {
    document.body.innerHTML +=`
    <form onsubmit="event.preventDefault();">
        <input type="text" id="name" value="Hamburger">
        <input type="text" id="image" value="hamburger.jpg">
        <input type="text" id="description" value="Also known as beefburger or burger.">
        <input type="text" id="price" value="655.00">
        <button id="btnadd" onclick="addMeal(100);">Submit</button>
        <span id="error"></span>
    </form>`
    fetchMock = jest.spyOn(global, "fetch")
    fetchMock.mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({Message: "Menu item added successfully"})}))
})

/**Tear Down*/
afterEach(() => {
    fetchMock.mockRestore();
    jest.resetModules();
})

/**Test user can add menu options*/
it("Add menu option", async() => {
    document.getElementById("btnadd").click();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchMock.mock.calls[0];
    expect(fetchArgs[0]).toBe("https://morning-springs-84037.herokuapp.com/https://pro-fast-food-fast-api.herokuapp.com/api/v2/menu");
    expect(fetchArgs[1]).toEqual({
        method: "POST",
        body: JSON.stringify({
            name: "Hamburger",
            image_url: "hamburger.jpg",
            description: "Also known as beefburger or burger.",
            unit_price: "655.00"
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })
    await Promise.resolve().then();
    expect(document.getElementById("error").innerHTML).toBe("Menu item added successfully");
})
})