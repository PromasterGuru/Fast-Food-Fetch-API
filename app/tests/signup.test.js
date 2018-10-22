global.fetch = require('jest-fetch-mock')
const signup = require('../static/js/auth')
describe('singUp',()=>{
let fetchMock;
let assignMock;
beforeEach(()=>{
    document.body.innerHTML += `
    <form>
        <input type="text" value="Dennis" id="uname">
        <input type="email" value="denis@gmail.com" id="email">
        <input type="password" value="Denis2018" id="pass">
        <input type="password" value="Denis2018"  id="cpass">
        <button id="submit" onclick="signUp()"></button>
        <span id="error"></span> 
    </form>`;

    fetchMock = jest.spyOn(global, 'fetch')
    fetchMock.mockImplementation(()=>Promise.resolve({
      json: ()=>Promise.resolve({Message: "Dennis registered successfully"})}))
    assignMock = jest.spyOn(window.location, 'assign')
    assignMock.mockImplementation(()=>{})
})
//Tear Down
afterEach(()=>{
    fetchMock.mockRestore();
    assignMock.mockRestore();
    jest.resetModules();
})

//Test for valid user registration
it('user can signup and be redirected to login page.', async() => {
    document.getElementById('submit').click();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchMock.mock.calls[0];
    expect(fetchArgs[0]).toBe("https://morning-springs-84037.herokuapp.com/https://pro-fast-food-fast-api.herokuapp.com/api/v2/auth/signup");
    expect(fetchArgs[1]).toEqual({
            method: "POST",
            body: JSON.stringify({
                username: "Dennis",
                email: "denis@gmail.com",
                password: "Denis2018",
                cpassword: "Denis2018"
            }),
            headers: {
                "Content-Type": "application/json"
              }
    });
    await Promise.resolve().then();

    expect(assignMock).toHaveBeenCalledTimes(1);
    expect(assignMock.mock.calls[0][0]).toBe('/login');
    expect(document.getElementById('error').innerHTML).toBe("Dennis registered successfully");
})

//Test user regsiteration with invalid email address
it("wrong email address", async() => {
    fetchMock = jest.spyOn(global, 'fetch')
    fetchMock.mockImplementation(()=>Promise.resolve({
      json: ()=>Promise.resolve({Message: "Your email address is invalid!"})}))
    document.getElementById('email').value = "pmutondo12gmail.com";
    document.getElementById('submit').click();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchMock.mock.calls[0];
    expect(fetchArgs[0]).toBe("https://morning-springs-84037.herokuapp.com/https://pro-fast-food-fast-api.herokuapp.com/api/v2/auth/signup");
    expect(fetchArgs[1]).toEqual({
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: "Dennis",
            email: "pmutondo12gmail.com",
            password: "Denis2018",
            cpassword: "Denis2018"
        })
    });

    await Promise.resolve().then();
    expect(document.getElementById('error').innerHTML).toBe("Your email address is invalid!");
})

})
