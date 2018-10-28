const signup = require("../static/js/auth")
describe("singUp",() => {
let fetchMock;
let assignMock;
beforeEach(() => {
    document.body.innerHTML += `
    <form onsubmit="event.preventDefault();" id="signup">
        <input type="text"  id="uname" value="Dennis">
        <input type="text"  id="email" value="denis@gmail.com">
        <input type="text"  id="pass" value="Denis2018">
        <input type="text"  id="cpass" value="Denis2018">
        <button id="submit" onclick="signUp()"></button>
        <span id="error"></span> 
    </form>`;

    fetchMock = jest.spyOn(global, "fetch")
    fetchMock.mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({Message: "Dennis registered successfully"})}))
    assignMock = jest.spyOn(window.location, "assign")
    assignMock.mockImplementation(() => {})
})
//Tear Down
afterEach(()=>{
    fetchMock.mockRestore();
    assignMock.mockRestore();
    jest.resetModules();
})

//Test for valid user registration
it("user can signup and be redirected to login page.", async() => {
    document.getElementById("submit").click();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchMock.mock.calls[0];
    expect(fetchArgs[0]).toBe("https://morning-springs-84037.herokuapp.com/https://pro-fast-food-fast-api.herokuapp.com/api/v2/auth/signup");
    expect(fetchArgs[1]).toEqual({
        method: "POST",
        body: JSON.stringify({
            username:"Dennis",
            email: "denis@gmail.com",
            password: "Denis2018",
            cpassword: "Denis2018"
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    await Promise.resolve().then();
    expect(assignMock).toHaveBeenCalledTimes(1);
    expect(assignMock.mock.calls[0][0]).toBe("/login");
    expect(document.getElementById("error").innerHTML).toBe("Dennis registered successfully");
})

//Test user regsiteration with invalid email address
it("wrong email address", async() => {
    fetchMock = jest.spyOn(global, "fetch")
    fetchMock.mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({Message: "Your email address is invalid!"})}))
    document.getElementById("email").value = "pmutondo12gmail.com";
    document.getElementById("submit").click();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchMock.mock.calls[0];
    expect(fetchArgs[0]).toBe("https://morning-springs-84037.herokuapp.com/https://pro-fast-food-fast-api.herokuapp.com/api/v2/auth/signup");
    await Promise.resolve().then();
    expect(document.getElementById("error").innerHTML).toBe("Your email address is invalid!");
})


//Test user regsiteration for registered users
it("duplicate account registration", async() => {
    fetchMock = jest.spyOn(global, "fetch")
    fetchMock.mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({Message: "Account is already registered"})}))
    document.getElementById("submit").click();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchMock.mock.calls[0];
    expect(fetchArgs[0]).toBe("https://morning-springs-84037.herokuapp.com/https://pro-fast-food-fast-api.herokuapp.com/api/v2/auth/signup");
    await Promise.resolve().then();
    expect(document.getElementById("error").innerHTML).toBe("Account is already registered");
})

//Test user regsiteration with invalid username
it("Invalid username", async() => {
    fetchMock = jest.spyOn(global, "fetch")
    fetchMock.mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({Message: "Username must contain atleast 6 characters!!"})}))
    document.getElementById("uname").value = "Prom";
    document.getElementById("submit").click();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchMock.mock.calls[0];
    expect(fetchArgs[0]).toBe("https://morning-springs-84037.herokuapp.com/https://pro-fast-food-fast-api.herokuapp.com/api/v2/auth/signup");
    await Promise.resolve().then();
    expect(document.getElementById("error").innerHTML).toBe("Username must contain atleast 6 characters!!");
})

//Test user regsiteration short password
it("Weak password", async() => {
    fetchMock = jest.spyOn(global, "fetch")
    fetchMock.mockImplementation(()=>Promise.resolve({
      json: () => Promise.resolve({Message: "password must have more than 8 characters!!"})}))
    document.getElementById("pass").value = "Prom";
    document.getElementById("submit").click();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchMock.mock.calls[0];
    expect(fetchArgs[0]).toBe("https://morning-springs-84037.herokuapp.com/https://pro-fast-food-fast-api.herokuapp.com/api/v2/auth/signup");
    await Promise.resolve().then();
    expect(document.getElementById("error").innerHTML).toBe("password must have more than 8 characters!!");
})

//Test user registration when password has no numeric characters
it("Weak password", async() => {
    fetchMock = jest.spyOn(global, "fetch")
    fetchMock.mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({Message: "password must contain a at least one number!!"})}))
    document.getElementById("pass").value = "Promaster";
    document.getElementById("submit").click();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchMock.mock.calls[0];
    expect(fetchArgs[0]).toBe("https://morning-springs-84037.herokuapp.com/https://pro-fast-food-fast-api.herokuapp.com/api/v2/auth/signup");
    await Promise.resolve().then();
    expect(document.getElementById("error").innerHTML).toBe("password must contain a at least one number!!");
})

//Test user registration when password has no uppercase characters
it("Weak password", async() => {
    fetchMock = jest.spyOn(global, "fetch")
    fetchMock.mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({Message: "password must contain a capital letter!!"})}))
    document.getElementById("pass").value = "promaster";
    document.getElementById("submit").click();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchMock.mock.calls[0];
    expect(fetchArgs[0]).toBe("https://morning-springs-84037.herokuapp.com/https://pro-fast-food-fast-api.herokuapp.com/api/v2/auth/signup");
    await Promise.resolve().then();
    expect(document.getElementById("error").innerHTML).toBe("password must contain a capital letter!!");
})

//Test user registration when password does not match
it("Weak password", async() => {
    fetchMock = jest.spyOn(global, "fetch")
    fetchMock.mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({Message: "Your password does not match"})}))
    document.getElementById("pass").value = "Paul";
    document.getElementById("submit").click();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchMock.mock.calls[0];
    expect(fetchArgs[0]).toBe("https://morning-springs-84037.herokuapp.com/https://pro-fast-food-fast-api.herokuapp.com/api/v2/auth/signup");
    await Promise.resolve().then();
    expect(document.getElementById("error").innerHTML).toBe("Your password does not match");
})

//Test user registration with bad request format
it("some fields missing", async() => {
    document.body.innerHTML += `
    <form id="signup">
        <input type="text"  id="email" value="denis@gmail.com">
        <input type="text"  id="pass" value="Denis2018">
        <input type="text"  id="cpass" value="Denis2018">
        <button id="submit" onclick="signUp()"></button>
        <span id="error"></span> 
    </form>`;
    fetchMock = jest.spyOn(global, 'fetch')
    fetchMock.mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({Message: "Some very important fields are missing, "
      +"please confirm and fill them"})}))
    document.getElementById('submit').click();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchMock.mock.calls[0];
    expect(fetchArgs[0]).toBe("https://morning-springs-84037.herokuapp.com/https://pro-fast-food-fast-api.herokuapp.com/api/v2/auth/signup");
    await Promise.resolve().then();
    expect(document.getElementById('error').innerHTML).toBe("Some very important fields are missing, "
    +"please confirm and fill them");
})
})

